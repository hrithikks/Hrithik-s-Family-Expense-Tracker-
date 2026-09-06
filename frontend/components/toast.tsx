'use client';
import { createContext, useContext, useMemo, useState } from 'react';
type ToastType='success'|'error'|'info'; type Toast={id:number;message:string;type:ToastType};
const ToastContext=createContext<{toast:(message:string,type?:ToastType)=>void}>({toast:()=>{}});
export function ToastProvider({children}:{children:React.ReactNode}){const [toasts,setToasts]=useState<Toast[]>([]);const value=useMemo(()=>({toast:(message:string,type:ToastType='success')=>{const id=Date.now()+Math.random();setToasts(current=>[...current,{id,message,type}]);setTimeout(()=>setToasts(current=>current.filter(item=>item.id!==id)),4000)}}),[]);return <ToastContext.Provider value={value}>{children}<div className="pointer-events-none fixed inset-x-4 top-4 z-[100] mx-auto flex max-w-md flex-col gap-2">{toasts.map(item=><div key={item.id} role="status" className={`rounded-md px-4 py-3 text-sm font-semibold shadow-soft ${item.type==='error'?'bg-[#B7371B] text-white':item.type==='info'?'bg-[#17221E] text-white':'bg-[#166534] text-white'}`}>{item.message}</div>)}</div></ToastContext.Provider>}
export const useToast=()=>useContext(ToastContext);
