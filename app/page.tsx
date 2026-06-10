"use client";
import { useState, useEffect, useRef } from "react";

// ── DATOS ──────────────────────────────────────────────────────────────────
const FACULTADES = [
  { codigo:"FAC-ING", nombre:"Ingeniería y Sistemas", emoji:"⚙️", color:"#3B82F6", bg:"rgba(59,130,246,.10)", num:8 },
  { codigo:"FAC-ENE", nombre:"Energía y Petróleo", emoji:"🔥", color:"#EF4444", bg:"rgba(239,68,68,.10)", num:6 },
  { codigo:"FAC-AMB", nombre:"Agua, Ambiente y Clima", emoji:"🌊", color:"#14B8A6", bg:"rgba(20,184,166,.10)", num:6 },
  { codigo:"FAC-AGRO", nombre:"Ciencias Agronómicas", emoji:"🌾", color:"#22C55E", bg:"rgba(34,197,94,.10)", num:6 },
  { codigo:"FAC-SAL", nombre:"Ciencias de la Salud", emoji:"🩺", color:"#EC4899", bg:"rgba(236,72,153,.10)", num:3 },
  { codigo:"FAC-ADM", nombre:"Administración y Negocios", emoji:"💼", color:"#F59E0B", bg:"rgba(245,158,11,.10)", num:5 },
  { codigo:"FAC-DER", nombre:"Derecho y Legal Tech", emoji:"⚖️", color:"#8B5CF6", bg:"rgba(139,92,246,.10)", num:2 },
  { codigo:"FAC-HUM", nombre:"Humanidades y Educación", emoji:"📚", color:"#10B981", bg:"rgba(16,185,129,.10)", num:2 },
  { codigo:"FAC-TEC", nombre:"Programas Técnicos", emoji:"🏠", color:"#6B7280", bg:"rgba(107,114,128,.10)", num:2 },
];

const NIVELES = [
  { id:"tecnico", label:"Técnico", cr:"8–20 cr", desc:"Sin requisitos previos" },
  { id:"basico", label:"Básico", cr:"8–15 cr", desc:"Ideal para comenzar" },
  { id:"avanzado", label:"Avanzado", cr:"20–30 cr", desc:"Profundización práctica" },
  { id:"experto", label:"Grado Completo", cr:"84 cr", desc:"Estándar MIT/Wageningen" },
  { id:"diplomado", label:"Diplomado", cr:"30 cr", desc:"Especialización ejecutiva" },
  { id:"posgrado", label:"Maestría / MSc", cr:"60 ECTS", desc:"Defensa ante Tribunal IA" },
];

const STATS = [
  { num:"9", label:"Facultades" },
  { num:"36", label:"Programas" },
  { num:"17", label:"Agentes IA" },
  { num:"102", label:"Materias" },
  { num:"24/7", label:"Disponible" },
  { num:"$0", label:"Para empezar" },
];

const PILARES = [
  { icon:"🎯", titulo:"Misión", texto:"Democratizar el acceso al conocimiento profesional de clase mundial para emprendedores, agricultores, técnicos y familias de América Latina mediante inteligencia artificial." },
  { icon:"🔭", titulo:"Visión", texto:"Ser la plataforma de mejoramiento profesional más rigurosa y accesible del hemisferio, donde cada egresado funde una empresa propia con estándares internacionales." },
  { icon:"💡", titulo:"Propósito", texto:"Que el conocimiento no sea privilegio de unos pocos. Que cada persona, sin importar su origen, pueda actualizar sus fortalezas y competir en el mercado global." },
  { icon:"⚖️", titulo:"Principios", texto:"Doctrina Social: subsidiariedad, dignidad humana y bien común. Excelencia sin arrogancia. Ciencia con conciencia. La IA amplifica a la persona — nunca la reemplaza." },
];

const SIMULADORES = [
  { area:"Ingeniería", tool:"FreeCAD + OpenFOAM", desc:"Diseña piezas mecánicas en 3D y simula flujos de fluidos. El mismo software que usan ingenieros de SpaceX y Airbus.", color:"#3B82F6" },
  { area:"Agronomía", tool:"DSSAT + QGIS", desc:"Simula el rendimiento de tu cultivo antes de sembrar. Modela el impacto del cambio climático en tu finca.", color:"#22C55E" },
  { area:"Agua y Ambiente", tool:"EPANET + SWAT+", desc:"Diseña redes de agua potable para 500 familias. Modela cuencas hidrográficas completas con datos reales.", color:"#14B8A6" },
  { area:"Energía", tool:"DWSIM + PyPSA", desc:"Simula procesos petroquímicos completos. Diseña micro-redes de energía renovable para comunidades rurales.", color:"#EF4444" },
  { area:"Salud", tool:"OpenMRS + 3D Slicer", desc:"Gestiona una clínica de telesalud desde el primer día. Visualiza imágenes médicas en 3D con IA diagnóstica.", color:"#EC4899" },
  { area:"Software IA", tool:"Claude API + Supabase", desc:"Construye tu propio SaaS con agentes IA integrados. Del diseño al deploy en producción — en semanas.", color:"#8B5CF6" },
];

const VALORACION_TEXTS = [
  { q:"¿Solo se aprende en pantalla?", a:"Los simuladores y proyectos capstone son con herramientas reales: FreeCAD, DSSAT, EPANET, Claude API. Aprendes haciendo, no memorizando." },
  { q:"¿El certificado vale en el mercado?", a:"El certificado se registra en blockchain (Polygon L2, estándar MIT Blockcerts). Cualquier empresa puede verificarlo en segundos con un QR. No es un título universitario — es una credencial de competencias verificables." },
  { q:"¿Qué diferencia a los agentes IA?", a:"No son chatbots genéricos. Cada agente tiene personalidad, metodología propia y recuerda tu historia. Don Ernesto usa analogías del campo. El Tribunal evalúa con escenarios de crisis reales, sin opción múltiple." },
  { q:"¿Con quién me comparo internacionalmente?", a:"Los pensum están construidos sobre los currículos de MIT, Wageningen, Harvard Medical, ETH Zurich y Yale Law. Cada programa cita su referente internacional." },
];

// ── COMPONENTE HÉROE CON CANVAS DE NEURONAS ─────────────────────────────────
function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let W = c.offsetWidth, H = c.offsetHeight;
    c.width = W; c.height = H;
    const N = 55;
    const nodes = Array.from({length:N}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
      r: 1.5 + Math.random()*2.5,
      pulse: Math.random()*Math.PI*2,
    }));
    let frame = 0;
    const MAX_D = 130;
    const loop = () => {
      frame++;
      ctx.clearRect(0,0,W,H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += .015;
        if (n.x<0||n.x>W) n.vx*=-1;
        if (n.y<0||n.y>H) n.vy*=-1;
      });
      for (let i=0; i<N; i++) for (let j=i+1; j<N; j++) {
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if (d<MAX_D) {
          const a = (1-d/MAX_D)*.35;
          ctx.strokeStyle=`rgba(200,151,58,${a})`;
          ctx.lineWidth=.6;
          ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke();
        }
      }
      nodes.forEach(n => {
        const glow = Math.sin(n.pulse)*.3+.5;
        const g = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*4);
        g.addColorStop(0,`rgba(200,151,58,${glow*.8})`);
        g.addColorStop(1,"rgba(200,151,58,0)");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(n.x,n.y,n.r*4,0,Math.PI*2); ctx.fill();
        ctx.fillStyle=`rgba(240,237,232,${.4+glow*.4})`;
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
      });
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    const onResize = () => { W=c.offsetWidth; H=c.offsetHeight; c.width=W; c.height=H; };
    window.addEventListener("resize",onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize",onResize); };
  }, []);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.55}} />;
}

// ── NAVEGADOR JERÁRQUICO ─────────────────────────────────────────────────────
function NavegadorJerarquico() {
  const [area, setArea] = useState<string|null>(null);
  const [programa, setPrograma] = useState<string|null>(null);
  const [materia, setMateria] = useState<string|null>(null);
  const [programas, setProgramas] = useState<any[]>([]);
  const [fases, setFases] = useState<any[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const SUPA = "https://jmkkfmthysrvfkmkjtxf.supabase.co";
  const KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impta2tmbXRoeXNydmZrbWtqdHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNzE0NDYsImV4cCI6MjA5NTk0NzQ0Nn0.jQ6cPI8yiHjB2fyEn7TzlIi_bco_H_dObVnX9gCEGEM";
  const hdr  = { apikey: KEY, Authorization:`Bearer ${KEY}` };

  const selFac = async (cod: string) => {
    setArea(cod); setPrograma(null); setMateria(null); setFases([]); setMaterias([]);
    setLoading(true);
    try {
      const r = await fetch(`${SUPA}/rest/v1/iv_programas?select=id,codigo,titulo,nivel,creditos,habilidad_clave,proyecto_final&facultad_codigo=eq.${cod}&activo=eq.true&order=creditos.desc`, {headers:hdr});
      const d = await r.json();
      setProgramas(Array.isArray(d)?d:[]);
    } catch { setProgramas([]); }
    setLoading(false);
  };

  const selProg = async (p: any) => {
    setPrograma(p.codigo); setMateria(null); setMaterias([]);
    setLoading(true);
    try {
      const r = await fetch(`${SUPA}/rest/v1/iv_fases?select=id,numero,nombre,creditos,semanas&programa_id=eq.${p.id}&order=orden`, {headers:hdr});
      const d = await r.json();
      setFases(Array.isArray(d)?d:[]);
    } catch { setFases([]); }
    setLoading(false);
  };

  const selFase = async (faseId: string) => {
    setLoading(true);
    try {
      const r = await fetch(`${SUPA}/rest/v1/iv_materias?select=id,codigo,nombre,creditos,horas_semanales,horas_teoria,horas_practica,tipo,software_tools,evaluacion_tipo,agente_codigo&fase_id=eq.${faseId}&order=orden`, {headers:hdr});
      const d = await r.json();
      setMaterias(Array.isArray(d)?d:[]);
    } catch { setMaterias([]); }
    setLoading(false);
  };

  const facActual = FACULTADES.find(f=>f.codigo===area);
  const progActual = programas.find(p=>p.codigo===programa);
  const NIVEL_LABEL: Record<string,string> = {tecnico:"Técnico",basico:"Básico",intermedio:"Intermedio",avanzado:"Avanzado",experto:"Grado Completo",diplomado:"Diplomado",posgrado:"Maestría"};

  return (
    <div style={{background:"var(--navy,#0C1525)",border:"1px solid rgba(240,237,232,.08)",borderRadius:20,overflow:"hidden"}}>
      {/* breadcrumb */}
      <div style={{padding:"16px 24px",borderBottom:"1px solid rgba(240,237,232,.06)",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span onClick={()=>{setArea(null);setPrograma(null);setMateria(null)}} style={{cursor:"pointer",fontSize:13,color:area?"rgba(200,151,58,.7)":"#C8973A",fontWeight:500}}>Áreas de conocimiento</span>
        {area && <><span style={{color:"rgba(240,237,232,.2)"}}>›</span>
          <span onClick={()=>{setPrograma(null);setMateria(null)}} style={{cursor:"pointer",fontSize:13,color:programa?"rgba(200,151,58,.7)":"#C8973A",fontWeight:500}}>{facActual?.nombre}</span></>}
        {programa && <><span style={{color:"rgba(240,237,232,.2)"}}>›</span>
          <span style={{fontSize:13,color:"#C8973A",fontWeight:500}}>{progActual?.titulo}</span></>}
      </div>

      <div style={{padding:24,minHeight:340}}>
        {loading && <div style={{textAlign:"center",padding:"60px 0",color:"rgba(240,237,232,.4)",fontSize:14}}>Cargando...</div>}

        {/* NIVEL 1 — Facultades */}
        {!loading && !area && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {FACULTADES.map(f=>(
              <div key={f.codigo} onClick={()=>selFac(f.codigo)}
                style={{background:f.bg,border:`1px solid ${f.color}30`,borderRadius:12,padding:"16px 14px",cursor:"pointer",transition:"all .2s"}}
                onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-2px)")}
                onMouseLeave={e=>(e.currentTarget.style.transform="none")}>
                <div style={{fontSize:22,marginBottom:6}}>{f.emoji}</div>
                <div style={{fontSize:13,fontWeight:600,color:"#F0EDE8",marginBottom:3}}>{f.nombre}</div>
                <div style={{fontSize:11,color:f.color,fontFamily:"monospace"}}>{f.num} programas →</div>
              </div>
            ))}
          </div>
        )}

        {/* NIVEL 2 — Programas */}
        {!loading && area && !programa && (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{marginBottom:8,fontSize:13,color:"rgba(240,237,232,.5)"}}>Selecciona un programa para ver el pensum completo</div>
            {programas.length===0 && <div style={{color:"rgba(240,237,232,.4)",fontSize:14,padding:"40px 0",textAlign:"center"}}>Programas de esta facultad en preparación</div>}
            {programas.map(p=>(
              <div key={p.codigo} onClick={()=>selProg(p)}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(240,237,232,.03)",border:"1px solid rgba(240,237,232,.07)",borderRadius:10,padding:"14px 18px",cursor:"pointer",transition:"all .18s"}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(200,151,58,.3)")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(240,237,232,.07)")}>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:"#F0EDE8",marginBottom:2}}>{p.titulo}</div>
                  <div style={{fontSize:12,color:"rgba(240,237,232,.45)"}}>{p.proyecto_final||p.habilidad_clave||""}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:16}}>
                  <div style={{fontSize:20,color:"#C8973A",fontFamily:"serif",fontWeight:400}}>{p.creditos}</div>
                  <div style={{fontSize:10,color:"rgba(240,237,232,.3)",fontFamily:"monospace"}}>créditos</div>
                  <div style={{marginTop:4,fontSize:10,padding:"2px 8px",borderRadius:4,background:"rgba(200,151,58,.1)",color:"#C8973A",fontFamily:"monospace"}}>{NIVEL_LABEL[p.nivel]||p.nivel}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NIVEL 3 — Fases y materias */}
        {!loading && programa && (
          <div>
            <div style={{marginBottom:16,fontSize:13,color:"rgba(240,237,232,.5)"}}>{fases.length} fases · Haz clic en una fase para ver sus materias</div>
            {fases.length===0 && <div style={{color:"rgba(240,237,232,.4)",fontSize:14,padding:"40px 0",textAlign:"center"}}>Pensum en preparación</div>}
            {fases.map(f=>(
              <div key={f.id} style={{marginBottom:16}}>
                <div onClick={()=>selFase(f.id)}
                  style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:`rgba(200,151,58,.08)`,border:"1px solid rgba(200,151,58,.2)",borderRadius:10,padding:"12px 18px",cursor:"pointer"}}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(200,151,58,.14)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="rgba(200,151,58,.08)")}>
                  <div>
                    <span style={{fontFamily:"monospace",fontSize:11,color:"rgba(200,151,58,.7)",marginRight:10}}>F{f.numero}</span>
                    <span style={{fontSize:14,fontWeight:600,color:"#F0EDE8"}}>{f.nombre}</span>
                  </div>
                  <div style={{display:"flex",gap:12}}>
                    <span style={{fontSize:12,color:"rgba(240,237,232,.5)"}}>{f.creditos} cr</span>
                    <span style={{fontSize:12,color:"rgba(240,237,232,.4)"}}>{f.semanas} sem</span>
                    <span style={{fontSize:12,color:"#C8973A"}}>ver materias →</span>
                  </div>
                </div>
                {/* Materias */}
                {materias.length>0 && (
                  <div style={{marginTop:8,paddingLeft:16,display:"flex",flexDirection:"column",gap:6}}>
                    {materias.map((m,i)=>(
                      <div key={m.id} style={{background:"rgba(240,237,232,.02)",border:"1px solid rgba(240,237,232,.05)",borderRadius:8,padding:"10px 14px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                          <div>
                            <div style={{fontSize:13,fontWeight:500,color:"#F0EDE8"}}>{m.nombre}</div>
                            <div style={{marginTop:4,display:"flex",gap:6,flexWrap:"wrap"}}>
                              <span style={{fontSize:10,color:"rgba(240,237,232,.4)",fontFamily:"monospace"}}>{m.codigo}</span>
                              <span style={{fontSize:10,color:"rgba(29,184,135,.7)",fontFamily:"monospace"}}>{m.horas_teoria}h teoría + {m.horas_practica}h práctica</span>
                              {m.evaluacion_tipo && <span style={{fontSize:10,padding:"1px 6px",borderRadius:4,background:"rgba(139,92,246,.12)",color:"rgba(139,92,246,.9)",fontFamily:"monospace"}}>{m.evaluacion_tipo}</span>}
                            </div>
                            {m.software_tools?.length>0 && (
                              <div style={{marginTop:6,display:"flex",gap:4,flexWrap:"wrap"}}>
                                {m.software_tools.map((s:string)=>(
                                  <span key={s} style={{fontSize:10,padding:"2px 7px",borderRadius:4,background:"rgba(200,151,58,.08)",color:"#C8973A",border:"1px solid rgba(200,151,58,.15)",fontFamily:"monospace"}}>{s}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                            <div style={{fontSize:18,color:"#C8973A",fontFamily:"serif"}}>{m.creditos}</div>
                            <div style={{fontSize:9,color:"rgba(240,237,232,.3)",fontFamily:"monospace"}}>cr</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SECCIÓN PREGUNTAS ────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {VALORACION_TEXTS.map((item,i)=>(
        <div key={i} style={{background:"rgba(240,237,232,.03)",border:"1px solid rgba(240,237,232,.07)",borderRadius:12,overflow:"hidden"}}>
          <div onClick={()=>setOpen(open===i?null:i)}
            style={{padding:"16px 20px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:15,fontWeight:500,color:"#F0EDE8"}}>{item.q}</span>
            <span style={{color:"#C8973A",fontSize:18,transition:"transform .2s",transform:open===i?"rotate(45deg)":"none"}}>+</span>
          </div>
          {open===i && <div style={{padding:"0 20px 16px",fontSize:14,color:"rgba(240,237,232,.65)",lineHeight:1.75}}>{item.a}</div>}
        </div>
      ))}
    </div>
  );
}

// ── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const [gandhiText, setGandhiText] = useState("");
  const GANDHI = "El futuro depende de lo que hagamos en el presente.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < GANDHI.length) { setGandhiText(GANDHI.slice(0, ++i)); } else clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  const S = {
    page: { background:"#060A12", color:"#F0EDE8", fontFamily:"'DM Sans',system-ui,sans-serif", minHeight:"100vh" } as React.CSSProperties,
    // Nav
    nav: { position:"fixed" as const, top:0, left:0, right:0, zIndex:100, height:68, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(1.5rem,4vw,4rem)", background:"rgba(6,10,18,.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(200,151,58,.1)" },
    navLogo: { display:"flex", alignItems:"center", gap:12 },
    navGem: { width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#C8973A,#1DB887)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"serif", fontSize:17, color:"#060A12" },
    navLinks: { display:"flex", gap:"2.5rem", listStyle:"none" as const },
    navCta: { background:"#C8973A", color:"#060A12", fontWeight:700, fontSize:13, padding:"9px 22px", borderRadius:8, textDecoration:"none" },
    // Sections
    section: (bg:string="transparent") => ({ padding:"clamp(4rem,8vw,7rem) clamp(1.5rem,4vw,4rem)", background:bg }),
    inner: { maxWidth:1200, margin:"0 auto" } as React.CSSProperties,
    label: { fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:".15em", textTransform:"uppercase" as const, color:"#C8973A", display:"flex", alignItems:"center", gap:10, marginBottom:16 },
    h2: { fontFamily:"'DM Serif Display',serif", fontSize:"clamp(2rem,3.5vw,2.9rem)", lineHeight:1.12, color:"#F0EDE8", marginBottom:12 } as React.CSSProperties,
    lead: { fontSize:"1.05rem", color:"rgba(240,237,232,.6)", maxWidth:580, lineHeight:1.75, marginBottom:"2.5rem" } as React.CSSProperties,
  };

  return (
    <div style={S.page}>
      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navLogo}>
          <div style={S.navGem}>IV</div>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:"#F0EDE8",lineHeight:1.2}}>Instituto Virtual de IA</div>
            <div style={{fontSize:10,color:"#C8973A",fontFamily:"monospace",letterSpacing:".1em",textTransform:"uppercase"}}>Mejoramiento Profesional</div>
          </div>
        </div>
        <ul style={S.navLinks} className="nav-links-hide">
          {["#facultades","#como-funciona","#simuladores","#certificacion","#registro"].map((h,i)=>(
            <li key={h}><a href={h} style={{fontSize:13,fontWeight:500,color:"rgba(240,237,232,.6)",textDecoration:"none"}}>{["Facultades","Cómo funciona","Simuladores","Certificación","Registro"][i]}</a></li>
          ))}
        </ul>
        <a href="#registro" style={S.navCta}>Inscribirme gratis</a>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"calc(68px + 4rem) clamp(1.5rem,4vw,4rem) 4rem", position:"relative", overflow:"hidden", background:"linear-gradient(160deg,#0C1525 0%,#060A12 60%)"}}>
        <NeuralCanvas />
        {/* Glow orbs */}
        <div style={{position:"absolute",top:"-15%",right:"-5%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,.06),transparent 65%)",pointerEvents:"none"}} />
        <div style={{position:"absolute",bottom:"-10%",left:"-5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(29,184,135,.05),transparent 65%)",pointerEvents:"none"}} />

        <div style={{...S.inner, position:"relative", zIndex:2, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#1DB887",animation:"pulse 2s infinite"}} />
              <span style={{fontFamily:"monospace",fontSize:"0.68rem",letterSpacing:".14em",color:"#1DB887",textTransform:"uppercase"}}>Instituto Virtual de IA · 2026</span>
            </div>
            <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2.8rem,4.5vw,4.2rem)",lineHeight:1.06,letterSpacing:"-.015em",color:"#F0EDE8",marginBottom:20}}>
              <em style={{color:"#C8973A",fontStyle:"italic"}}>Ciencia</em> con<br/>
              <span style={{color:"#1DB887"}}>conciencia.</span><br/>
              Conocimiento<br/>con sabiduría.
            </h1>
            <p style={{fontSize:"1.1rem",color:"rgba(240,237,232,.6)",maxWidth:480,lineHeight:1.8,marginBottom:24}}>
              Mejoramiento profesional de clase mundial con IA para emprendedores, agricultores, técnicos y familias de América Latina.
            </p>
            <div style={{background:"linear-gradient(135deg,rgba(200,151,58,.07),rgba(200,151,58,.02))",border:"1px solid rgba(200,151,58,.15)",borderRadius:12,padding:"16px 20px",marginBottom:28,maxWidth:480}}>
              <p style={{fontFamily:"'DM Serif Display',serif",fontStyle:"italic",fontSize:"0.97rem",color:"rgba(240,237,232,.8)",lineHeight:1.65,margin:0}}>
                "{gandhiText}<span style={{color:"#C8973A",animation:"blink .7s infinite"}}>|</span>"
              </p>
              <cite style={{fontFamily:"monospace",fontSize:"0.62rem",color:"#C8973A",letterSpacing:".1em",textTransform:"uppercase",display:"block",marginTop:6}}>Mahatma Gandhi</cite>
            </div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:32}}>
              <a href="#registro" style={{background:"#C8973A",color:"#060A12",fontWeight:700,fontSize:"0.9rem",padding:"13px 28px",borderRadius:12,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6}}>
                Iniciar diagnóstico gratuito →
              </a>
              <a href="#facultades" style={{border:"1.5px solid rgba(240,237,232,.15)",color:"rgba(240,237,232,.65)",fontWeight:500,fontSize:"0.9rem",padding:"13px 28px",borderRadius:12,textDecoration:"none"}}>
                Ver programas
              </a>
            </div>
            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:1,background:"rgba(240,237,232,.05)",borderRadius:12,overflow:"hidden",border:"1px solid rgba(240,237,232,.05)"}}>
              {STATS.map(s=>(
                <div key={s.label} style={{background:"#060A12",padding:"14px 8px",textAlign:"center"}}>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.7rem",color:"#C8973A",lineHeight:1}}>{s.num}</div>
                  <div style={{fontFamily:"monospace",fontSize:"0.58rem",color:"rgba(240,237,232,.3)",letterSpacing:".06em",textTransform:"uppercase",marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha — preview del navegador jerárquico */}
          <div style={{display:"flex",flexDirection:"column",gap:12}} className="hero-right-hide">
            <div style={{background:"rgba(240,237,232,.03)",border:"1px solid rgba(200,151,58,.12)",borderRadius:16,padding:"16px 18px",marginBottom:4}}>
              <div style={{fontFamily:"monospace",fontSize:"0.62rem",color:"#C8973A",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>Navega el pensum en tiempo real</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {FACULTADES.slice(0,4).map(f=>(
                  <div key={f.codigo} style={{background:f.bg,border:`1px solid ${f.color}25`,borderRadius:8,padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:16}}>{f.emoji}</span>
                    <div>
                      <div style={{fontSize:11,fontWeight:600,color:"#F0EDE8"}}>{f.nombre.split(" ").slice(0,2).join(" ")}</div>
                      <div style={{fontSize:10,color:f.color,fontFamily:"monospace"}}>{f.num} prog.</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#facultades" style={{display:"block",marginTop:10,textAlign:"center",fontSize:11,color:"#C8973A",fontFamily:"monospace",textDecoration:"none"}}>Ver las 9 facultades completas ↓</a>
            </div>
            {[
              {icon:"🏅",titulo:"Certificado blockchain",desc:"Verificable en Polygon L2. Estándar MIT Blockcerts v3.",badge:"Inmutable · Global"},
              {icon:"🤖",titulo:"17 agentes IA docentes",desc:"Cada uno con personalidad, metodología y memoria de tu historia.",badge:"24/7 · WhatsApp + Telegram"},
              {icon:"🔬",titulo:"Simuladores open source",desc:"FreeCAD, DSSAT, EPANET, DWSIM — el mismo software de ingenieros reales.",badge:"100% open source"},
            ].map((c,i)=>(
              <div key={i} style={{background:"rgba(12,21,37,.9)",border:"1px solid rgba(240,237,232,.07)",borderRadius:14,padding:"16px 18px",display:"flex",alignItems:"flex-start",gap:14,transition:"all .2s"}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(200,151,58,.25)")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(240,237,232,.07)")}>
                <span style={{fontSize:22,flexShrink:0}}>{c.icon}</span>
                <div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#F0EDE8",marginBottom:4}}>{c.titulo}</div>
                  <div style={{fontSize:"0.82rem",color:"rgba(240,237,232,.55)",lineHeight:1.6,marginBottom:6}}>{c.desc}</div>
                  <span style={{fontFamily:"monospace",fontSize:"0.62rem",background:"rgba(29,184,135,.08)",color:"#1DB887",padding:"2px 8px",borderRadius:4,border:"1px solid rgba(29,184,135,.15)"}}>{c.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER BANNER ──────────────────────────────────────────────── */}
      <div style={{background:"rgba(200,151,58,.08)",borderTop:"1px solid rgba(200,151,58,.2)",borderBottom:"1px solid rgba(200,151,58,.2)",padding:"14px clamp(1.5rem,4vw,4rem)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontFamily:"monospace",fontSize:11,color:"#C8973A",background:"rgba(200,151,58,.15)",padding:"3px 10px",borderRadius:4,flexShrink:0}}>IMPORTANTE</span>
          <p style={{fontSize:13,color:"rgba(240,237,232,.65)",margin:0,lineHeight:1.6}}>
            Emitimos <strong style={{color:"rgba(240,237,232,.85)"}}>Certificados de Mejoramiento Profesional</strong> verificables en blockchain — no títulos universitarios. Actualizamos, reforzamos y mejoramos el acceso a conocimientos y fortalezas adaptadas al mercado global actual.
          </p>
        </div>
      </div>

      {/* ── VISIÓN / MISIÓN / PROPÓSITO / PRINCIPIOS ──────────────────────── */}
      <section style={S.section("#0C1525")} id="vision">
        <div style={S.inner}>
          <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Identidad institucional</div>
          <h2 style={{...S.h2, maxWidth:600}}>Construidos sobre valores que <em style={{color:"#C8973A",fontStyle:"italic"}}>no negociamos</em></h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16,marginTop:8}}>
            {PILARES.map((p,i)=>(
              <div key={i} style={{background:"rgba(240,237,232,.02)",border:"1px solid rgba(240,237,232,.06)",borderRadius:16,padding:"28px 24px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-20,right:-20,fontSize:80,opacity:.04,userSelect:"none"}}>{p.icon}</div>
                <div style={{fontSize:28,marginBottom:12}}>{p.icon}</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.2rem",color:"#F0EDE8",marginBottom:10}}>{p.titulo}</div>
                <p style={{fontSize:14,color:"rgba(240,237,232,.6)",lineHeight:1.75,margin:0}}>{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NIVELES ACADÉMICOS ─────────────────────────────────────────────── */}
      <section style={S.section()} id="niveles">
        <div style={S.inner}>
          <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Niveles académicos</div>
          <h2 style={S.h2}>Desde <em style={{color:"#C8973A",fontStyle:"italic"}}>técnico</em> hasta maestría</h2>
          <p style={S.lead}>Sin importar tu punto de partida — encontramos tu nivel y construimos desde ahí.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {NIVELES.map((n,i)=>(
              <div key={n.id} style={{background:"rgba(240,237,232,.02)",border:"1px solid rgba(240,237,232,.06)",borderRadius:12,padding:"20px 18px",transition:"border-color .2s"}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(200,151,58,.3)")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(240,237,232,.06)")}>
                <div style={{fontFamily:"monospace",fontSize:11,color:"#C8973A",letterSpacing:".08em",marginBottom:6}}>{n.cr}</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.1rem",color:"#F0EDE8",marginBottom:4}}>{n.label}</div>
                <div style={{fontSize:13,color:"rgba(240,237,232,.5)"}}>{n.desc}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,padding:"14px 20px",background:"rgba(29,184,135,.05)",border:"1px solid rgba(29,184,135,.12)",borderRadius:10,fontSize:13,color:"rgba(240,237,232,.6)"}}>
            ✓ Todos los programas incluyen el <strong style={{color:"rgba(240,237,232,.8)"}}>Núcleo Transversal DSI-OPC</strong> de 20 créditos: Finanzas · Mercadeo · Logística · RRHH · Legal · Ambiental · IA · Corporación Unipersonal
          </div>
        </div>
      </section>

      {/* ── NAVEGADOR JERÁRQUICO ───────────────────────────────────────────── */}
      <section style={S.section("#0C1525")} id="facultades">
        <div style={S.inner}>
          <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Explora el pensum</div>
          <h2 style={S.h2}>Navega de área a <em style={{color:"#C8973A",fontStyle:"italic"}}>materia</em> — en tiempo real</h2>
          <p style={S.lead}>Haz clic en una facultad → elige un programa → abre las fases → ve cada materia con sus créditos, horas y simuladores.</p>
          <NavegadorJerarquico />
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ─────────────────────────────────────────────────── */}
      <section style={S.section()} id="como-funciona">
        <div style={S.inner}>
          <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Proceso</div>
          <h2 style={S.h2}>Del diagnóstico a la <em style={{color:"#C8973A",fontStyle:"italic"}}>certificación</em></h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2px",background:"rgba(240,237,232,.04)",borderRadius:16,overflow:"hidden",border:"1px solid rgba(240,237,232,.06)"}}>
            {[
              {n:"01",icon:"🌟",title:"Diagnóstico gratuito",desc:"Alejandra evalúa tu perfil y diseña tu ruta personalizada en minutos."},
              {n:"02",icon:"📱",title:"Aprende sin horarios",desc:"WhatsApp, Telegram o web. Evaluaciones por escenarios reales, nunca opción múltiple."},
              {n:"03",icon:"🔬",title:"Simulas con herramientas reales",desc:"FreeCAD, DSSAT, EPANET, Claude API — el mismo software que usan los mejores."},
              {n:"04",icon:"🏅",title:"Certificado blockchain",desc:"Credencial en Polygon L2. Verificable globalmente por cualquier empleador."},
            ].map((s,i)=>(
              <div key={i} style={{background:"#060A12",padding:"32px 24px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-10,right:10,fontFamily:"serif",fontSize:"4rem",color:"rgba(200,151,58,.06)",lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:24,marginBottom:12}}>{s.icon}</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#F0EDE8",marginBottom:8}}>{s.title}</div>
                <p style={{fontSize:13,color:"rgba(240,237,232,.55)",lineHeight:1.7,margin:0}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIMULADORES ───────────────────────────────────────────────────── */}
      <section style={S.section("#0C1525")} id="simuladores">
        <div style={S.inner}>
          <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Simuladores open source</div>
          <h2 style={S.h2}>Aprendes con las herramientas que <em style={{color:"#C8973A",fontStyle:"italic"}}>usa la industria</em></h2>
          <p style={S.lead}>No aprendes sobre simuladores — aprendes con ellos. 100% open source, gratuitos, y los mismos que usan SpaceX, FAO, NASA y los mejores centros de investigación del mundo.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {SIMULADORES.map((s,i)=>(
              <div key={i} style={{background:"rgba(240,237,232,.02)",border:`1px solid ${s.color}20`,borderRadius:14,padding:"22px 20px",transition:"all .2s",position:"relative",overflow:"hidden"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.color}40`;e.currentTarget.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${s.color}20`;e.currentTarget.style.transform="none";}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${s.color},transparent)`}} />
                <div style={{fontFamily:"monospace",fontSize:11,color:s.color,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8}}>{s.area}</div>
                <div style={{fontSize:15,fontWeight:600,color:"#F0EDE8",marginBottom:6}}>{s.tool}</div>
                <p style={{fontSize:13,color:"rgba(240,237,232,.55)",lineHeight:1.7,margin:0}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICACIÓN ─────────────────────────────────────────────────── */}
      <section style={S.section()} id="certificacion">
        <div style={{...S.inner, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start"}}>
          <div>
            <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Certificación blockchain</div>
            <h2 style={S.h2}>Tu logro, <em style={{color:"#C8973A",fontStyle:"italic"}}>inmutable</em> para siempre</h2>
            <p style={S.lead}>Cada certificado es un activo digital verificable por cualquier empresa, en cualquier país, sin intermediarios.</p>
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              {[
                {n:"01",t:"Hash SHA-256 al aprobar",d:"Hash criptográfico único de tu evaluación capstone. Nadie puede alterarlo."},
                {n:"02",t:"Registro en Polygon L2",d:"Smart contract en Polygon. Costo mínimo, verificación pública permanente."},
                {n:"03",t:"Estándar MIT Blockcerts v3",d:"Compatible con LinkedIn, Indeed y sistemas de RRHH a nivel global."},
                {n:"04",t:"Verificación sin intermediarios",d:"URL pública: ivai.lat/verificar/[UUID]. Cualquier empresa escanea el QR."},
              ].map((s,i)=>(
                <div key={i} style={{display:"flex",gap:20,padding:"20px 0",borderBottom:"1px solid rgba(240,237,232,.05)"}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.8rem",color:"rgba(200,151,58,.2)",lineHeight:1,minWidth:40}}>{s.n}</span>
                  <div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#F0EDE8",marginBottom:4}}>{s.t}</div><p style={{fontSize:13,color:"rgba(240,237,232,.55)",lineHeight:1.65,margin:0}}>{s.d}</p></div>
                </div>
              ))}
            </div>
          </div>
          {/* Código JSON del certificado */}
          <div style={{background:"#0C1525",border:"1px solid rgba(240,237,232,.06)",borderRadius:16,padding:"24px",fontFamily:"monospace",fontSize:13,lineHeight:2,position:"sticky",top:100}}>
            <div style={{color:"rgba(240,237,232,.25)"}}>// Certificado verificable · Polygon L2</div>
            <div><span style={{color:"#C792EA"}}>const</span> <span style={{color:"#82AAFF"}}>certificado</span> = {"{"}</div>
            <div>&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>tipo</span>: <span style={{color:"#C3E88D"}}>"CertificadoMejoramiento"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>programa</span>: <span style={{color:"#C3E88D"}}>"[Tu programa]"</span>,</div>
            <div>&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>creditos</span>: <span style={{color:"#F78C6C"}}>84</span>,</div>
            <div>&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>blockchain</span>: {"{"}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>red</span>: <span style={{color:"#C3E88D"}}>"Polygon L2"</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>estandar</span>: <span style={{color:"#C3E88D"}}>"MIT Blockcerts v3"</span>,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>verificable</span>: <span style={{color:"#1DB887"}}>true</span></div>
            <div>&nbsp;&nbsp;{"}"},</div>
            <div>&nbsp;&nbsp;<span style={{color:"#82AAFF"}}>nota</span>: <span style={{color:"#C3E88D"}}>"Mejoramiento Profesional.</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#C3E88D"}}>No confiere título académico."</span></div>
            <div>{"}"}</div>
            <div style={{marginTop:16,padding:"12px",background:"rgba(29,184,135,.06)",borderRadius:8,border:"1px solid rgba(29,184,135,.12)",color:"rgba(240,237,232,.65)",fontSize:12,lineHeight:1.7}}>
              ✓ No almacenamos datos personales en la cadena — solo el hash del certificado. Tu privacidad queda protegida.
            </div>
          </div>
        </div>
      </section>

      {/* ── PREGUNTAS FRECUENTES ───────────────────────────────────────────── */}
      <section style={S.section("#0C1525")}>
        <div style={{...S.inner, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start"}}>
          <div>
            <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Preguntas frecuentes</div>
            <h2 style={S.h2}>Lo que te preguntas <em style={{color:"#C8973A",fontStyle:"italic"}}>antes de entrar</em></h2>
            <p style={{...S.lead,marginBottom:0}}>Respuestas directas. Sin lenguaje de marketing.</p>
          </div>
          <div style={{paddingTop:8}}><FAQ /></div>
        </div>
      </section>

      {/* ── REGISTRO CTA ──────────────────────────────────────────────────── */}
      <section style={{...S.section("linear-gradient(160deg,#0C1A2E,#061018)"), borderTop:"1px solid rgba(240,237,232,.06)"}} id="registro">
        <div style={{...S.inner, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start"}}>
          <div>
            <div style={S.label}><span style={{width:20,height:1,background:"#C8973A",display:"block"}} />Inscripción gratuita</div>
            <h2 style={S.h2}>Comienza hoy.<br/>Tu mentor <em style={{color:"#C8973A",fontStyle:"italic"}}>te espera.</em></h2>
            <p style={{...S.lead,marginBottom:24}}>Diagnóstico gratuito. Sin tarjeta. Alejandra te contacta en minutos.</p>
            {[
              {icon:"🎯",t:"Diagnóstico personalizado gratuito",d:"Alejandra evalúa tu nivel y recomienda tu programa ideal."},
              {icon:"📱",t:"WhatsApp, Telegram o web",d:"Sin app extra. Sin horarios. Desde donde estés, cuando quieras."},
              {icon:"🏅",t:"Certificado blockchain al completar",d:"Verificable globalmente. Inmutable. Estándar MIT Blockcerts."},
              {icon:"♾",t:"Mentor que no te olvida",d:"Tu agente permanece contigo al terminar. De por vida."},
            ].map((p,i)=>(
              <div key={i} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:"1px solid rgba(240,237,232,.04)"}}>
                <div style={{width:38,height:38,borderRadius:10,background:"rgba(200,151,58,.08)",border:"1px solid rgba(200,151,58,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{p.icon}</div>
                <div><div style={{fontWeight:600,fontSize:14,color:"#F0EDE8",marginBottom:2}}>{p.t}</div><div style={{fontSize:12,color:"rgba(240,237,232,.55)"}}>{p.d}</div></div>
              </div>
            ))}
          </div>
          {/* FORMULARIO */}
          <div style={{background:"rgba(240,237,232,.02)",border:"1px solid rgba(240,237,232,.07)",borderRadius:24,padding:"2.5rem"}}>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.35rem",color:"#F0EDE8",marginBottom:24}}>Iniciar diagnóstico gratuito</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
              <div><label style={{display:"block",fontSize:12,fontWeight:500,color:"rgba(240,237,232,.55)",marginBottom:6}}>Nombre *</label>
                <input id="f-nombre" type="text" placeholder="Tu nombre" style={{width:"100%",background:"rgba(240,237,232,.05)",border:"1px solid rgba(240,237,232,.1)",borderRadius:10,padding:"10px 14px",color:"#F0EDE8",fontSize:14}} /></div>
              <div><label style={{display:"block",fontSize:12,fontWeight:500,color:"rgba(240,237,232,.55)",marginBottom:6}}>Apellido</label>
                <input id="f-apellido" type="text" placeholder="Apellido" style={{width:"100%",background:"rgba(240,237,232,.05)",border:"1px solid rgba(240,237,232,.1)",borderRadius:10,padding:"10px 14px",color:"#F0EDE8",fontSize:14}} /></div>
            </div>
            {[["Email","email","f-email","tu@email.com"],["WhatsApp *","tel","f-wa","+503 7000-0000"]].map(([lbl,type,id,ph])=>(
              <div key={id} style={{marginBottom:14}}>
                <label style={{display:"block",fontSize:12,fontWeight:500,color:"rgba(240,237,232,.55)",marginBottom:6}}>{lbl}</label>
                <input id={id} type={type} placeholder={ph} style={{width:"100%",background:"rgba(240,237,232,.05)",border:"1px solid rgba(240,237,232,.1)",borderRadius:10,padding:"10px 14px",color:"#F0EDE8",fontSize:14}} />
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
              {[["País","f-pais",["El Salvador","Costa Rica","Venezuela","Guatemala","México","Colombia","EE.UU.","Otro"]],["Área de interés","f-area",["Ingeniería y Tecnología","AgriTech","Salud","Administración","Derecho","Humanidades","MBA / Posgrado","Orientación personal"]]].map(([lbl,id,opts])=>(
                <div key={id as string}>
                  <label style={{display:"block",fontSize:12,fontWeight:500,color:"rgba(240,237,232,.55)",marginBottom:6}}>{lbl as string}</label>
                  <select id={id as string} style={{width:"100%",background:"#0C1525",border:"1px solid rgba(240,237,232,.1)",borderRadius:10,padding:"10px 14px",color:"#F0EDE8",fontSize:14}}>
                    {(opts as string[]).map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button id="form-btn" style={{width:"100%",padding:"14px",background:"#C8973A",border:"none",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:15,color:"#060A12",marginTop:4}}
              onClick={async()=>{
                const n=(document.getElementById("f-nombre") as HTMLInputElement)?.value?.trim();
                const w=(document.getElementById("f-wa") as HTMLInputElement)?.value?.trim();
                if(!n||!w){alert("Por favor ingresa tu nombre y WhatsApp.");return;}
                const btn=document.getElementById("form-btn") as HTMLButtonElement;
                btn.textContent="Registrando..."; btn.disabled=true;
                try { await fetch("/api/registro",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nombre:n,apellido:(document.getElementById("f-apellido") as HTMLInputElement)?.value,email:(document.getElementById("f-email") as HTMLInputElement)?.value,whatsapp:w,pais:(document.getElementById("f-pais") as HTMLSelectElement)?.value,area:(document.getElementById("f-area") as HTMLSelectElement)?.value})}); } catch {}
                btn.textContent="¡Listo! Abre @iainstituto_bot en Telegram →";
                btn.style.background="#1DB887";
                btn.onclick=()=>window.open("https://t.me/iainstituto_bot","_blank");
              }}>
              Iniciar mi camino →
            </button>
            <p style={{fontFamily:"monospace",fontSize:"0.65rem",color:"rgba(240,237,232,.25)",textAlign:"center",marginTop:12,letterSpacing:".04em"}}>DATOS PROTEGIDOS · GDPR COMPLIANT · SIN SPAM</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{background:"#030608",borderTop:"1px solid rgba(200,151,58,.07)",padding:"3.5rem clamp(1.5rem,4vw,4rem) 2rem"}}>
        <div style={{...S.inner}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"4rem",marginBottom:"3rem"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{...S.navGem,width:36,height:36}}>IV</div>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:"#F0EDE8"}}>Instituto Virtual de IA</span>
              </div>
              <p style={{fontSize:13,color:"rgba(240,237,232,.3)",lineHeight:1.75,maxWidth:280}}>Mejoramiento profesional con los más altos estándares internacionales, bajo los principios de la Doctrina Social de la Iglesia y el pensamiento gandhiano.</p>
              <p style={{fontFamily:"'DM Serif Display',serif",fontStyle:"italic",color:"rgba(200,151,58,.45)",fontSize:13,marginTop:12}}>"Be the change you wish to see in the world." — Gandhi</p>
            </div>
            <div>
              <div style={{fontFamily:"monospace",fontSize:"0.62rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C8973A",marginBottom:14}}>Programas</div>
              {["Ingeniería","AgriTech","Salud","Administración","Humanidades","MBA Tecnológico"].map(l=>(
                <a key={l} href="/programas" style={{display:"block",fontSize:13,color:"rgba(240,237,232,.3)",marginBottom:8,textDecoration:"none"}}>{l}</a>
              ))}
            </div>
            <div>
              <div style={{fontFamily:"monospace",fontSize:"0.62rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C8973A",marginBottom:14}}>Contacto</div>
              <a href="https://t.me/iainstituto_bot" target="_blank" style={{display:"block",fontSize:13,color:"#1DB887",marginBottom:8,textDecoration:"none"}}>@iainstituto_bot</a>
              <a href="#registro" style={{display:"block",fontSize:13,color:"rgba(240,237,232,.3)",marginBottom:8,textDecoration:"none"}}>Formulario de registro</a>
              <div style={{marginTop:16,padding:"12px",background:"rgba(29,184,135,.05)",border:"1px solid rgba(29,184,135,.1)",borderRadius:8}}>
                <p style={{fontSize:11,color:"rgba(240,237,232,.3)",lineHeight:1.6,margin:0}}>Certificados de Mejoramiento Profesional. No conferimos títulos universitarios.</p>
              </div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(240,237,232,.05)",paddingTop:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:"rgba(240,237,232,.25)"}}>© 2026 Instituto Virtual de IA. Todos los derechos reservados.</span>
            <span style={{fontFamily:"monospace",fontSize:11,color:"#1DB887",letterSpacing:".05em"}}>@iainstituto_bot · Telegram</span>
          </div>
        </div>
      </footer>

      {/* CSS global inline */}
      <style>{`
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        input::placeholder{color:rgba(240,237,232,.2)}
        input:focus,select:focus{outline:none;border-color:rgba(200,151,58,.4)!important}
        select option{background:#0C1525}
        @media(max-width:1024px){
          .hero-right-hide{display:none!important}
          .nav-links-hide{display:none!important}
        }
        @media(max-width:768px){
          [style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}
          [style*="grid-template-columns:repeat(3,1fr)"]{grid-template-columns:1fr 1fr!important}
          [style*="grid-template-columns:repeat(4,1fr)"]{grid-template-columns:1fr 1fr!important}
          [style*="grid-template-columns:2fr 1fr 1fr"]{grid-template-columns:1fr!important}
          [style*="grid-template-columns:repeat(6,1fr)"]{grid-template-columns:repeat(3,1fr)!important}
        }
      `}</style>
    </div>
  );
}
