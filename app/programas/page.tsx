import {supabase,VERTICAL_COLORS,VERTICAL_ICONS,NIVEL_LABEL} from '@/lib/supabase'
import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
async function getProgramas(){
  const {data}=await supabase.from('programas_academicos').select('*').eq('activo',true).order('creditos',{ascending:false})
  return data||[]
}
export default async function ProgramasPage(){
  const programas=await getProgramas()
  const verticales=[...new Set(programas.map((p:any)=>p.vertical))]
  return(
    <div className="pt-16 min-h-screen bg-[#f7f4ef]">
      <div className="bg-[#0d1117] pt-16 pb-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-3" style={{fontFamily:'serif'}}>Programas de <em className="text-[#c8973a] not-italic">Mejoramiento Profesional</em></h1>
          <p className="text-white/55 text-lg">{programas.length} programas activos · Certificados blockchain</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <div className="bg-[#c8973a]/8 border border-[#c8973a]/20 rounded-xl p-4 mb-10">
          <p className="text-sm text-[#0d1117]/70">No otorgamos titulos academicos formales. Nuestros certificados blockchain son credenciales profesionales verificables internacionalmente.</p>
        </div>
        {verticales.map((vertical:any)=>{
          const progs=programas.filter((p:any)=>p.vertical===vertical)
          const colors=VERTICAL_COLORS[vertical]||{bg:'bg-gray-900',text:'text-gray-100'}
          const icon=VERTICAL_ICONS[vertical]||'📚'
          return(
            <div key={vertical} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{icon}</span>
                <h2 className="font-bold text-[#0d1117] text-xl capitalize" style={{fontFamily:'serif'}}>{vertical.replace(/_/g,' ')}</h2>
                <span className="text-xs text-gray-400">{progs.length} programa(s)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {progs.map((p:any)=>(
                  <Link key={p.id} href={"/programas/"+p.codigo} className="bg-white rounded-xl border border-[#e8e4de] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all group">
                    <div className={colors.bg+" px-5 py-4"}>
                      <div className={"text-[10px] uppercase tracking-widest mb-1 opacity-50 "+colors.text}>{NIVEL_LABEL[p.nivel]||p.nivel}</div>
                      <h3 className={"font-bold text-base leading-tight "+colors.text} style={{fontFamily:'serif'}}>{p.titulo}</h3>
                    </div>
                    <div className="px-5 py-4">
                      {p.proyecto_final&&<p className="text-gray-500 text-xs mb-3 line-clamp-2"><span className="text-[#c8973a] font-semibold">Proyecto: </span>{p.proyecto_final}</p>}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1"><span className="text-xl font-black text-[#c8973a]" style={{fontFamily:'serif'}}>{p.creditos}</span><span className="text-gray-400 text-xs">cr</span></div>
                        <span className="text-xs text-[#c8973a] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Ver <ArrowRight size={10}/></span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}