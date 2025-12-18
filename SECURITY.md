# Security Policy & Incident Response Plan

## Security Monitoring
This application logs critical security events to the database (`audit_logs` table) and system logs.
- **Failures**: Failed login attempts on valid accounts are logged to the audit trail.
- **Access**: API Key usage and sensitive permission changes (Tier updates) are logged.

## Incident Response Plan

### 1. Detected Breach / Compromised Credentials
If a breach is suspected:
1. **Identify Scope**: Check `audit_logs` for unusual activity (IPs, massive exports).
2. **Revoke Access**:
   - **Immediately** rotate the `JWT_SECRET` in your `.env` file and restart the API service. This invalidates ALL active user sessions.
   - If an API Key is compromised, use the Merchant Dashboard (or DB access) to revoke the specific key.
3. **Lock Accounts**: Set `is_active = 0` in the `merchants` table for suspicious accounts.

### 2. Key Rotation Procedure
To rotate the signing keys (`JWT_SECRET`):
1. Generate a new strong secret (e.g., `openssl rand -hex 64`).
2. Update `JWT_SECRET` in the production `.env` file.
3. Restart the application containers: `docker-compose restart api`.
4. Users will be logged out and must re-authenticate.

### 3. User Notification
In the event of a confirmed data breach:
1. Identify affected users via `audit_logs`.
2. Prepare a notification template (Email) utilizing `emailService`.
3. Notify users within 72 hours (or per local regulations), specifying:
   - What data was accessed.
   - When it happened.
   - Steps taken to mitigate.
   - Recommended user actions (Change Password).

## Reporting Vulnerabilities
Please report security vulnerabilities to security@yourdomain.com.
