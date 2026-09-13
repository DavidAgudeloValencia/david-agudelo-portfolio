const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const outputPath = path.join(__dirname, '..', 'output', 'servicios-bot-info.pdf');

if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

doc.pipe(fs.createWriteStream(outputPath));

const COLORS = {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#e94560',
  text: '#333333',
  lightText: '#666666',
  white: '#ffffff',
  lightBg: '#f5f5f5',
};

function addTitle(text, y = null) {
  doc.fontSize(24).font('Helvetica-Bold').fillColor(COLORS.primary).text(text, { align: 'center' });
  doc.moveDown(0.5);
  doc.strokeColor(COLORS.accent).lineWidth(2).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(1);
}

function addSectionTitle(text) {
  doc.fontSize(16).font('Helvetica-Bold').fillColor(COLORS.secondary).text(text);
  doc.moveDown(0.3);
  doc.strokeColor(COLORS.accent).lineWidth(1).moveTo(50, doc.y).lineTo(200, doc.y).stroke();
  doc.moveDown(0.5);
}

function addSubSection(text) {
  doc.fontSize(12).font('Helvetica-Bold').fillColor(COLORS.text).text(text);
  doc.moveDown(0.2);
}

function addBody(text) {
  doc.fontSize(10).font('Helvetica').fillColor(COLORS.text).text(text, { align: 'justify' });
  doc.moveDown(0.3);
}

function addBullet(text, indent = 70) {
  const x = doc.x;
  doc.fontSize(10).font('Helvetica').fillColor(COLORS.text);
  doc.text('•', indent - 15, doc.y);
  doc.text(text, indent, doc.y, { width: 500 - indent, continued: false });
  doc.moveDown(0.15);
}

function addBulletList(items, indent = 70) {
  items.forEach(item => addBullet(item, indent));
  doc.moveDown(0.2);
}

function addKeyValue(key, value) {
  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLORS.text).text(key + ': ', { continued: true });
  doc.font('Helvetica').fillColor(COLORS.text).text(value);
  doc.moveDown(0.15);
}

function checkPageBreak(neededSpace = 100) {
  if (doc.y > 700 - neededSpace) {
    doc.addPage();
  }
}

doc.fontSize(10).font('Helvetica').fillColor(COLORS.lightText);
doc.text('Documento generado para entrenamiento de bot de atención al cliente', { align: 'right' });
doc.text('David Agudelo Valencia · Automatización con IA para PYMES', { align: 'right' });
doc.moveDown(1);

addTitle('INFORMACIÓN COMPLETA DE SERVICIOS, PRECIOS Y PROCESOS');
addTitle('David Agudelo · Automatización con IA para PYMES', doc.y);
doc.fontSize(12).font('Helvetica').fillColor(COLORS.lightText).text('Medellín, Colombia · WhatsApp: +57 305 258 0913 · Email: david.agudelo.valencia@gmail.com', { align: 'center' });
doc.moveDown(1.5);

addSectionTitle('1. RESUMEN EJECUTIVO');
addBody('David Agudelo Valencia es un desarrollador full stack con 4+ años de experiencia (PHP/Laravel, React, SQL) especializado en automatización con IA para pequeñas y medianas empresas (PYMES) en Medellín, Colombia.');
addBody('Su metodología: Diagnóstico gratis de 1 proceso manual → Propuesta con resultado medible (horas/mes ahorradas) → Entrega en 1–2 semanas → Retainer opcional de mejora continua.');
addBody('Servicios principales: Bots de WhatsApp con IA (24/7), flujos n8n de integración, agentes con información propia del negocio, y tableros de reportes automáticos.');
addBody('Persona natural con matrícula mercantil y Régimen Simple. Facturación electrónica incluida en todos los proyectos. Contrato por chat válido legalmente.');

addSectionTitle('2. SECTORES ATENDIDOS');
addBody('Experiencia comprobada en los siguientes sectores:');
addBulletList([
  'Clínicas y consultorios',
  'Restaurantes y cafeterías',
  'Ferreterías y almacenes',
  'Talleres y constructoras',
  'Gimnasios y spas',
  'Droguerías y farmacias'
]);

addSectionTitle('3. SERVICIOS DETALLADOS');
addBody('Cuatro servicios principales que se pueden contratar individualmente o combinados:');

checkPageBreak();
addSubSection('3.1 Bot de WhatsApp con IA (Automatización)');
addBody('Responde a clientes 24/7 sin intervención humana. Capacidades:');
addBulletList([
  'Cotización automática basada en catálogo/precios del negocio',
  'Agendamiento de citas y llamadas de diagnóstico',
  'Cobro por link de pago (Wompi, MercadoPago, etc.)',
  'Seguimiento automático de leads y recordatorios',
  'Respuestas sobre horarios, ubicación, catálogo y FAQs',
  'Escalado a humano cuando la IA no puede resolver',
  'Integración con CRM, Google Sheets, Notion, Airtable',
  'Respuesta en menos de 2 segundos',
  'Disponible 24/7/365 sin que el dueño toque el celular'
], 70);

checkPageBreak();
addSubSection('3.2 Flujos n8n (Integración)');
addBody('Automatización de movimiento de datos entre sistemas. Conecta:');
addBulletList([
  'Formularios web (Typeform, Google Forms, Webflow, WordPress)',
  'Hojas de cálculo (Google Sheets, Excel Online)',
  'CRM (HubSpot, Pipedrive, ActiveCampaign, Kommo)',
  'Correo electrónico (Gmail, Outlook, SendGrid)',
  'WhatsApp (Cloud API, Twilio)',
  'Bases de datos (PostgreSQL, MySQL, Supabase)',
  'APIs REST y GraphQL personalizadas',
  'Webhooks para notificaciones en tiempo real'
], 70);
addBody('Casos de uso: Lead capture → CRM → WhatsApp → Sheets → Email de confirmación, todo automático.');

checkPageBreak();
addSubSection('3.3 Agentes con tu Información (IA)');
addBody('Agentes de IA entrenados exclusivamente con la información del negocio (RAG - Retrieval Augmented Generation):');
addBulletList([
  'Catálogo de productos/servicios con precios actualizados',
  'Horarios de atención, sucursales, políticas de devolución',
  'Preguntas frecuentes específicas del negocio',
  'Documentos internos (manuales, guías, procedimientos)',
  'Base de conocimiento en PDF, Word, web, Notion, Sheets',
  'Respuestas precisas, no genéricas ni alucinadas',
  'Actualización sencilla: subes documento y el agente aprende',
  'Soporte multi-idioma (español/inglés principalmente)'
], 70);

checkPageBreak();
addSubSection('3.4 Tablero de Reportes (Datos)');
addBody('Dashboards automáticos que se actualizan solos. Métricas típicas:');
addBulletList([
  'Ventas diarias/semanales/mensuales con comparativas',
  'Inventario en tiempo real (stock, alertas de bajo stock)',
  'Clientes nuevos, recurrentes, tasa de conversión',
  'Embudo de ventas: leads → cotizaciones → cerrados',
  'Ticket promedio, LTV, CAC por canal',
  'Productos/servicios más y menos vendidos',
  'Exportable a PDF/Excel/Email programado',
  'Acceso web privado con contraseña o enlace mágico'
], 70);

addSectionTitle('4. PROCESO DE TRABAJO (4 PASOS)');
addBody('Metodología estandarizada para cada proyecto:');

checkPageBreak();
addSubSection('Paso 01 — Diagnóstico Gratis (15 min)');
addBulletList([
  'Llamada o videollamada de 15 minutos',
  'Identificación del proceso manual exacto que consume tiempo',
  'Análisis de volumen actual (mensajes/día, cotizaciones/semana, etc.)',
  'Estimación preliminar de horas/mes a ahorrar',
  'Sin compromiso ni costo alguno'
], 70);

addSubSection('Paso 02 — Propuesta con Resultado');
addBulletList([
  'Documento escrito: qué se automatiza, cómo, con qué herramientas',
  'Cálculo de horas/mes ahorradas (métrica concreta)',
  'Cronograma de entrega (1–2 semanas típicas)',
  'Inversión total desglosada (proyecto + retainer opcional)',
  'Condiciones: 50% anticipo, 50% a la entrega'
], 70);

addSubSection('Paso 03 — Entrega en 1–2 Semanas');
addBulletList([
  'Montaje y configuración en entorno real',
  'Pruebas con casos reales del negocio',
  'Puesta en vivo (go-live) supervisada',
  'Guía simple de uso (video + documento 1-página)',
  'Capacitación breve al equipo (15-30 min)'
], 70);

addSubSection('Paso 04 — Retainer Opcional (Mejora Continua)');
addBulletList([
  'Mantenimiento: actualizaciones de API, correcciones, ajustes',
  'Mejoras: nuevas respuestas, flujos, integraciones adicionales',
  'Soporte prioritario (respuesta < 4 hrs hábiles)',
  'Reunión mensual de 15 min para revisar métricas y priorizar',
  'Cancela cuando quieras, sin penalización'
], 70);

addSectionTitle('5. PRECIOS Y PLANES (VALORES EN COP)');
addBody('Todos los valores en Pesos Colombianos (COP). Cada proyecto inicia con 50% de anticipo. Factura electrónica incluida.');

checkPageBreak();
addSubSection('5.1 Diagnóstico Gratis');
addKeyValue('Precio', '$0 COP');
addKeyValue('Nota', 'Proceso sin costo');
addBody('Incluye: Revisión de 1 proceso manual + Propuesta con resultado + Sin compromiso');
addKeyValue('CTA WhatsApp', 'Hola David, quiero el diagnóstico gratis de automatización.');

checkPageBreak();
addSubSection('5.2 Automatización con IA (Plan Estrella)');
addKeyValue('Precio', '$2.000.000 – $4.000.000 COP (proyecto único)');
addKeyValue('Modalidad', 'Pago 50% anticipo / 50% a la entrega');
addKeyValue('Entrega', '1–2 semanas');
addBody('Incluye:');
addBulletList([
  'Bot de WhatsApp con IA O flujo n8n completo',
  'Puesta en vivo y guía simple de uso (video + doc)',
  'Entrega en 1–2 semanas',
  'Retainer mensual opcional (desde $500K/mes)'
], 70);
addKeyValue('CTA WhatsApp', 'Hola David, me interesa la automatización con IA.');

checkPageBreak();
addSubSection('5.3 Retainer Mensual (Soporte y Mejoras)');
addKeyValue('Precio', '$500.000 – $1.500.000 COP / mes');
addKeyValue('Inicio', 'Desde el mes 1 (opcional tras entrega del proyecto)');
addBody('Incluye:');
addBulletList([
  'Mantenimiento y correcciones continuas',
  'Nuevas respuestas y flujos para el bot',
  'Integración adicional (CRM, Sheets, Email, etc.)',
  'Soporte prioritario (respuesta < 4 hrs hábiles)',
  'Reunión mensual de 15 min: métricas + roadmap'
], 70);
addKeyValue('CTA WhatsApp', 'Hola David, quiero saber más del retainer mensual.');

checkPageBreak();
addSubSection('5.4 Desarrollo a la Medida (Sistemas Completos)');
addKeyValue('Precio', '$4.000.000 – $10.000.000 COP');
addKeyValue('Modalidad', 'Pago por hitos: 50% / 30% / 20%');
addBody('Incluye:');
addBulletList([
  'Cotizadores web, sistemas de inventario, facturación',
  'Aplicación web completa o panel administrativo',
  'Base de datos diseñada a la medida',
  'Autenticación, roles, permisos, auditoría',
  'Deploy en la nube (Vercel, Railway, AWS, DigitalOcean)',
  'Documentación técnica y de usuario'
], 70);
addKeyValue('CTA WhatsApp', 'Hola David, me interesa la automatización con IA.');

checkPageBreak();
addSubSection('5.5 Oferta de Lanzamiento (Limitada)');
addKeyValue('Precio', '$1.900.000 COP (proyecto) + $700.000 COP/mes (retainer)');
addKeyValue('Condición', 'Limitada a 2 clientes en los primeros meses');
addKeyValue('A cambio', 'Testimonio escrito + video caso de éxito');
addBody('Incluye: Bot de WhatsApp con IA funcionando en 10 días + retainer incluido el primer mes.');
addKeyValue('CTA WhatsApp', 'Hola David, me interesa la oferta de lanzamiento (bot en 10 días).');

addSectionTitle('6. COMPARATIVA RÁPIDA DE PLANES');

const tableData = [
  ['Concepto', 'Diagnóstico', 'Automatización IA', 'Retainer Mensual', 'Desarrollo a Medida'],
  ['Precio', '$0', '$2–4 M', '$500K–1.5M/mes', '$4–10 M'],
  ['Tipo', 'Gratis / 15 min', 'Proyecto único', 'Suscripción mensual', 'Proyecto por hitos'],
  ['Entrega', 'Inmediata', '1–2 semanas', 'Continua', '4–8 semanas'],
  ['Pago', 'N/A', '50/50', 'Mensual', '50/30/20'],
  ['Incluye Bot WhatsApp', 'No', 'Sí', 'Sí (mantenimiento)', 'Sí (si aplica)'],
  ['Incluye n8n', 'No', 'Sí (opcional)', 'Sí (nuevos flujos)', 'Sí'],
  ['Soporte', 'No', '30 días post-entrega', 'Prioritario', '3 meses'],
  ['Factura', 'No', 'Sí', 'Sí', 'Sí'],
];

const colWidths = [110, 85, 95, 95, 105];
const startX = 50;
let y = doc.y + 10;

doc.fontSize(8).font('Helvetica-Bold').fillColor(COLORS.white);
tableData[0].forEach((cell, i) => {
  doc.rect(startX + colWidths.slice(0, i).reduce((a,b)=>a+b,0), y, colWidths[i], 20).fill(COLORS.primary);
  doc.fillColor(COLORS.white).text(cell, startX + colWidths.slice(0, i).reduce((a,b)=>a+b,0) + 3, y + 6, { width: colWidths[i] - 6, align: 'center' });
});
y += 20;

tableData.slice(1).forEach((row, rowIdx) => {
  doc.fontSize(8).font('Helvetica').fillColor(COLORS.text);
  row.forEach((cell, i) => {
    const bgColor = rowIdx % 2 === 0 ? COLORS.lightBg : COLORS.white;
    doc.rect(startX + colWidths.slice(0, i).reduce((a,b)=>a+b,0), y, colWidths[i], 18).fill(bgColor);
    doc.fillColor(COLORS.text).text(cell, startX + colWidths.slice(0, i).reduce((a,b)=>a+b,0) + 3, y + 4, { width: colWidths[i] - 6, align: 'center' });
  });
  y += 18;
});
doc.y = y + 15;

addSectionTitle('7. PREGUNTAS FRECUENTES (PARA EL BOT)');
addBody('Respuestas estándar que el bot debe conocer para atender consultas comunes:');

checkPageBreak();
const faqs = [
  { q: '¿Cuánto cuesta un bot de WhatsApp?', a: 'Desde $1.9M en oferta de lanzamiento (limitada 2 clientes) o $2–4M precio regular. Incluye desarrollo, puesta en vivo y guía. Retainer opcional desde $500K/mes.' },
  { q: '¿El diagnóstico gratis tiene compromiso?', a: 'No. Es una llamada de 15 min para identificar tu proceso manual y darte una propuesta con horas estimadas de ahorro. Sin costo ni obligación.' },
  { q: '¿En cuánto tiempo entregan?', a: 'Proyectos estándar: 1–2 semanas. Oferta de lanzamiento: 10 días. Desarrollo a la medida: 4–8 semanas según alcance.' },
  { q: '¿Qué incluye el retainer mensual?', a: 'Mantenimiento, nuevas respuestas/flujos, integraciones adicionales, soporte prioritario (<4 hrs) y reunión mensual 15 min. Cancela cuando quieras.' },
  { q: '¿Facturan electrónicamente?', a: 'Sí. Persona natural con matrícula mercantil, Régimen Simple. Factura electrónica válida incluida en todos los proyectos. Contrato por chat.' },
  { q: '¿Qué tecnologías usan?', a: 'WhatsApp Cloud API (Meta), n8n, OpenAI/Anthropic (IA), React, Laravel, PostgreSQL, Google Sheets, CRM (HubSpot, Kommo, Pipedrive).' },
  { q: '¿El bot responde con mi información o genérica?', a: 'Con TU información. Entrenamos agentes (RAG) con tu catálogo, precios, horarios, FAQs y documentos. No respuestas genéricas.' },
  { q: '¿Puedo ver una demo antes de contratar?', a: 'Sí. Tenemos demo interactiva en la web y simulación en WhatsApp. El bot responde en <2 segundos 24/7.' },
  { q: '¿Atenden sectores distintos a los listados?', a: 'Sí. La metodología aplica a cualquier PYME con procesos manuales repetitivos. Los listados son donde hay casos de éxito.' },
  { q: '¿Cómo es el pago?', a: 'Proyectos: 50% anticipo, 50% a la entrega. Retainer: mensual por adelantado. Desarrollo a medida: hitos 50/30/20. Transferencia o link de pago.' },
  { q: '¿Hay garantía?', a: '30 días de soporte post-entrega incluido en proyectos. Retainer incluye soporte continuo. Si no cumple lo prometido, ajustamos sin costo extra.' },
  { q: '¿El bot cobra por link de pago?', a: 'Sí. Integración con Wompi, MercadoPago, PayU, Stripe. Genera link, envía al cliente y confirma pago automáticamente.' },
  { q: '¿Agenda citas en mi calendario?', a: 'Sí. Google Calendar, Calendly, Outlook. El bot muestra horarios libres, agenda y envía recordatorios.' },
  { q: '¿Conectan con mi CRM actual?', a: 'Sí. HubSpot, Pipedrive, ActiveCampaign, Kommo, Salesforce, y cualquier CRM con API/webhooks via n8n.' },
  { q: '¿Qué pasa si la IA no entiende al cliente?', a: 'Escala a humano automáticamente. Notifica por WhatsApp/email al equipo con el contexto de la conversación.' },
  { q: '¿Puedo actualizar la info del bot yo mismo?', a: 'Sí. Te dejo guía simple. Con retainer, nosotros lo hacemos por ti. Sin retainer, actualizas subiendo documentos a la base de conocimiento.' },
  { q: '¿Tienen casos de éxito?', a: 'Sí. Clínicas, restaurantes, ferreterías, talleres, gimnasios, droguerías. Testimonios y video casos bajo NDA o públicos según cliente.' },
  { q: '¿Desde dónde atienden?', a: 'Medellín, Colombia. Atendemos remoto a toda Colombia y LATAM. Reuniones por Meet/Zoom/WhatsApp.' },
  { q: '¿Cómo contacto para empezar?', a: 'WhatsApp: +57 305 258 0913 (bot responde 24/7). Email: david.agudelo.valencia@gmail.com. Web: davidagudelo.com' },
];

faqs.forEach((faq, idx) => {
  checkPageBreak(60);
  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLORS.secondary).text(`${idx + 1}. ${faq.q}`);
  doc.moveDown(0.15);
  doc.fontSize(10).font('Helvetica').fillColor(COLORS.text).text(faq.a, { align: 'justify' });
  doc.moveDown(0.4);
});

addSectionTitle('8. INFORMACIÓN DE CONTACTO Y LEGAL');
addKeyValue('Nombre completo', 'David Agudelo Valencia');
addKeyValue('Rol', 'Automatización con IA para PYMES');
addKeyValue('Ciudad', 'Medellín, Colombia');
addKeyValue('WhatsApp', '+57 305 258 0913 (bot 24/7)');
addKeyValue('Email', 'david.agudelo.valencia@gmail.com');
addKeyValue('GitHub', 'github.com/DavidAgudeloValencia');
addKeyValue('LinkedIn', 'linkedin.com/in/david-agudelo-valencia');
addKeyValue('Dominio', 'davidagudelo.com');
addKeyValue('Persona jurídica', 'Persona natural con matrícula mercantil');
addKeyValue('Régimen tributario', 'Régimen Simple');
addKeyValue('Facturación', 'Electrónica (DIAN) - 100% legal');

addSectionTitle('9. MENSAJES PREDEFINIDOS WHATSAPP (PARA BOT)');
addBody('Mensajes que el bot puede enviar o sugerir al usuario:');
const waMessages = [
  'Diagnóstico gratis: "Hola David, quiero el diagnóstico gratis de automatización."',
  'Cotización IA: "Hola David, me interesa la automatización con IA."',
  'Retainer: "Hola David, quiero saber más del retainer mensual."',
  'Oferta lanzamiento: "Hola David, me interesa la oferta de lanzamiento (bot en 10 días)."',
  'Contacto general: "Hola David, vi tu web y quiero automatizar mi negocio."',
];
waMessages.forEach(msg => addBullet(msg, 70));

addSectionTitle('10. DEMO DEL BOT (SIMULACIÓN)');
addBody('Flujo de conversación típico que el bot replica:');
const demoChat = [
  'Usuario (11:47 PM): "Hola, ¿me cotizan un bot para mi negocio? 🏪"',
  'Bot: "¡Hola! 👋 Soy el bot de David Agudelo y respondo a cualquier hora."',
  'Bot: "Te dejo las opciones: 1️⃣ Bot de WhatsApp desde $1.9M · 2️⃣ Diagnóstico gratis $0 · 3️⃣ Retainer desde $500K/mes"',
  'Usuario: "El diagnóstico gratis 👀"',
  'Bot: "Perfecto ✅ ¿A qué se dedica tu negocio?"',
  'Usuario: "Tengo una tienda de ropa 🛍️"',
  'Bot: "Listo ✔ Te agendé el diagnóstico para mañana 10 a. m. Un humano te contacta para confirmar."',
];
demoChat.forEach(line => {
  doc.fontSize(9).font(line.startsWith('Bot') ? 'Helvetica-Bold' : 'Helvetica').fillColor(line.startsWith('Bot') ? COLORS.accent : COLORS.text).text(line, { indent: 20 });
  doc.moveDown(0.1);
});
doc.moveDown(0.5);

addSectionTitle('11. TECNOLOGÍAS Y HERRAMIENTAS');
addBulletList([
  'WhatsApp Cloud API (Meta) — Canal oficial Business',
  'n8n — Orquestación de flujos e integraciones',
  'OpenAI / Anthropic — Modelos de lenguaje (GPT-4, Claude)',
  'RAG (Retrieval Augmented Generation) — Agentes con info propia',
  'React + TypeScript — Frontend y dashboards',
  'Laravel / Node.js — Backend y APIs',
  'PostgreSQL / Supabase — Base de datos',
  'Google Sheets / Airtable / Notion — Datos ligeros',
  'Vercel / Railway / Docker — Deploy y hosting',
  'GitHub Actions — CI/CD',
], 70);

addSectionTitle('12. POLÍTICA DE PRIVACIDAD (RESUMEN PARA BOT)');
addBody('Cumplimiento Ley 1581/2012 (Colombia) y Meta Platforms. Puntos clave para el bot:');
addBulletList([
  'Responsable: David Agudelo Valencia, Medellín, Colombia',
  'Datos: Teléfono WhatsApp, nombre, mensajes, metadatos de entrega',
  'Finalidad: Atención, cotización, agendamiento, seguimiento comercial',
  'No venta ni alquiler de datos a terceros',
  'Derechos: Conocer, actualizar, rectificar, suprimir, revocar, acceder gratis',
  'Eliminación: Email "Eliminación de Datos" o WhatsApp "BORRAR MIS DATOS" (48 hrs)',
  'Seguridad: Cifrado SSL/TLS, canales oficiales Meta, proveedores certificados',
], 70);

doc.moveDown(1);
doc.strokeColor(COLORS.accent).lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').fillColor(COLORS.lightText).text('Fin del documento — Información para entrenamiento de bot de atención al cliente', { align: 'center' });
doc.fontSize(9).font('Helvetica').fillColor(COLORS.lightText).text('David Agudelo Valencia · Medellín, Colombia · Septiembre 2026', { align: 'center' });

doc.end();

console.log(`PDF generado en: ${outputPath}`);