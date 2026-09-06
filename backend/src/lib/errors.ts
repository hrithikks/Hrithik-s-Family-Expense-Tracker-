import { NextFunction, Request, Response } from 'express';
export class AppError extends Error { constructor(public status: number, message: string) { super(message); } }
export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = error instanceof AppError ? error.status : 500;
  if (status === 500) console.error(error);
  res.status(status).json({ error: error instanceof AppError ? error.message : 'Something went wrong. Please try again.' });
}
