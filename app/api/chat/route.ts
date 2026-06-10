import {NextRequest,NextResponse} from 'next/server'
const EDGE=process.env.EDGE_FUNCTION_BASE_URL||'https://jmkkfmthysrvfkmkjtxf.supabase.co/functions/v1'
const KEY=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||''
export async function POST(req:NextRequest){
  try{
    const {mensaje,canal_id,agente_codigo}=await req.json()
    const res=await fetch(EDGE+'/instituto-agent-router',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+KEY},body:JSON.stringify({canal:'web',mensaje,canal_id:canal_id||'web-anon',agente_codigo:agente_codigo||'ONBOARD-001'})})
    if(!res.ok)return NextResponse.json({ok:false,mensaje:'Escribe a @iainstituto_bot en Telegram.'})
    const data=await res.json()
    if(!data.ok)return NextResponse.json({ok:false,mensaje:'Escribe a @iainstituto_bot en Telegram.'})
    return NextResponse.json(data)
  }catch{return NextResponse.json({ok:false,mensaje:'Escribe a @iainstituto_bot en Telegram.'})}
}