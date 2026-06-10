import type { Metadata } from 'next'
import { Playfair_Display, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import ChatWidget from '@/components/chat-widget'
const playfair = Playfair_Display({subsets:['latin'],variable:'--font-serif',weight:['400','600','700','900']})
const inter = Inter({subsets:['latin'],variable:'--font-sans'})
const mono = Space_Mono({subsets:['latin'],variable:'--font-mono',weight:['400','700']})
export const metadata: Metadata = {title:'Instituto Virtual de IA — Mejoramiento Profesional',description:'Mejoramiento profesional con IA para América Latina. Certificados blockchain. Mentores IA 24/7.'}
export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="es" className={playfair.variable+' '+inter.variable+' '+mono.variable}>
      <body className="bg-[#f7f4ef] text-[#0d1117] antialiased" style={{fontFamily:'var(--font-sans)'}}>
        <Nav/><main>{children}</main><Footer/><ChatWidget/>
      </body>
    </html>
  )
}