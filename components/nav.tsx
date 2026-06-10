'use client'
import Link from 'next/link'
import {useState} from 'react'
import {Menu,X} from 'lucide-react'
export default function Nav(){
  const [open,setOpen]=useState(false)
  return(
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117] border-b border-[#c8973a]/20 h-16 flex items-center px-6 md:px-10 justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c8973a] to-[#52b788] flex items-center justify-center font-bold text-[#0d1117] text-lg">I</div>
        <div>
          <div className="text-white text-sm font-semibold leading-tight">Instituto Virtual de IA</div>
          <div className="text-[#c8973a] text-[10px] uppercase tracking-widest">Mejoramiento Profesional</div>
        </div>
      </Link>
      <ul className="hidden md:flex gap-8 list-none">
        {[['/', 'Inicio'],['/programas','Programas'],['/registro','Registro'],['https://t.me/iainstituto_bot','Telegram']].map(([href,label])=>(
          <li key={href}><Link href={href} target={href.startsWith('http')?'_blank':undefined} className="text-white/60 hover:text-[#c8973a] text-sm transition-colors">{label}</Link></li>
        ))}
      </ul>
      <Link href="/registro" className="hidden md:block bg-gradient-to-r from-[#c8973a] to-[#a97c2a] text-[#0d1117] font-bold text-sm px-5 py-2 rounded-lg">Inscribirme</Link>
      <button className="md:hidden text-white" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
      {open&&(
        <div className="absolute top-16 left-0 right-0 bg-[#0d1117] border-b border-[#c8973a]/20 p-6 flex flex-col gap-4 md:hidden">
          {[['/',  'Inicio'],['/programas','Programas'],['/registro','Inscribirme']].map(([href,label])=>(
            <Link key={href} href={href} onClick={()=>setOpen(false)} className="text-white/70 hover:text-[#c8973a]">{label}</Link>
          ))}
          <Link href="https://t.me/iainstituto_bot" target="_blank" className="text-[#52b788]">@iainstituto_bot en Telegram</Link>
        </div>
      )}
    </nav>
  )
}