const API=process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000/api';
export class ApiError extends Error { constructor(message:string, public status:number){super(message);} }
export async function api<T>(path:string,init:RequestInit={}){const res=await fetch(`${API}${path}`,{...init,credentials:'include',headers:{...(init.body instanceof FormData?{}:{'Content-Type':'application/json'}),...(init.headers||{})}});if(!res.ok){const b=await res.json().catch(()=>({}));throw new ApiError(b.error||'Request failed',res.status);}if(res.status===204)return undefined as T;return res.json() as Promise<T>}
export const download=(path:string)=>{window.open(`${API}${path}`,'_blank','noopener,noreferrer')};
export function notifyExpenseChange(){window.dispatchEvent(new Event('family-ledger:expenses-changed'));new BroadcastChannel('family-ledger').postMessage('expenses-changed');}
