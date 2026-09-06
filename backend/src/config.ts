import dotenv from 'dotenv';
import { resolve } from 'node:path';
dotenv.config({ path: resolve(process.cwd(), '../.env') });
dotenv.config();
export const config = {
  port: Number(process.env.PORT || 4000),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-me',
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER || 'family-expense-tracker',
  isProduction: process.env.NODE_ENV === 'production'
};
