import Link from 'next/link'
export default function Footer(){
  return(
    <footer className="bg-[#050709] border-t border-[#c8973a]/15 pt-12 pb-6 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8973a] to-[#52b788] flex items-center justify-center font-bold text-[#0d1117]">I</div>
            <span className="text-white font-semibold">Instituto Virtual de IA</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">Mejoramiento profesional bajo los principios de la Doctrina Social y el pensamiento gandhiano.</p>
          <p className="italic text-[#c8973a]/60 text-sm mt-3">"Be the change you wish to see in the world." — Gandhi</p>
        </div>
        <div>
          <h5 className="text-[#c8973a] text-xs uppercase tracking-widest mb-3">Programas</h5>
          {['Ingeniería','AgriTech','Salud','Administración','Humanidades','MBA'].map(p=>(
            <Link key={p} href="/programas" className="block text-white/40 hover:text-white text-sm mb-1.5">{p}</Link>
          ))}
        </div>
        <div>
          <h5 className="text-[#c8973a] text-xs uppercase tracking-widest mb-3">Contacto</h5>
          <Link href="https://t.me/iainstituto_bot" target="_blank" className="block text-[#52b788] text-sm mb-2">Telegram: @iainstituto_bot</Link>
          <Link href="/registro" className="block text-white/40 hover:text-white text-sm mb-2">Formulario de registro</Link>
          <p className="text-white/25 text-xs mt-4">Certificados de Mejoramiento Profesional. No conferimos títulos académicos formales.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-white/5 pt-5 flex justify-between items-center">
        <p className="text-white/25 text-xs">© 2026 Instituto Virtual de IA.</p>
        <p className="italic text-[#c8973a]/40 text-xs">Conocimiento con sabiduría · Ciencia con conciencia</p>
      </div>
    </footer>
  )
}