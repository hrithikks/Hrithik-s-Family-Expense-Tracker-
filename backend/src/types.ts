import { RoleName } from '@prisma/client';
export type SessionUser = { id: string; role: RoleName; email: string };
declare global { namespace Express { interface Request { user?: SessionUser } } }
