import crypto from 'crypto';

// Calculate Anchor instruction discriminator
// For Anchor programs: sha256("global:<instruction_name>")[0..8]
function calculateDiscriminator(instructionName) {
    const hash = crypto.createHash('sha256');
    hash.update(`global:${instructionName}`);
    const digest = hash.digest();
    return Array.from(digest.slice(0, 8));
}

// Calculate discriminators for all instructions
const instructions = [
    'initialize_plan',
    'subscribe',
    'process_payment',
    'cancel_subscription',
    'pause_subscription',
    'resume_subscription',
];

console.log('Instruction Discriminators:\n');
instructions.forEach(name => {
    const discriminator = calculateDiscriminator(name);
    console.log(`${name}:`);
    console.log(`  Array: [${discriminator.join(', ')}]`);
    console.log(`  Hex: ${Buffer.from(discriminator).toString('hex')}`);
    console.log('');
});

// The one we need for the scheduler
const processPaymentDiscriminator = calculateDiscriminator('process_payment');
console.log('='.repeat(50));
console.log('For solana-client.js, use this discriminator:');
console.log(`Buffer.from([${processPaymentDiscriminator.join(', ')}])`);
console.log('='.repeat(50));
