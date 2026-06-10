import {createClient} from '@supabase/supabase-js'
import {NextRequest,NextResponse} from 'next/server'
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
export async function POST(req:NextRequest){
  try{
    const b=await req.json()
    await sb.rpc('iv_registrar_lead',{p_nombre:(b.nombre+' '+(b.apellido||'')).trim(),p_email:b.email||null,p_whatsapp:b.whatsapp||null,p_pais:b.pais||null,p_perfil:b.perfil||null,p_area:b.area||null,p_fuente:'web'})
    return NextResponse.json({ok:true})
  }catch{return NextResponse.json({ok:true})}
}