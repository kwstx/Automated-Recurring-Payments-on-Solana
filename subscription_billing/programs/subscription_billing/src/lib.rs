use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Approve};

declare_id!("5F2mgGWf8jsJVrNYyvHx8qSTVTK9DdCd5YY77C7kK5H6");

#[program]
pub mod subscription_billing {
    use super::*;

    pub fn initialize_plan(
        ctx: Context<InitializePlan>,
        plan_id: String,
        amount: u64,
        frequency: i64,
    ) -> Result<()> {
        let plan = &mut ctx.accounts.plan;
        plan.merchant = ctx.accounts.merchant.key();
        plan.token_mint = ctx.accounts.token_mint.key();
        plan.amount = amount;
        plan.frequency = frequency;
        plan.is_active = true;
        plan.plan_id = plan_id;
        Ok(())
    }

    pub fn subscribe(ctx: Context<Subscribe>) -> Result<()> {
        let subscription = &mut ctx.accounts.subscription;
        subscription.subscriber = ctx.accounts.subscriber.key();
        subscription.plan = ctx.accounts.plan.key();
        subscription.start_time = Clock::get()?.unix_timestamp;
        subscription.next_billing_time = Clock::get()?.unix_timestamp; 
        subscription.is_active = true;
        
        // Approve the subscription PDA as a delegate for the subscriber's token account
        // We approve a large amount (u64::MAX) so we don't need to re-approve often
        let cpi_accounts = Approve {
            to: ctx.accounts.subscriber_token_account.to_account_info(),
            delegate: subscription.to_account_info(),
            authority: ctx.accounts.subscriber.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::approve(cpi_ctx, u64::MAX)?;

        // Initial payment
        // Since we just approved, we can use the delegate transfer or just a direct transfer signed by subscriber
        // Here we use direct transfer signed by subscriber as they are the signer of this transaction
        let cpi_accounts_transfer = Transfer {
            from: ctx.accounts.subscriber_token_account.to_account_info(),
            to: ctx.accounts.merchant_token_account.to_account_info(),
            authority: ctx.accounts.subscriber.to_account_info(),
        };
        let cpi_program_transfer = ctx.accounts.token_program.to_account_info();
        let cpi_ctx_transfer = CpiContext::new(cpi_program_transfer, cpi_accounts_transfer);
        token::transfer(cpi_ctx_transfer, ctx.accounts.plan.amount)?;

        subscription.next_billing_time = subscription.start_time + ctx.accounts.plan.frequency;

        Ok(())
    }

    pub fn process_payment(ctx: Context<ProcessPayment>) -> Result<()> {
        let subscription = &mut ctx.accounts.subscription;
        let plan = &ctx.accounts.plan;
        let clock = Clock::get()?;

        require!(subscription.is_active, ErrorCode::SubscriptionInactive);
        require!(clock.unix_timestamp >= subscription.next_billing_time, ErrorCode::PaymentNotDue);

        let seeds = &[
            b"sub",
            subscription.subscriber.as_ref(),
            plan.to_account_info().key.as_ref(),
            &[ctx.bumps.subscription],
        ];
        let signer = &[&seeds[..]];

        // Transfer using the subscription PDA as the delegate
        let cpi_accounts = Transfer {
            from: ctx.accounts.subscriber_token_account.to_account_info(),
            to: ctx.accounts.merchant_token_account.to_account_info(),
            authority: subscription.to_account_info(), 
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        token::transfer(cpi_ctx, plan.amount)?;

        subscription.next_billing_time += plan.frequency;
        
        Ok(())
    }

    pub fn cancel_subscription(ctx: Context<CancelSubscription>) -> Result<()> {
        let subscription = &mut ctx.accounts.subscription;
        require!(subscription.subscriber == ctx.accounts.subscriber.key(), ErrorCode::Unauthorized);

        // Mark subscription inactive
        subscription.is_active = false;

        Ok(())
    }


    pub fn pause_subscription(ctx: Context<PauseSubscription>) -> Result<()> {
        let subscription = &mut ctx.accounts.subscription;
        require!(subscription.subscriber == ctx.accounts.subscriber.key(), ErrorCode::Unauthorized);
        subscription.is_active = false;
        Ok(())
    }

    pub fn resume_subscription(ctx: Context<ResumeSubscription>) -> Result<()> {
        let subscription = &mut ctx.accounts.subscription;
        require!(subscription.subscriber == ctx.accounts.subscriber.key(), ErrorCode::Unauthorized);
        subscription.is_active = true;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(plan_id: String)]
pub struct InitializePlan<'info> {
    #[account(
        init,
        seeds = [b"plan", merchant.key().as_ref(), plan_id.as_bytes()],
        bump,
        payer = merchant,
        space = 8 + 32 + 32 + 8 + 8 + 1 + 4 + plan_id.len()
    )]
    pub plan: Account<'info, Plan>,
    #[account(mut)]
    pub merchant: Signer<'info>,
    pub token_mint: Account<'info, anchor_spl::token::Mint>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Subscribe<'info> {
    #[account(
        init,
        seeds = [b"sub", subscriber.key().as_ref(), plan.key().as_ref()],
        bump,
        payer = subscriber,
        space = 8 + 32 + 32 + 8 + 8 + 1
    )]
    pub subscription: Account<'info, Subscription>,
    #[account(mut)]
    pub plan: Account<'info, Plan>,
    #[account(mut)]
    pub subscriber: Signer<'info>,
    #[account(
        mut,
        constraint = subscriber_token_account.mint == plan.token_mint,
        constraint = subscriber_token_account.owner == subscriber.key()
    )]
    pub subscriber_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = merchant_token_account.mint == plan.token_mint,
        constraint = merchant_token_account.owner == plan.merchant
    )]
    pub merchant_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ProcessPayment<'info> {
    #[account(
        mut,
        seeds = [b"sub", subscription.subscriber.as_ref(), plan.key().as_ref()],
        bump,
        has_one = plan,
    )]
    pub subscription: Account<'info, Subscription>,
    #[account(mut)]
    pub plan: Account<'info, Plan>,
    #[account(
        mut,
        constraint = subscriber_token_account.mint == plan.token_mint,
        constraint = subscriber_token_account.owner == subscription.subscriber
    )]
    pub subscriber_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = merchant_token_account.mint == plan.token_mint,
        constraint = merchant_token_account.owner == plan.merchant
    )]
    pub merchant_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CancelSubscription<'info> {
    #[account(
        mut,
        seeds = [b"sub", subscriber.key().as_ref(), subscription.plan.as_ref()],
        bump,
        constraint = subscription.subscriber == subscriber.key()
    )]
    pub subscription: Account<'info, Subscription>,
    pub subscriber: Signer<'info>,
}

#[derive(Accounts)]
pub struct PauseSubscription<'info> {
    #[account(
        mut,
        seeds = [b"sub", subscriber.key().as_ref(), subscription.plan.as_ref()],
        bump,
        constraint = subscription.subscriber == subscriber.key()
    )]
    pub subscription: Account<'info, Subscription>,
    pub subscriber: Signer<'info>,
}

#[derive(Accounts)]
pub struct ResumeSubscription<'info> {
    #[account(
        mut,
        seeds = [b"sub", subscriber.key().as_ref(), subscription.plan.as_ref()],
        bump,
        constraint = subscription.subscriber == subscriber.key()
    )]
    pub subscription: Account<'info, Subscription>,
    pub subscriber: Signer<'info>,
}

#[account]
pub struct Plan {
    pub merchant: Pubkey,
    pub token_mint: Pubkey,
    pub amount: u64,
    pub frequency: i64,
    pub is_active: bool,
    pub plan_id: String,
}

#[account]
pub struct Subscription {
    pub subscriber: Pubkey,
    pub plan: Pubkey,
    pub start_time: i64,
    pub next_billing_time: i64,
    pub is_active: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Subscription is inactive")]
    SubscriptionInactive,
    #[msg("Payment is not due yet")]
    PaymentNotDue,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Missing bump seed")]
    MissingBump,
}
