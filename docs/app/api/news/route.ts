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
  originalLanguage?: string
}

// Función para traducir texto usando MyMemory API (gratuita, 1000 palabras/día sin key)
async function translateText(text: string, targetLang: string = 'es'): Promise<string> {
  try {
    // Detectar si el texto ya está en español
    if (!text || text.trim().length === 0) return text
    
    // Limitar longitud del texto a traducir para no superar límites
    const textToTranslate = text.length > 500 ? text.substring(0, 497) + '...' : text
    
    // Usar MyMemory API - GRATUITA sin registro
    // Límite: 1000 palabras/día sin API key, 10000 con email
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`,
      { 
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(3000) // Timeout de 3 segundos
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText
      }
    }
    
    return text
  } catch (error) {
    console.warn('Error traduciendo texto, usando original:', error)
    return text // Devolver texto original si falla
  }
}

// Función para traducir una noticia completa
async function translateArticle(article: any, targetLang: string = 'es'): Promise<NewsArticle> {
  // Detectar idioma del artículo (aproximado)
  const titleWords = article.title.toLowerCase().split(' ')
  const spanishWords = ['el', 'la', 'los', 'las', 'de', 'del', 'en', 'con', 'por', 'para', 'una', 'uno']
  const hasSpanishWords = titleWords.some((word: string) => spanishWords.includes(word))
  
  // Si detectamos español, no traducir
  if (hasSpanishWords) {
    return {
      title: article.title,
      summary: generateSummary(article.description || article.content || ''),
      category: categorizeNews(article.title, article.description || ''),
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
      originalLanguage: 'es'
    }
  }
  
  // Si es inglés u otro idioma, traducir título y descripción
  const [translatedTitle, translatedDesc] = await Promise.all([
    translateText(article.title, targetLang),
    translateText(article.description || '', targetLang)
  ])
  
  return {
    title: translatedTitle,
    summary: generateSummary(translatedDesc),
    category: categorizeNews(translatedTitle, translatedDesc),
    url: article.url,
    publishedAt: article.publishedAt,
    source: article.source.name,
    originalLanguage: 'en'
  }
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

// Función para parsear RSS/Atom feeds
async function parseRSSFeed(url: string, sourceName: string): Promise<any[]> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RegulacionIA/1.0)'
      },
      // @ts-ignore - Node.js specific option for handling SSL certificates
      ...(process.env.NODE_ENV === 'development' && { 
        agent: undefined 
      })
    })
    
    if (!response.ok) {
      console.warn(`⚠️ ${sourceName}: HTTP ${response.status}`)
      return []
    }
    
    const xmlText = await response.text()
    
    // Parse XML simple (buscar items/entries)
    const items: any[] = []
    
    // Detectar si es RSS o Atom
    const isAtom = xmlText.includes('<feed') || xmlText.includes('xmlns="http://www.w3.org/2005/Atom"')
    
    if (isAtom) {
      // Parse Atom feed
      const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
      let match
      while ((match = entryRegex.exec(xmlText)) !== null) {
        const entry = match[1]
        if (!entry) continue
        
        const titleMatch = entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)
        const title = titleMatch?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim()
        
        const linkMatch1 = entry.match(/<link[^>]*href=["'](.*?)["']/)
        const linkMatch2 = entry.match(/<link>(.*?)<\/link>/)
        const link = linkMatch1?.[1] || linkMatch2?.[1]
        
        const summaryMatch = entry.match(/<summary[^>]*>([\s\S]*?)<\/summary>/)
        const summary = summaryMatch?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').replace(/<[^>]+>/g, '').trim()
        
        const contentMatch = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)
        const content = contentMatch?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').replace(/<[^>]+>/g, '').trim()
        
        const publishedMatch = entry.match(/<published>(.*?)<\/published>/)
        const updatedMatch = entry.match(/<updated>(.*?)<\/updated>/)
        const published = publishedMatch?.[1] || updatedMatch?.[1]
        
        if (title && link) {
          items.push({
            title: title.replace(/<[^>]+>/g, ''),
            url: link,
            description: summary || content || '',
            publishedAt: published || new Date().toISOString(),
            source: { name: sourceName }
          })
        }
      }
    } else {
      // Parse RSS feed
      const itemRegex = /<item>([\s\S]*?)<\/item>/g
      let match
      while ((match = itemRegex.exec(xmlText)) !== null) {
        const item = match[1]
        if (!item) continue
        
        const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/)
        const title = titleMatch?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim()
        
        const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/)
        const link = linkMatch?.[1]?.trim()
        
        const descMatch = item.match(/<description>([\s\S]*?)<\/description>/)
        const description = descMatch?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').replace(/<[^>]+>/g, '').trim()
        
        const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/)
        const dcDateMatch = item.match(/<dc:date>(.*?)<\/dc:date>/)
        const pubDate = pubDateMatch?.[1] || dcDateMatch?.[1]
        
        if (title && link) {
          items.push({
            title: title.replace(/<[^>]+>/g, ''),
            url: link,
            description: description || '',
            publishedAt: pubDate || new Date().toISOString(),
            source: { name: sourceName }
          })
        }
      }
    }
    
    return items
  } catch (error) {
    console.error(`Error parsing RSS feed ${sourceName}:`, error)
    return []
  }
}

export async function GET(request: Request) {
  try {
    console.log('📰 Obteniendo noticias de medios españoles...')
    
    // RSS feeds de medios españoles de calidad + fuentes internacionales en español
    const rssFeeds = [
      // Medios españoles generales
      { url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/tecnologia/portada', name: 'El País' },
      { url: 'https://e00-elmundo.uecdn.es/elmundo/rss/tecnologia.xml', name: 'El Mundo' },
      { url: 'https://www.abc.es/rss/feeds/abc_tecnologia.xml', name: 'ABC' },
      { url: 'https://www.expansion.com/rss/tecnologia.xml', name: 'Expansión' },
      { url: 'https://www.larazon.es/rss/tecnologia.xml', name: 'La Razón' },
      { url: 'https://www.elespanol.com/rss/omicrono/', name: 'El Español' },
      
      // Medios especializados en tecnología (más IA)
      { url: 'https://www.xataka.com/index.xml', name: 'Xataka' },
      { url: 'https://www.genbeta.com/index.xml', name: 'Genbeta' },
      { url: 'https://hipertextual.com/feed', name: 'Hipertextual' },
      // { url: 'https://www.muyinteresante.es/feed/', name: 'Muy Interesante' }, // Temporal: certificado SSL problemático
      
      // Fuentes adicionales con más contenido
      { url: 'https://www.elconfidencial.com/rss/tecnologia/', name: 'El Confidencial' },
      { url: 'https://computerhoy.com/rss', name: 'Computer Hoy' },
      { url: 'https://www.europapress.es/rss/rss.aspx?ch=434', name: 'Europa Press Tech' },
      { url: 'https://www.20minutos.es/rss/tecnologia/', name: '20 Minutos Tech' }
    ]
    
    const allArticles: NewsArticle[] = []
    
    // Obtener noticias de todos los RSS feeds en paralelo
    console.log(`🔍 Consultando ${rssFeeds.length} medios españoles...`)
    
    const feedResults = await Promise.allSettled(
      rssFeeds.map(feed => parseRSSFeed(feed.url, feed.name))
    )
    
    // Procesar resultados
    feedResults.forEach((result, i) => {
      const feed = rssFeeds[i]
      if (!feed) return
      
      if (result.status === 'fulfilled' && result.value && result.value.length > 0) {
        console.log(`✅ ${feed.name}: ${result.value.length} artículos`)
        
        // Filtrar solo artículos ESTRICTAMENTE relacionados con IA
        const aiArticles = result.value.filter((article: any) => {
          const text = `${article.title} ${article.description}`.toLowerCase()
          // Filtro ESTRICTO: solo términos específicos de IA
          // Debe mencionar explícitamente IA, modelos de lenguaje, o tecnologías de IA específicas
          return text.match(/\b(inteligencia artificial|ia\b(?! de|s\b)|ai\b(?! de|s\b)|chatgpt|openai|deepmind|anthropic|machine learning|deep learning|red neuronal|redes neuronales|neural network|gpt-|gpt |claude|gemini|copilot|bard|llm|modelo de lenguaje|language model|generative|generativa|transformer|stable diffusion|midjourney|dall-e|dall·e)\b/i)
        })
        
        console.log(`🎯 ${feed.name}: ${aiArticles.length} artículos sobre IA`)
        
        // Procesar artículos
        const processedArticles = aiArticles.map((article: any) => ({
          title: article.title,
          summary: generateSummary(article.description),
          category: categorizeNews(article.title, article.description),
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name,
          originalLanguage: 'es'
        }))
        
        allArticles.push(...processedArticles)
      } else {
        console.warn(`⚠️ ${feed.name}: No se pudieron obtener artículos`)
      }
    })
    
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
    
    console.log(`📊 Total artículos únicos: ${uniqueArticles.length}`)
    
    // Separar por idioma
    const spanishArticles = uniqueArticles.filter(a => a.originalLanguage === 'es')
    const englishArticles = uniqueArticles.filter(a => a.originalLanguage === 'en')
    
    console.log(`🇪🇸 Artículos en español: ${spanishArticles.length}`)
    console.log(`🇬🇧 Artículos en inglés: ${englishArticles.length}`)
    
    // Priorizar contenido en español: tomar hasta 10 artículos (8 español + 2 inglés)
    const selectedSpanish = spanishArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 8)
    
    const selectedEnglish = englishArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 2)
    
    // Combinar y ordenar por fecha, limitar a 10
    const sortedArticles = [...selectedSpanish, ...selectedEnglish]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 10)
    
    console.log(`✨ Devolviendo ${sortedArticles.length} noticias (${selectedSpanish.length} ES + ${selectedEnglish.length} EN)`)
    
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
