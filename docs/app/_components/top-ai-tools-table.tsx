import type { FC } from 'react'

interface AITool {
    name: string
    url: string
    icon: string
    usage: string
    price: string
    version: string
    description: string
}

const aiTools: AITool[] = [
    // Chat & Text
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: '🤖', usage: 'Chatbot', price: 'Gratis / $20 Plus', version: 'GPT-4o', description: 'El asistente de IA más popular, ideal para redacción, código y análisis general.' },
    { name: 'Claude', url: 'https://claude.ai', icon: '🧠', usage: 'Chatbot', price: 'Gratis / $20 Pro', version: '3.5 Sonnet', description: 'Destaca en razonamiento complejo, escritura natural y grandes volúmenes de texto.' },
    { name: 'Gemini', url: 'https://gemini.google.com', icon: '✨', usage: 'Chatbot', price: 'Gratis / $20 Adv.', version: '1.5 Pro', description: 'Integrado con Google, excelente para multimodalidad y ventanas de contexto enormes.' },
    { name: 'Perplexity', url: 'https://perplexity.ai', icon: '🔍', usage: 'Búsqueda', price: 'Gratis / $20 Pro', version: 'v3', description: 'Motor de respuesta que cita fuentes, perfecto para investigación rápida y precisa.' },
    { name: 'Jasper', url: 'https://jasper.ai', icon: '✍️', usage: 'Marketing', price: 'Desde $39/mes', version: 'N/A', description: 'Plataforma de contenido para equipos de marketing y empresas.' },
    { name: 'Copy.ai', url: 'https://copy.ai', icon: '📝', usage: 'Copywriting', price: 'Gratis / $36 Pro', version: 'N/A', description: 'Automatización de ventas y marketing con flujos de trabajo de IA.' },
    { name: 'Writesonic', url: 'https://writesonic.com', icon: '⚡', usage: 'Contenido', price: 'Gratis / $16/mes', version: 'v5', description: 'Generador de artículos SEO-friendly y contenido de marketing.' },
    { name: 'Character.ai', url: 'https://character.ai', icon: '🎭', usage: 'Personajes', price: 'Gratis / $9.99+', version: 'v1.2', description: 'Chat con personalidades simuladas, ideal para entretenimiento y práctica de idiomas.' },
    { name: 'Poe', url: 'https://poe.com', icon: '📱', usage: 'Agregador', price: 'Gratis / $19.99', version: 'Multi', description: 'Accede a múltiples modelos (GPT, Claude, etc.) desde una sola interfaz.' },
    { name: 'HuggingChat', url: 'https://huggingface.co/chat', icon: '🤗', usage: 'Open Source', price: 'Totalmente Gratis', version: 'Llama 3', description: 'La alternativa abierta y ética para probar los últimos modelos open source.' },

    // Image & Video
    { name: 'Midjourney', url: 'https://midjourney.com', icon: '🎨', usage: 'Imagen', price: 'Desde $10/mes', version: 'v6', description: 'La referencia en calidad artística y fotorealismo para generación de imágenes.' },
    { name: 'DALL-E 3', url: 'https://openai.com/dall-e-3', icon: '🖼️', usage: 'Imagen', price: 'Incluido en Plus', version: 'v3', description: 'Integrado en ChatGPT, excelente para seguir instrucciones precisas en imágenes.' },
    { name: 'Stable Diff.', url: 'https://stability.ai', icon: '🌊', usage: 'Imagen', price: 'Gratis (Local)', version: 'SD3', description: 'El estándar open source, control total si tienes el hardware para ejecutarlo.' },
    { name: 'Runway', url: 'https://runwayml.com', icon: '🎥', usage: 'Video', price: 'Gratis / $12+', version: 'Gen-3 Alpha', description: 'Herramientas profesionales para generación y edición de video con IA.' },
    { name: 'Synthesia', url: 'https://synthesia.io', icon: '🗣️', usage: 'Avatares', price: 'Desde $22/mes', version: 'v3', description: 'Crea videos con avatares parlantes realistas para formación y marketing.' },
    { name: 'HeyGen', url: 'https://heygen.com', icon: '👋', usage: 'Video', price: 'Gratis / $24+', version: 'v2', description: 'Traducción de video y avatares personalizados con sincronización labial perfecta.' },
    { name: 'Leonardo.ai', url: 'https://leonardo.ai', icon: '🦁', usage: 'Arte', price: 'Gratis / $10+', version: 'Phoenix', description: 'Suite completa para assets de juegos y arte conceptual con mucho control.' },
    { name: 'Adobe Firefly', url: 'https://firefly.adobe.com', icon: '🔥', usage: 'Diseño', price: 'Gratis / Créditos', version: 'v3', description: 'Generación de imágenes segura para uso comercial, integrada en Photoshop.' },
    { name: 'Canva Magic', url: 'https://canva.com', icon: '✨', usage: 'Diseño', price: 'Gratis / Pro', version: 'Magic Studio', description: 'Herramientas de diseño accesibles para no diseñadores, todo en uno.' },
    { name: 'Pika', url: 'https://pika.art', icon: '🐇', usage: 'Video', price: 'Gratis / $8+', version: '1.0', description: 'Generación de video y animación divertida y fácil de usar.' },

    // Code & Dev
    { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', icon: '💻', usage: 'Código', price: '$10/mes (Indiv.)', version: 'v2', description: 'El autocompletado de código más usado, integrado directamente en VS Code.' },
    { name: 'Tabnine', url: 'https://tabnine.com', icon: '⌨️', usage: 'Código', price: 'Gratis / $12+', version: 'Pro', description: 'Asistente de código privado y seguro, entrenable con tu propio codebase.' },
    { name: 'Replit Ghost', url: 'https://replit.com', icon: '👻', usage: 'IDE', price: 'Gratis / $10+', version: 'N/A', description: 'IDE online colaborativo con IA integrada para generar y explicar código.' },
    { name: 'Cursor', url: 'https://cursor.sh', icon: '🖱️', usage: 'Editor', price: 'Gratis / $20 Pro', version: 'v0.35', description: 'Fork de VS Code con IA nativa, capaz de editar múltiples archivos a la vez.' },
    { name: 'Codeium', url: 'https://codeium.com', icon: '📦', usage: 'Código', price: 'Gratis / $10+', version: 'v1', description: 'Alternativa rápida y gratuita a Copilot para autocompletado de código.' },

    // Productivity & Office
    { name: 'Notion AI', url: 'https://notion.so', icon: '📓', usage: 'Notas', price: '$10/mes/user', version: 'v2', description: 'Escribe, resume y organiza tus notas directamente en tu espacio de trabajo.' },
    { name: 'Microsoft 365', url: 'https://microsoft.com', icon: '📎', usage: 'Oficina', price: '$30/mes (Ent.)', version: 'Copilot', description: 'Tu asistente en Word, Excel y PowerPoint para productividad empresarial.' },
    { name: 'Otter.ai', url: 'https://otter.ai', icon: '🦦', usage: 'Transcr.', price: 'Gratis / $10+', version: 'v4', description: 'Transcribe reuniones en tiempo real y genera resúmenes automáticos.' },
    { name: 'Fireflies.ai', url: 'https://fireflies.ai', icon: '🪰', usage: 'Reuniones', price: 'Gratis / $10+', version: 'v2', description: 'Graba y analiza tus llamadas para extraer insights y tareas.' },
    { name: 'Mem.ai', url: 'https://mem.ai', icon: '🧠', usage: 'Notas', price: 'Gratis / $10+', version: 'X', description: 'Notas auto-organizadas que conectan tus ideas automáticamente.' },
    { name: 'Taskade', url: 'https://taskade.com', icon: '✅', usage: 'Tareas', price: 'Gratis / $4+', version: 'v5', description: 'Gestión de proyectos y tareas impulsada por agentes de IA.' },
    { name: 'Gamma', url: 'https://gamma.app', icon: '📊', usage: 'Slides', price: 'Gratis / $8+', version: 'v2', description: 'Crea presentaciones, documentos y webs bonitas en segundos.' },
    { name: 'Tome', url: 'https://tome.app', icon: '📖', usage: 'Slides', price: 'Gratis / Pro', version: 'v2', description: 'Narrativa visual y presentaciones generadas por IA.' },
    { name: 'Beautiful.ai', url: 'https://beautiful.ai', icon: '💎', usage: 'Slides', price: '$12/mes', version: 'v1', description: 'Diseño de diapositivas inteligente que se ajusta mientras escribes.' },
    { name: 'Grammarly', url: 'https://grammarly.com', icon: '✅', usage: 'Escritura', price: 'Gratis / $12+', version: 'GO', description: 'Corrección gramatical y mejora de estilo para escribir con confianza.' },

    // Audio & Voice
    { name: 'ElevenLabs', url: 'https://elevenlabs.io', icon: '🔊', usage: 'Voz', price: 'Gratis / $5+', version: 'v2', description: 'La mejor síntesis de voz (TTS) y clonación de voz del mercado.' },
    { name: 'Murf.ai', url: 'https://murf.ai', icon: '🎙️', usage: 'Voz', price: 'Gratis / $19+', version: 'v2', description: 'Estudio de voz en off versátil para creadores de contenido.' },
    { name: 'Suno', url: 'https://suno.ai', icon: '🎵', usage: 'Música', price: 'Gratis / $8+', version: 'v3.5', description: 'Crea canciones completas con letra y voz a partir de un simple prompt.' },
    { name: 'Udio', url: 'https://udio.com', icon: '🎶', usage: 'Música', price: 'Gratis / $10+', version: 'v1', description: 'Generación musical de alta fidelidad con gran control creativo.' },
    { name: 'Descript', url: 'https://descript.com', icon: '🎞️', usage: 'Edición', price: 'Gratis / $12+', version: 'v8', description: 'Edita audio y video editando el texto transcrito. Mágico.' },

    // Education & Research
    { name: 'Duolingo Max', url: 'https://duolingo.com', icon: '🦉', usage: 'Idiomas', price: '$14/mes', version: 'GPT-4', description: 'Practica conversaciones y recibe explicaciones gramaticales personalizadas.' },
    { name: 'Khanmigo', url: 'https://khanacademy.org', icon: '🎓', usage: 'Tutor', price: 'Donación ($4+)', version: 'GPT-4', description: 'Tutor socrático que guía a los estudiantes sin darles las respuestas.' },
    { name: 'Consensus', url: 'https://consensus.app', icon: '🔬', usage: 'Ciencia', price: 'Gratis / $8+', version: 'v2', description: 'Buscador de papers científicos que resume hallazgos clave.' },
    { name: 'Elicit', url: 'https://elicit.com', icon: '🔎', usage: 'Investig.', price: 'Gratis / $10+', version: 'v2', description: 'Automatiza la revisión de literatura y extracción de datos de papers.' },
    { name: 'Scispace', url: 'https://typeset.io', icon: '🚀', usage: 'Papers', price: 'Gratis / $12+', version: 'Copilot', description: 'Explica papers complejos y responde preguntas sobre su contenido.' },

    // Legal & Finance
    { name: 'Harvey', url: 'https://harvey.ai', icon: '⚖️', usage: 'Legal', price: 'Contacto', version: 'N/A', description: 'IA para firmas de abogados de élite, especializada en derecho.' },
    { name: 'Casetext', url: 'https://casetext.com', icon: '📜', usage: 'Legal', price: 'Pago (CoCounsel)', version: 'GPT-4', description: 'Asistente legal fiable para revisión de documentos y deposiciones.' },
    { name: 'BloombergGPT', url: 'https://bloomberg.com', icon: '📈', usage: 'Finanzas', price: 'Terminal ($$$)', version: 'v1', description: 'Modelo especializado en datos financieros y noticias de mercado.' },
    { name: 'Cleo', url: 'https://meetcleo.com', icon: '💰', usage: 'Finanzas', price: 'Gratis / $5.99', version: 'v1', description: 'Asistente financiero con personalidad que te ayuda a ahorrar.' },
    { name: 'Rocket Money', url: 'https://rocketmoney.com', icon: '🚀', usage: 'Finanzas', price: 'Gratis / Pago', version: 'N/A', description: 'Gestiona suscripciones y negocia facturas automáticamente.' }
]

export const TopAIToolsTable: FC = () => {
    const midPoint = Math.ceil(aiTools.length / 2)
    const col1 = aiTools.slice(0, midPoint)
    const col2 = aiTools.slice(midPoint)
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })

    const ToolRow = ({ tool, index }: { tool: AITool, index: number }) => (
        <div className={`group relative flex items-center gap-4 p-3 border-b border-gray-100/50 dark:border-gray-800/50 hover:bg-black/[.02] dark:hover:bg-white/[.02] transition-colors`}>
            <span className="text-xl flex-shrink-0 w-8 text-center">{tool.icon}</span>
            <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex-grow truncate"
            >
                {tool.name}
            </a>
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-20 truncate text-center bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 mx-2">{tool.version}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 w-24 truncate text-right">{tool.usage}</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-32 text-right">{tool.price}</span>

            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                <p className="font-semibold mb-1">{tool.name}</p>
                <p className="leading-relaxed opacity-90">{tool.description}</p>
            </div>
        </div>
    )

    return (
        <div className="w-full h-full flex flex-col bg-transparent">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Nuestro Top 50 Herramientas de IA
                </h3>
            </div>

            <div className="flex-grow overflow-y-auto px-2 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    <div className="flex flex-col">
                        {col1.map((tool, i) => <ToolRow key={i} tool={tool} index={i} />)}
                    </div>
                    <div className="flex flex-col">
                        {col2.map((tool, i) => <ToolRow key={i} tool={tool} index={i} />)}
                    </div>
                </div>
            </div>

            <div className="p-4 text-center text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-2">
                Generado el {today}
            </div>
        </div>
    )
}
