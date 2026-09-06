import { AuditAction, Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';
export const audit = (actorUserId: string | undefined, action: AuditAction, entityType: string, entityId: string, details?: Prisma.InputJsonValue) => prisma.auditLog.create({ data: { actorUserId, action, entityType, entityId, details } });
