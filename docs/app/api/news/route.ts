import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidar cada hora

interface NewsArticle {
  title: string
  summary: string
  category: string
  url: string
  publishedAt: string
  source: string
}

// Categorías predefinidas para IA
const AI_CATEGORIES = {
  REGULATION: 'Regulación',
  ETHICS: 'Ética',
  TECHNOLOGY: 'Tecnología',
  BUSINESS: 'Negocios',
  RESEARCH: 'Investigación',
  SOCIETY: 'Sociedad',
  LABOR: 'Laboral',
  HEALTH: 'Salud',
  EDUCATION: 'Educación'
}

// Función para categorizar noticias basándose en palabras clave con priorización
function categorizeNews(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  
  // Array de categorías con sus patrones, ordenadas por especificidad
  const categories = [
    {
      name: AI_CATEGORIES.LABOR,
      pattern: /\b(empleo|trabajo|trabajador|salario|salarial|laboral|despido|contrato|sindic|empleado|desempleo|paro|rrhh|recursos humanos|puesto|vacante|oferta de trabajo)\b/i
    },
    {
      name: AI_CATEGORIES.REGULATION,
      pattern: /\b(regulación|regulacion|ley|leyes|normativa|legislación|legislacion|política|politica|parlamento|gobierno|directiva|reglamento|compliance|legal|jurídico|juridico)\b/i
    },
    {
      name: AI_CATEGORIES.ETHICS,
      pattern: /\b(ética|etica|responsable|sesgo|sesgos|bias|privacidad|derechos|transparencia|discriminación|discriminacion|fairness|accountability|confianza|seguridad)\b/i
    },
    {
      name: AI_CATEGORIES.HEALTH,
      pattern: /\b(salud|médico|medico|medicina|hospital|paciente|diagnóstico|diagnostico|tratamiento|enfermedad|sanitario|clínico|clinico|healthcare)\b/i
    },
    {
      name: AI_CATEGORIES.EDUCATION,
      pattern: /\b(educación|educacion|escuela|universidad|estudiante|aprendizaje|formación|formacion|academia|académico|academico|curso|enseñanza|ensenanza)\b/i
    },
    {
      name: AI_CATEGORIES.RESEARCH,
      pattern: /\b(investigación|investigacion|estudio|científico|cientifico|paper|research|desarrollo|descubrimiento|avance|breakthrough|experimento|laboratorio)\b/i
    },
    {
      name: AI_CATEGORIES.BUSINESS,
      pattern: /\b(empresa|negocio|mercado|inversión|inversion|startup|económico|economico|industria|corporación|corporacion|comercial|ventas|beneficio|cotiza|bolsa|fintech)\b/i
    },
    {
      name: AI_CATEGORIES.SOCIETY,
      pattern: /\b(sociedad|social|comunidad|ciudadano|impacto social|medioambiente|medio ambiente|climate|sostenible|inclusión|inclusion|diversidad)\b/i
    },
    {
      name: AI_CATEGORIES.TECHNOLOGY,
      pattern: /\b(tecnología|tecnologia|tech|software|hardware|algorithm|modelo|neural|deep learning|machine learning|chatgpt|gpt|llm|api|cloud|data)\b/i
    }
  ]
  
  // Buscar la primera categoría que coincida
  for (const category of categories) {
    if (category.pattern.test(text)) {
      return category.name
    }
  }
  
  // Si no coincide con ninguna, por defecto Tecnología
  return AI_CATEGORIES.TECHNOLOGY
}

// Función para resumir texto (simplificada)
function generateSummary(description: string): string {
  if (!description) return 'Resumen no disponible'
  
  // Limitar a las primeras 2-3 oraciones
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const summary = sentences.slice(0, 2).join('. ').trim()
  
  return summary.length > 150 
    ? summary.substring(0, 147) + '...' 
    : summary + '.'
}

export async function GET(request: Request) {
  try {
    // Usar NewsAPI (necesitarás registrarte en https://newsapi.org para obtener una API key)
    // Alternativa gratuita: usar RSS feeds o APIs públicas
    
    const NEWS_API_KEY = process.env.NEWS_API_KEY || ''
    
    console.log('🔑 API Key detectada:', NEWS_API_KEY ? `Sí (${NEWS_API_KEY.substring(0, 8)}...)` : 'No')
    
    // Estrategia mixta: usar top-headlines que funciona mejor con plan gratuito
    // y filtrar por términos de IA
    const searches = [
      {
        type: 'top-headlines',
        params: 'category=technology&language=en',
        label: 'Tech headlines (EN)'
      },
      {
        type: 'everything',
        params: 'q=artificial+intelligence&language=en&sortBy=publishedAt',
        label: 'AI news (EN)'
      },
      {
        type: 'everything', 
        params: 'q=inteligencia+artificial&language=es&sortBy=publishedAt',
        label: 'AI news (ES)'
      }
    ]
    
    const allArticles: NewsArticle[] = []
    
    // Si tienes NEWS_API_KEY configurada
    if (NEWS_API_KEY && NEWS_API_KEY !== '') {
      console.log('📰 Intentando obtener noticias de NewsAPI...')
      
      for (const search of searches) {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/${search.type}?${search.params}&pageSize=20&apiKey=${NEWS_API_KEY}`,
            { 
              next: { revalidate: 3600 },
              cache: 'no-store' // Evitar cache para debugging
            }
          )
          
          console.log(`🔍 ${search.label} - Status: ${response.status}`)
          
          if (response.ok) {
            const data = await response.json()
            
            console.log(`✅ Artículos obtenidos para "${search.label}":`, data.articles?.length || 0)
            
            if (data.articles) {
              const processedArticles = data.articles
                .filter((article: any) => {
                  if (!article.title || !article.url || article.title.includes('[Removed]')) return false
                  
                  // Si es de tech headlines, filtrar solo las relacionadas con IA
                  if (search.type === 'top-headlines') {
                    const text = `${article.title} ${article.description || ''}`.toLowerCase()
                    return text.match(/\b(ai|artificial intelligence|machine learning|chatgpt|openai|deepmind|neural network|llm|gpt|claude|gemini)\b/i)
                  }
                  
                  return true
                })
                .map((article: any) => ({
                  title: article.title,
                  summary: generateSummary(article.description || article.content || ''),
                  category: categorizeNews(article.title, article.description || ''),
                  url: article.url,
                  publishedAt: article.publishedAt,
                  source: article.source.name
                }))
              
              console.log(`🎯 Artículos procesados y filtrados: ${processedArticles.length}`)
              allArticles.push(...processedArticles)
            }
          } else {
            const errorData = await response.json()
            console.error(`❌ Error en NewsAPI para "${search.label}":`, errorData)
          }
        } catch (error) {
          console.error(`❌ Error fetching news for "${search.label}":`, error)
        }
      }
    }
    
    // Si no hay artículos o no hay API key, usar datos de ejemplo
    if (allArticles.length === 0) {
      console.log('⚠️ No se obtuvieron artículos, usando datos de ejemplo')
      allArticles.push(
        {
          title: 'La UE aprueba la Ley de Inteligencia Artificial',
          summary: 'El Parlamento Europeo ha aprobado la primera ley integral sobre IA del mundo, estableciendo normas estrictas para sistemas de alto riesgo. Esta normativa busca proteger los derechos fundamentales de los ciudadanos.',
          category: AI_CATEGORIES.REGULATION,
          url: 'https://www.europarl.europa.eu/news/es/headlines/society/20230601STO93804/ley-de-ia-de-la-ue-primera-regulacion-sobre-inteligencia-artificial',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: 'Parlamento Europeo'
        },
        {
          title: 'Avances en IA ética y responsable en España',
          summary: 'Investigadores españoles desarrollan nuevos marcos para garantizar que los sistemas de IA sean transparentes y justos. El enfoque se centra en eliminar sesgos algorítmicos.',
          category: AI_CATEGORIES.ETHICS,
          url: 'https://www.agenciasinc.es/',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          source: 'SINC'
        },
        {
          title: 'España lidera investigación en procesamiento del lenguaje natural',
          summary: 'Centros de investigación españoles desarrollan soluciones innovadoras en procesamiento del lenguaje natural y visión por computador, posicionando al país como referente europeo.',
          category: AI_CATEGORIES.RESEARCH,
          url: 'https://www.csic.es/',
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          source: 'CSIC'
        },
        {
          title: 'Empresas españolas adoptan IA responsable',
          summary: 'El sector empresarial español incrementa su inversión en soluciones de IA ética. Más del 60% de las grandes empresas planea implementar sistemas de IA responsable en 2025.',
          category: AI_CATEGORIES.BUSINESS,
          url: 'https://www.expansion.com/',
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          source: 'Expansión'
        },
        {
          title: 'Impacto de la IA en el mercado laboral español',
          summary: 'Un nuevo estudio analiza cómo la inteligencia artificial está transformando el mercado de trabajo en España. Se prevé la creación de nuevos perfiles profesionales especializados.',
          category: AI_CATEGORIES.SOCIETY,
          url: 'https://www.elpais.com/',
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
          source: 'El País'
        },
        {
          title: 'Nuevos modelos de IA multimodal revolucionan la industria',
          summary: 'Los últimos avances en modelos de lenguaje multimodal permiten procesar simultáneamente texto, imagen y audio, abriendo nuevas posibilidades de aplicación.',
          category: AI_CATEGORIES.TECHNOLOGY,
          url: 'https://www.technologyreview.es/',
          publishedAt: new Date(Date.now() - 432000000).toISOString(),
          source: 'MIT Technology Review'
        }
      )
    }
    
    // Eliminar duplicados por título
    const uniqueArticles = Array.from(
      new Map(allArticles.map(article => [article.title, article])).values()
    )
    
    // Ordenar por fecha y limitar a 6 noticias
    const sortedArticles = uniqueArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 6)
    
    console.log(`✨ Devolviendo ${sortedArticles.length} noticias`)
    
    return NextResponse.json({ articles: sortedArticles })
    
  } catch (error) {
    console.error('Error fetching news:', error)
    
    // Devolver datos de respaldo en caso de error
    return NextResponse.json({
      articles: [
        {
          title: 'Noticias de IA temporalmente no disponibles',
          summary: 'Estamos trabajando para traerte las últimas noticias sobre inteligencia artificial.',
          category: 'Información',
          url: '/docs',
          publishedAt: new Date().toISOString(),
          source: 'RegulacionIA'
        }
      ]
    })
  }
}
