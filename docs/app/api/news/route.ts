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
  SOCIETY: 'Sociedad'
}

// Función para categorizar noticias basándose en palabras clave
function categorizeNews(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  
  if (text.match(/regulación|regulacion|ley|normativa|legislación|legislacion|política|politica|parlamento|gobierno/)) {
    return AI_CATEGORIES.REGULATION
  }
  if (text.match(/ética|etica|responsable|sesgo|privacidad|derechos|transparencia|discriminación|discriminacion/)) {
    return AI_CATEGORIES.ETHICS
  }
  if (text.match(/investigación|investigacion|estudio|científico|cientifico|desarrollo|descubrimiento|avance/)) {
    return AI_CATEGORIES.RESEARCH
  }
  if (text.match(/empresa|negocio|mercado|inversión|inversion|startup|económico|economico|industria/)) {
    return AI_CATEGORIES.BUSINESS
  }
  if (text.match(/sociedad|empleo|trabajo|educación|educacion|impacto social|salud|medioambiente/)) {
    return AI_CATEGORIES.SOCIETY
  }
  
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
    
    // Búsqueda de noticias de IA en español y en inglés
    const queries = [
      'inteligencia artificial España',
      'artificial intelligence regulation',
      'AI ethics Europe'
    ]
    
    const allArticles: NewsArticle[] = []
    
    // Si tienes NEWS_API_KEY configurada
    if (NEWS_API_KEY && NEWS_API_KEY !== '') {
      for (const query of queries) {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=es,en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`,
            { next: { revalidate: 3600 } }
          )
          
          if (response.ok) {
            const data = await response.json()
            
            if (data.articles) {
              const processedArticles = data.articles
                .filter((article: any) => article.title && article.url && !article.title.includes('[Removed]'))
                .map((article: any) => ({
                  title: article.title,
                  summary: generateSummary(article.description || article.content || ''),
                  category: categorizeNews(article.title, article.description || ''),
                  url: article.url,
                  publishedAt: article.publishedAt,
                  source: article.source.name
                }))
              
              allArticles.push(...processedArticles)
            }
          }
        } catch (error) {
          console.error(`Error fetching news for query "${query}":`, error)
        }
      }
    }
    
    // Si no hay artículos o no hay API key, usar datos de ejemplo
    if (allArticles.length === 0) {
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
