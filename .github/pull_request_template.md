# Pull Request Security Checklist

## Security Review
- [ ] **Dependencies**: No new vulnerable dependencies introduced? (Run `npm audit`)
- [ ] **Secrets**: No hardcoded secrets/keys in this PR?
- [ ] **Data Protection**: 
    - [ ] No Personal Identifiable Information (PII) logged?
    - [ ] New database columns have appropriate encryption if sensitive?
- [ ] **Authorization**: New endpoints have `authenticateToken` or appropriate guards?
- [ ] **Input Validation**: All inputs validated (Joi schemas)?
- [ ] **Tests**: Security tests added/updated for potential abuse vectors?

## Description
[Describe the changes and any security considerations]
