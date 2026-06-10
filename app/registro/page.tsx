'use client'
import {useState} from 'react'
import Link from 'next/link'
import {ArrowRight,CheckCircle} from 'lucide-react'
export default function RegistroPage(){
  const [state,setState]=useState('idle')
  const [nombre,setNombre]=useState('')
  async function handleSubmit(e:any){
    e.preventDefault();setState('loading')
    const fd=new FormData(e.currentTarget)
    const data=Object.fromEntries(fd.entries())
    setNombre(data.nombre as string)
    try{await fetch('/api/registro',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})}catch{}
    setState('done')
  }
  if(state==='done')return(
    <div className="pt-16 min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <CheckCircle size={56} className="text-[#52b788] mx-auto mb-6"/>
        <h1 className="text-white text-3xl font-bold mb-3" style={{fontFamily:'serif'}}>Bienvenido/a, {nombre}!</h1>
        <p className="text-white/60 mb-8">Abre Telegram y escribe a <strong className="text-[#52b788]">@iainstituto_bot</strong> para comenzar tu diagnostico gratuito.</p>
        <Link href="https://t.me/iainstituto_bot" target="_blank" className="inline-flex items-center gap-2 bg-[#52b788] text-[#0d1117] font-bold px-8 py-3.5 rounded-xl">Abrir @iainstituto_bot <ArrowRight size={18}/></Link>
      </div>
    </div>
  )
  return(
    <div className="pt-16 min-h-screen bg-[#f7f4ef]">
      <div className="bg-gradient-to-br from-[#2d6a4f] to-[#1a3a5c] pt-16 pb-12 px-6 text-center">
        <h1 className="text-white text-4xl font-bold mb-3" style={{fontFamily:'serif'}}>Comienza tu diagnostico</h1>
        <p className="text-white/65">Alejandra te contactara por WhatsApp en minutos.</p>
      </div>
      <div className="max-w-xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-[#e8e4de] p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Nombre *</label><input name="nombre" required placeholder="Tu nombre" className="w-full border border-[#e8e4de] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8973a]"/></div>
            <div><label className="block text-sm font-medium mb-1">Apellido</label><input name="apellido" placeholder="Apellido" className="w-full border border-[#e8e4de] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8973a]"/></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Email</label><input name="email" type="email" placeholder="tu@email.com" className="w-full border border-[#e8e4de] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8973a]"/></div>
          <div><label className="block text-sm font-medium mb-1">WhatsApp *</label><input name="whatsapp" required placeholder="+503 7000-0000" className="w-full border border-[#e8e4de] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c8973a]"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Pais</label>
            <select name="pais" className="w-full border border-[#e8e4de] rounded-lg px-3 py-2.5 text-sm focus:outline-none">
              {['El Salvador','Costa Rica','Venezuela','Guatemala','Mexico','Colombia','EE.UU.','Otro'].map(p=><option key={p}>{p}</option>)}
            </select></div>
            <div><label className="block text-sm font-medium mb-1">Perfil</label>
            <select name="perfil" className="w-full border border-[#e8e4de] rounded-lg px-3 py-2.5 text-sm focus:outline-none">
              {['Emprendedor/a','Ama de casa','Agricultor','Profesional','Tecnico','Empresario'].map(p=><option key={p}>{p}</option>)}
            </select></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Area de interes</label>
          <select name="area" className="w-full border border-[#e8e4de] rounded-lg px-3 py-2.5 text-sm focus:outline-none">
            {['Ingenieria','AgriTech','Salud','Finanzas','Derecho','Humanidades','MBA','No lo se'].map(a=><option key={a}>{a}</option>)}
          </select></div>
          <button type="submit" disabled={state==='loading'} className="w-full bg-gradient-to-r from-[#c8973a] to-[#a97c2a] text-[#0d1117] font-bold py-3.5 rounded-xl disabled:opacity-60">
            {state==='loading'?'Registrando...':'Iniciar mi camino'}
          </button>
          <p className="text-gray-400 text-xs text-center">O abre directamente <Link href="https://t.me/iainstituto_bot" target="_blank" className="text-[#52b788]">@iainstituto_bot</Link> en Telegram</p>
        </form>
      </div>
    </div>
  )
}