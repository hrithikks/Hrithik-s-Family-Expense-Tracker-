export type User={id:string;firstName:string;lastName:string;email:string;role:'ADMIN'|'MEMBER';profileImageUrl?:string;isActive?:boolean;lastLoginAt?:string};
export type Responsibility={id:string;name:string;description?:string;isActive:boolean;subItems:{id:string;name:string;isActive:boolean}[];assignments?:{userId:string}[]};
export type Expense={id:string;expenseDate:string;amount:number|string;remark?:string;user:{id:string;firstName:string;lastName:string};responsibility:{id:string;name:string};subItem?:{id:string;name:string}};
