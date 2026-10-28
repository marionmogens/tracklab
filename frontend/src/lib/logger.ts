import axios from 'axios';

const dotnetApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOTNET_LOGGING_URL,
});

export const sendAuditLog = async (data: {
  user: string;
  action: string;
  entityName: string;
  entityId?: string;
  oldValues?: string;
  newValues?: string;
}) => {
  try {
    await dotnetApi.post('/auditlogs', {
      ...data,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to send audit log to .NET backend', err);
  }
};