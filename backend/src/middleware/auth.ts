import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RoleName } from '@prisma/client';
import { config } from '../config.js';
import { AppError } from '../lib/errors.js';
import { SessionUser } from '../types.js';
export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  try { const token = req.cookies?.session; if (!token) throw new Error(); req.user = jwt.verify(token, config.jwtSecret) as SessionUser; next(); } catch { next(new AppError(401, 'Please sign in to continue.')); }
};
export const requireRole = (...roles: RoleName[]) => (req: Request, _res: Response, next: NextFunction) => !req.user ? next(new AppError(401, 'Please sign in to continue.')) : roles.includes(req.user.role) ? next() : next(new AppError(403, 'You do not have access to this resource.'));
