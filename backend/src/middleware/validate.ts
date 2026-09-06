import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { AppError } from '../lib/errors.js';
export const validate = (schema: z.ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => { const parsed = schema.safeParse(req.body); if (!parsed.success) return next(new AppError(400, parsed.error.issues[0]?.message || 'Invalid request.')); req.body = parsed.data; next(); };
