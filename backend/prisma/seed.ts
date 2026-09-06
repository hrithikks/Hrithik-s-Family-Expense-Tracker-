import dotenv from 'dotenv';
import { resolve } from 'node:path';
import { PrismaClient, RoleName } from '@prisma/client';
import bcrypt from 'bcryptjs';
dotenv.config({ path: resolve(process.cwd(), '.env') });
const prisma = new PrismaClient();
const groups = {
  Ravi: [{ name: 'Loans', subItems: ['Home Loan', 'Personal Loan'] }, { name: 'EMIs', subItems: ['EMI 1', 'EMI Phone', 'EMI Laptop'] }],
  Ravindra: ['Heavy Grocery', 'Bike Fuels and Maintenance', 'Medical Expenses', 'Gas Bill', 'Electricity Bill', 'LIC Mom', 'Lift Maintenance', 'Building Maintenance'],
  Riya: ['Vegetables', 'Fruits', 'Groceries', 'Puja Path', 'Sweets'],
  Hrithik: ['Milk', 'Dahi', 'Chicken', 'Eggs', 'Paneer', 'Retail Shopping upto 0-50-100', 'Buy New Things']
};
async function main() {
  const [adminRole, memberRole] = await Promise.all([prisma.role.upsert({ where: { name: RoleName.ADMIN }, update: {}, create: { name: RoleName.ADMIN } }), prisma.role.upsert({ where: { name: RoleName.MEMBER }, update: {}, create: { name: RoleName.MEMBER } })]);
  const adminPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!', 12);
  const memberPassword = await bcrypt.hash(process.env.SEED_MEMBER_PASSWORD || 'ChangeMe123!', 12);
  const people = [['Ravi', 'Admin', 'ravi@family.local', adminRole.id], ['Ravindra', 'Family', 'ravindra@family.local', memberRole.id], ['Riya', 'Family', 'riya@family.local', memberRole.id], ['Hrithik', 'Family', 'hrithik@family.local', memberRole.id]] as const;
  const users = new Map<string, string>();
  for (const [firstName,lastName,email,roleId] of people) { const user = await prisma.user.upsert({ where:{email}, update:{}, create:{firstName,lastName,email,roleId,passwordHash: roleId===adminRole.id ? adminPassword : memberPassword} }); users.set(firstName,user.id); }
  for (const [person, entries] of Object.entries(groups)) for (const item of entries) {
    const data = typeof item === 'string' ? { name: item, subItems: [] as string[] } : item;
    const responsibility = await prisma.responsibility.upsert({ where:{name:data.name}, update:{}, create:{name:data.name} });
    for (const name of data.subItems) await prisma.responsibilitySubItem.upsert({ where:{responsibilityId_name:{responsibilityId:responsibility.id,name}}, update:{}, create:{responsibilityId:responsibility.id,name} });
    await prisma.userResponsibility.upsert({ where:{userId_responsibilityId:{userId:users.get(person)!,responsibilityId:responsibility.id}}, update:{}, create:{userId:users.get(person)!,responsibilityId:responsibility.id} });
  }
}
main().finally(() => prisma.$disconnect());
