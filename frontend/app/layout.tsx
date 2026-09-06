import './globals.css';
import { ToastProvider } from '../components/toast';
export const metadata={title:"Hrithik's Family Ledger",description:'Family expense tracker'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><ToastProvider>{children}</ToastProvider></body></html>}
