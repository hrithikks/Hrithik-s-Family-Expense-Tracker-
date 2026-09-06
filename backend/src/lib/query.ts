import { Prisma } from '@prisma/client';
import { SessionUser } from '../types.js';
export type ExpenseFilters = { from?: string; to?: string; userId?: string; responsibilityId?: string; subItemId?: string; search?: string };
export function expenseWhere(user: SessionUser, f: ExpenseFilters): Prisma.ExpenseWhereInput {
  const where: Prisma.ExpenseWhereInput = { ...(user.role === 'MEMBER' ? { userId: user.id } : f.userId ? { userId: f.userId } : {}) };
  if (f.responsibilityId) where.responsibilityId = f.responsibilityId;
  if (f.subItemId) where.subItemId = f.subItemId;
  if (f.from || f.to) where.expenseDate = { ...(f.from ? { gte: new Date(`${f.from}T00:00:00.000Z`) } : {}), ...(f.to ? { lte: new Date(`${f.to}T23:59:59.999Z`) } : {}) };
  if (f.search) where.OR = [{ remark: { contains: f.search, mode: 'insensitive' } }, { responsibility: { name: { contains: f.search, mode: 'insensitive' } } }];
  return where;
}
export const pageArgs = (query: Record<string, unknown>) => ({ take: Math.min(Math.max(Number(query.limit) || 20, 1), 100), skip: Math.max(Number(query.page || 1) - 1, 0) * (Math.min(Math.max(Number(query.limit) || 20, 1), 100)) });
