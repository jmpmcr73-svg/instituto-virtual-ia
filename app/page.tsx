import Link from 'next/link'
import {supabase,VERTICAL_COLORS,VERTICAL_ICONS,NIVEL_LABEL} from '@/lib/supabase'
import {ArrowRight,Bot,BookOpen,Clock,Zap} from 'lucide-react'
async function getProgramas(){
  const {data}=await supabase.from('programas_academicos').select('*').eq('activo',true).order('creditos',{ascending:false}).limit(6)
  return data||[]
}
const AGENTES=[
  {n:'Alejandra',r:'Onboarding',d:'Te recibe y diagnostica tu perfil ideal.'},
  {n:'Don Ernesto',r:'AgriTech',d:'DPV, bio-fenologia, iAgri.'},
  {n:'Profe Marcos',r:'IoT Hardware',d:'PCBs, MQTT, Edge AI.'},
  {n:'Lcda. Carmen',r:'Finanzas OPC',d:'Finanzas con casos reales.'},
  {n:'Sofia',r:'Marketing',d:'Ideas de contenido en minutos.'},
  {n:'DevBot',r:'Software IA',d:'Next.js, Supabase, Claude API.'},
  {n:'El Tribunal',r:'Evaluador',d:'Escenarios de crisis reales.'},
  {n:'Tu Mentor',r:'Mentor 1:1',d:'Recuerda todo. Siempre disponible.'},
  {n:'Impulsa',r:'Coach',d:'Activa cuando llevas 3 dias sin entrar.'},
  {n:'El Asesor',r:'Emprendimiento',d:'Tienes clientes o solo la idea?'},
  {n:'TechBot',r:'Soporte',d:'Max 3 pasos a la vez.'},
  {n:'IntegrityGuard',r:'Proctoring',d:'Solo vectores. Sin video.'},
]
export default async function HomePage(){
  const programas=await getProgramas()
  return(
    <div className="pt-16">
      <section className="min-h-screen bg-[#0d1117] flex flex-col justify-center px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(#c8973a 1px,transparent 1px),linear-gradient(90deg,#c8973a 1px,transparent 1px)',backgroundSize:'48px 48px'}}/>
        <div className="max-w-6xl mx-auto relative z-10 py-20">
          <h1 className="font-black text-white leading-tight mb-6" style={{fontFamily:'serif',fontSize:'clamp(2.8rem,6vw,5rem)'}}>
            <span className="text-[#c8973a]">Ciencia</span> con<br/>
            <span className="text-[#52b788]">conciencia.</span><br/>
            Conocimiento con sabiduria.
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-8">Mejoramiento profesional con IA para emprendedores, agricultores, profesionales y familias de America Latina.</p>
          <blockquote className="border-l-4 border-[#c8973a] pl-5 py-2 bg-[#c8973a]/5 rounded-r-lg mb-10 max-w-lg">
            <p className="italic text-white/75" style={{fontFamily:'serif'}}>"El futuro depende de lo que hagamos en el presente."</p>
            <cite className="text-[#c8973a] text-xs not-italic block mt-1">Mahatma Gandhi</cite>
          </blockquote>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/registro" className="bg-gradient-to-r from-[#c8973a] to-[#a97c2a] text-[#0d1117] font-bold px-8 py-3.5 rounded-xl hover:opacity-90 flex items-center gap-2">Iniciar diagnostico gratuito <ArrowRight size={18}/></Link>
            <Link href="/programas" className="border border-white/20 text-white px-8 py-3.5 rounded-xl hover:border-[#c8973a]/50">Ver programas</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{num:'20',label:'Programas',Icon:BookOpen},{num:'14',label:'Agentes IA',Icon:Bot},{num:'24/7',label:'Disponible',Icon:Clock},{num:'Gratis',label:'Costo inicial',Icon:Zap}].map(({num,label,Icon})=>(
              <div key={label} className="bg-white/3 border border-white/6 rounded-xl p-4">
                <Icon size={18} className="text-[#c8973a] mb-2 opacity-70"/>
                <div className="text-2xl font-black text-[#c8973a]" style={{fontFamily:'serif'}}>{num}</div>
                <div className="text-white/40 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#2d6a4f] to-[#1a3a5c] py-14 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[{t:'Dignidad Humana',d:'Toda formacion parte de la dignidad inalienable de la persona.'},{t:'Ciencia con Conciencia',d:'La tecnologia al servicio del ser humano, nunca al reves.'},{t:'Subsidiariedad',d:'Corporaciones unipersonales enraizadas en la comunidad.'}].map(({t,d})=>(
            <div key={t}><h3 className="text-white font-bold text-lg mb-2" style={{fontFamily:'serif'}}>{t}</h3><p className="text-white/65 text-sm">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f4ef] py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-black text-[#0d1117] text-3xl md:text-4xl" style={{fontFamily:'serif'}}>Programas de <em className="text-[#2d6a4f] not-italic">Mejoramiento</em></h2>
            <Link href="/programas" className="text-[#c8973a] font-semibold flex items-center gap-1 whitespace-nowrap">Ver todos <ArrowRight size={16}/></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programas.map((p:any)=>{
              const colors=VERTICAL_COLORS[p.vertical]||{bg:'bg-gray-900',text:'text-gray-100'}
              const icon=VERTICAL_ICONS[p.vertical]||'📚'
              return(
                <Link key={p.id} href={"/programas/"+p.codigo} className="bg-white rounded-2xl border border-[#e8e4de] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all">
                  <div className={colors.bg+" p-6"}><div className="text-3xl mb-3">{icon}</div><h3 className={"font-bold text-lg leading-tight "+colors.text} style={{fontFamily:'serif'}}>{p.titulo}</h3></div>
                  <div className="p-5">
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{p.proyecto_final||p.habilidad_clave}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1"><span className="text-2xl font-black text-[#c8973a]" style={{fontFamily:'serif'}}>{p.creditos}</span><span className="text-gray-400 text-xs">cr</span></div>
                      <span className="text-xs bg-[#f7f4ef] text-gray-500 px-2 py-1 rounded-full border border-[#e8e4de]">{NIVEL_LABEL[p.nivel]||p.nivel}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0d1117] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <blockquote className="italic text-white/80 text-xl md:text-2xl leading-relaxed mb-4" style={{fontFamily:'serif'}}>"La persona humana es el principio, sujeto y fin de todas las instituciones sociales."</blockquote>
          <cite className="text-[#c8973a] text-xs not-italic uppercase tracking-widest">Gaudium et Spes - Doctrina Social de la Iglesia</cite>
        </div>
      </section>

      <section className="bg-[#f0ede8] py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-[#0d1117] text-3xl md:text-4xl mb-10" style={{fontFamily:'serif'}}>12 agentes que aprenden mientras tu aprendes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {AGENTES.map(a=>(
              <div key={a.n} className="bg-white rounded-xl p-4 border border-[#e8e4de] hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#0d1117] flex items-center justify-center font-bold text-[#c8973a] mb-3">{a.n[0]}</div>
                <div className="font-bold text-[#0d1117] text-sm mb-0.5" style={{fontFamily:'serif'}}>{a.n}</div>
                <div className="text-[#c8973a] text-[10px] uppercase tracking-wide mb-2">{a.r}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#2d6a4f] to-[#1a3a5c] py-20 px-6 md:px-10 text-center">
        <h2 className="font-black text-white text-3xl md:text-4xl mb-4" style={{fontFamily:'serif'}}>Comienza hoy. Tu mentor te espera.</h2>
        <p className="text-white/70 mb-8">Diagnostico gratuito. Sin tarjeta. Alejandra te contacta en minutos.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/registro" className="bg-gradient-to-r from-[#c8973a] to-[#a97c2a] text-[#0d1117] font-bold px-8 py-3.5 rounded-xl hover:opacity-90 flex items-center gap-2">Iniciar registro <ArrowRight size={18}/></Link>
          <Link href="https://t.me/iainstituto_bot" target="_blank" className="border border-white/30 text-white px-8 py-3.5 rounded-xl hover:border-[#52b788] flex items-center gap-2">Abrir en Telegram <ArrowRight size={18}/></Link>
        </div>
      </section>
    </div>
  )
}