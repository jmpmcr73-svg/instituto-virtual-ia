'use client'
import {useState,useRef,useEffect} from 'react'
import {MessageCircle,X,Send,ExternalLink} from 'lucide-react'
export default function ChatWidget(){
  const [open,setOpen]=useState(false)
  const [msgs,setMsgs]=useState([{role:'assistant',text:'Hola! Soy Alejandra. En que area quieres mejorar?',agent:'Alejandra'}])
  const [input,setInput]=useState('')
  const [loading,setLoading]=useState(false)
  const [apiOk,setApiOk]=useState(true)
  const bottom=useRef(null)
  useEffect(()=>{(bottom.current as any)?.scrollIntoView({behavior:'smooth'})},[msgs])
  async function send(){
    if(!input.trim()||loading)return
    const text=input.trim();setInput('');setMsgs(p=>[...p,{role:'user',text,agent:''}]);setLoading(true)
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mensaje:text,agente_codigo:'ONBOARD-001',canal_id:'web-widget'})})
      const data=await res.json()
      if(data.ok){setMsgs(p=>[...p,{role:'assistant',text:data.respuesta,agent:data.agente?.nombre||'Agente'}]);setApiOk(true)}
      else{setApiOk(false);setMsgs(p=>[...p,{role:'assistant',text:data.mensaje||'Escribe a @iainstituto_bot en Telegram.',agent:'Sistema'}])}
    }catch{setApiOk(false);setMsgs(p=>[...p,{role:'assistant',text:'Escribe a @iainstituto_bot en Telegram.',agent:'Sistema'}])}
    setLoading(false)
  }
  return(
    <>
      <button onClick={()=>setOpen(o=>!o)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#c8973a] to-[#a97c2a] shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
        {open?<X size={22} className="text-[#0d1117]"/>:<MessageCircle size={22} className="text-[#0d1117]"/>}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#52b788] rounded-full text-[9px] text-white font-bold flex items-center justify-center">IA</span>
      </button>
      {open&&(
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-[#0d1117] border border-[#c8973a]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{maxHeight:'70vh'}}>
          <div className="bg-gradient-to-r from-[#2d6a4f] to-[#1a3a5c] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c8973a]/20 flex items-center justify-center text-sm font-bold text-[#c8973a]">A</div>
            <div><div className="text-white font-semibold text-sm">Alejandra</div><div className="text-white/50 text-xs">Agente de Orientacion</div></div>
            <div className="ml-auto w-2 h-2 bg-[#52b788] rounded-full pulse-dot"/>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {msgs.map((m,i)=>(
              <div key={i} className={"flex "+(m.role==='user'?'justify-end':'justify-start')}>
                {m.role==='assistant'&&<div className="w-6 h-6 rounded-full bg-[#c8973a]/10 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5 text-[#c8973a] font-bold">A</div>}
                <div className={"max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed "+(m.role==='user'?'bg-[#c8973a] text-[#0d1117] font-medium':'bg-white/5 text-white/85 border border-white/5')}>
                  {m.role==='assistant'&&m.agent&&<div className="text-[10px] text-[#c8973a] mb-1 uppercase tracking-wide">{m.agent}</div>}
                  {m.text}
                </div>
              </div>
            ))}
            {loading&&<div className="flex justify-start"><div className="w-6 h-6 rounded-full bg-[#c8973a]/10 flex items-center justify-center mr-2 text-xs text-[#c8973a] font-bold">A</div><div className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl"><div className="flex gap-1">{[0,1,2].map(i=><div key={i} className="w-1.5 h-1.5 bg-[#c8973a] rounded-full animate-bounce" style={{animationDelay:i*0.15+'s'}}/>)}</div></div></div>}
            <div ref={bottom}/>
          </div>
          {!apiOk&&<div className="px-4 py-2 bg-[#52b788]/10 border-t border-[#52b788]/20"><a href="https://t.me/iainstituto_bot" target="_blank" rel="noopener" className="flex items-center gap-2 text-[#52b788] text-xs font-medium hover:underline"><ExternalLink size={12}/>Continuar en @iainstituto_bot</a></div>}
          <div className="border-t border-white/5 p-3 flex gap-2">
            <input className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none" placeholder="Escribe tu mensaje..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} disabled={loading}/>
            <button onClick={send} disabled={loading||!input.trim()} className="w-9 h-9 rounded-lg bg-[#c8973a] flex items-center justify-center disabled:opacity-40"><Send size={14} className="text-[#0d1117]"/></button>
          </div>
        </div>
      )}
    </>
  )
}