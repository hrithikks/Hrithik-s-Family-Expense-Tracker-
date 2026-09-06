// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { BarChart3, ClipboardList, FileBarChart, LogOut, ReceiptText, Settings, ShieldCheck, Users } from 'lucide-react';
// import { ApiError, api } from '../lib/api';
// import { User } from '../lib/types';

// const links = [['/dashboard', 'Dashboard', BarChart3], ['/expenses', 'Expenses', ReceiptText], ['/reports', 'Reports', FileBarChart], ['/profile', 'Profile', Settings]] as const;
// const adminLinks = [['/admin', 'Admin overview', ShieldCheck], ['/admin/users', 'Users', Users], ['/admin/responsibilities', 'Responsibilities', ClipboardList], ['/admin/assignments', 'Assignments', ShieldCheck], ['/admin/expenses', 'All expenses', ReceiptText], ['/admin/reports', 'Family reports', FileBarChart], ['/admin/audit-logs', 'Audit log', ClipboardList]] as const;

// export function Shell({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();
//   const path = usePathname();
//   useEffect(() => { api<{ user: User }>('/auth/me').then(result => setUser(result.user)).catch(error => { if (error instanceof ApiError && error.status === 401) router.replace('/login'); }); }, [router]);
//   if (!user) return <div className="grid min-h-screen place-items-center text-[#567061]">Loading your ledger...</div>;
//   const navItem = ([href, label, Icon]: readonly [string, string, any]) => <Link key={href} href={href} className={`navlink ${path === href ? 'active' : ''}`}><Icon size={18}/>{label}</Link>;
//   const logout = async () => { await api('/auth/logout', { method: 'POST' }); router.replace('/login'); };

//   return <div className="min-h-screen">
//     <aside className="fixed inset-y-0 left-0 z-30 hidden w-[242px] flex-col border-r border-[#E3E6DE] bg-white p-4 md:flex">
//       <Link href="/dashboard" className="shrink-0 px-2 pt-2 pb-6"><p className="m-0 text-[11px] uppercase tracking-[.16em] text-[#759080]">Family finance</p><h1 className="m-0 mt-1 text-xl">Hrithik's Family Ledger</h1></Link>
//       <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">{links.map(navItem)}{user.role === 'ADMIN' && <><p className="mb-1 px-3 pt-5 text-[11px] uppercase tracking-[.12em] text-[#8B9B91]">Administration</p>{adminLinks.map(navItem)}</>}</nav>
//       <div className="mt-3 shrink-0 border-t bg-white pt-3"><div className="flex items-center gap-3 px-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#DDE7D7] text-sm font-bold text-[#166534]">{user.firstName[0]}{user.lastName[0]}</div><div className="min-w-0"><p className="m-0 truncate text-sm font-bold">{user.firstName} {user.lastName}</p><p className="m-0 text-xs text-[#759080]">{user.role === 'ADMIN' ? 'Administrator' : 'Family member'}</p></div></div><button onClick={logout} className="navlink mt-3 w-full"><LogOut size={17}/>Sign out</button></div>
//     </aside>
//     <main className="min-w-0 pb-20 md:ml-[242px] md:pb-8"><header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#E3E6DE] bg-[#F7F6F0]/95 px-4 py-3 backdrop-blur sm:px-5 sm:py-4 md:px-8"><div className="min-w-0"><p className="m-0 truncate text-xs text-[#759080]">Welcome back, {user.firstName}</p><h2 className="m-0 truncate text-base font-bold sm:text-lg">{path.includes('admin') ? 'Family management' : 'Your household spending'}</h2></div><Link href="/expenses/new" className="btn btn-primary shrink-0 text-xs sm:text-sm">+<span className="hidden sm:inline"> Add expense</span></Link></header><div className="mx-auto max-w-7xl p-4 sm:p-5 md:p-8">{children}</div></main>
//     <nav className="fixed bottom-0 z-20 grid w-full grid-cols-5 border-t bg-white p-2 md:hidden">{links.map(([href, label, Icon]) => <Link key={href} href={href} className={`grid min-w-0 place-items-center gap-1 truncate text-[10px] ${path === href ? 'text-[#166534]' : 'text-[#759080]'}`}><Icon size={19}/><span className="truncate">{label}</span></Link>)}<button onClick={logout} className="grid min-w-0 place-items-center gap-1 text-[10px] text-[#759080]"><LogOut size={19}/><span>Sign out</span></button></nav>
//   </div>;
// }




'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, ClipboardList, FileBarChart, LogOut, Menu, ReceiptText, Settings, ShieldCheck, Users, X } from 'lucide-react';
import { ApiError, api } from '../lib/api';
import { User } from '../lib/types';

const links = [['/dashboard', 'Dashboard', BarChart3], ['/expenses', 'Expenses', ReceiptText], ['/reports', 'Reports', FileBarChart], ['/profile', 'Profile', Settings]] as const;
const adminLinks = [['/admin', 'Admin overview', ShieldCheck], ['/admin/users', 'Users', Users], ['/admin/responsibilities', 'Responsibilities', ClipboardList], ['/admin/assignments', 'Assignments', ShieldCheck], ['/admin/expenses', 'All expenses', ReceiptText], ['/admin/reports', 'Family reports', FileBarChart], ['/admin/audit-logs', 'Audit log', ClipboardList]] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  const path = usePathname();
  useEffect(() => { api<{ user: User }>('/auth/me').then(result => setUser(result.user)).catch(error => { if (error instanceof ApiError && error.status === 401) router.replace('/login'); }); }, [router]);
  if (!user) return <div className="grid min-h-screen place-items-center text-[#567061]">Loading your ledger...</div>;
  const navItem = ([href, label, Icon]: readonly [string, string, any]) => <Link key={href} href={href} className={`navlink ${path === href ? 'active' : ''}`}><Icon size={18}/>{label}</Link>;
  const logout = async () => { await api('/auth/logout', { method: 'POST' }); router.replace('/login'); };

  return <div className="min-h-screen">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[242px] flex-col border-r border-[#E3E6DE] bg-white p-4 md:flex">
      <Link href="/dashboard" className="shrink-0 px-2 pt-2 pb-6"><p className="m-0 text-[11px] uppercase tracking-[.16em] text-[#759080]">Family finance</p><h1 className="m-0 mt-1 text-xl">Hrithik's Family Ledger</h1></Link>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">{links.map(navItem)}{user.role === 'ADMIN' && <><p className="mb-1 px-3 pt-5 text-[11px] uppercase tracking-[.12em] text-[#8B9B91]">Administration</p>{adminLinks.map(navItem)}</>}</nav>
      <div className="mt-3 shrink-0 border-t bg-white pt-3"><div className="flex items-center gap-3 px-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#DDE7D7] text-sm font-bold text-[#166534]">{user.firstName[0]}{user.lastName[0]}</div><div className="min-w-0"><p className="m-0 truncate text-sm font-bold">{user.firstName} {user.lastName}</p><p className="m-0 text-xs text-[#759080]">{user.role === 'ADMIN' ? 'Administrator' : 'Family member'}</p></div></div><button onClick={logout} className="navlink mt-3 w-full"><LogOut size={17}/>Sign out</button></div>
    </aside>
    <main className="min-w-0 pb-20 md:ml-[242px] md:pb-8"><header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#E3E6DE] bg-[#F7F6F0]/95 px-4 py-3 backdrop-blur sm:px-5 sm:py-4 md:px-8"><div className="min-w-0"><p className="m-0 truncate text-xs text-[#759080]">Welcome back, {user.firstName}</p><h2 className="m-0 truncate text-base font-bold sm:text-lg">{path.includes('admin') ? 'Family management' : 'Your household spending'}</h2></div><Link href="/expenses/new" className="btn btn-primary shrink-0 text-xs sm:text-sm">+<span className="hidden sm:inline"> Add expense</span></Link></header><div className="mx-auto max-w-7xl p-4 sm:p-5 md:p-8">{children}</div></main>
    {mobileMenu && <div className="fixed inset-0 z-40 bg-[#17221E]/30 md:hidden" onClick={() => setMobileMenu(false)}><section className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-lg bg-white p-4 shadow-soft" onClick={event => event.stopPropagation()}><div className="mb-3 flex items-center justify-between"><p className="m-0 font-bold">{user.role === 'ADMIN' ? 'Administration' : 'Account'}</p><button className="btn btn-muted min-h-0 p-2" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={18}/></button></div>{user.role === 'ADMIN' && <nav className="grid gap-1">{adminLinks.map(([href,label,Icon]) => <Link key={href} href={href} onClick={() => setMobileMenu(false)} className={`navlink ${path===href?'active':''}`}><Icon size={18}/>{label}</Link>)}</nav>}<div className="mt-3 border-t pt-3"><Link href="/profile" onClick={() => setMobileMenu(false)} className="navlink"><Settings size={18}/>Profile</Link><button onClick={logout} className="navlink mt-1 w-full"><LogOut size={18}/>Sign out</button></div></section></div>}
    <nav className="fixed bottom-0 z-20 grid w-full grid-cols-5 border-t bg-white p-2 md:hidden">{links.slice(0,3).map(([href, label, Icon]) => <Link key={href} href={href} className={`grid min-w-0 place-items-center gap-1 truncate text-[10px] ${path === href ? 'text-[#166534]' : 'text-[#759080]'}`}><Icon size={19}/><span className="truncate">{label}</span></Link>)}{user.role === 'ADMIN' ? <Link href="/admin" className={`grid min-w-0 place-items-center gap-1 text-[10px] ${path==='/admin'?'text-[#166534]':'text-[#759080]'}`}><ShieldCheck size={19}/><span>Admin</span></Link> : <Link href="/profile" className={`grid min-w-0 place-items-center gap-1 text-[10px] ${path==='/profile'?'text-[#166534]':'text-[#759080]'}`}><Settings size={19}/><span>Profile</span></Link>}<button onClick={() => setMobileMenu(true)} className="grid min-w-0 place-items-center gap-1 text-[10px] text-[#759080]"><Menu size={19}/><span>More</span></button></nav>
  </div>;
}
