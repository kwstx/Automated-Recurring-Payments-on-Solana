import { auditService } from '../services/auditService.js';

export const getAuditLogs = (req, res) => {
    const merchantId = req.user.merchantId;
    const logs = auditService.getLogs(merchantId);
    res.json(logs);
};
