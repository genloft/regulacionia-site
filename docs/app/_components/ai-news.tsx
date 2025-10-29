'use client'

import { useEffect, useState } from 'react'
import type { FC } from 'react'

interface NewsArticle {
  title: string
  summary: string
  category: string
  url: string
  publishedAt: string
  source: string
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Regulación': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'Ética': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Tecnología': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    'Negocios': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    'Investigación': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    'Sociedad': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    'Laboral': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Salud': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    'Educación': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
  }
  return colors[category] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffHours < 1) return 'Hace menos de 1 hora'
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
  
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export const AINews: FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        if (!response.ok) throw new Error('Failed to fetch news')
        
        const data = await response.json()
        setNews(data.articles || [])
        setError(false)
      } catch (err) {
        console.error('Error loading news:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error || news.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          No se pudieron cargar las noticias en este momento.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] p-4">
      {news.map((article, index) => (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800/50 hover:scale-[1.02]"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatDate(article.publishedAt)}
            </span>
          </div>
          
          <h4 className="text-base font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h4>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Fuente: {article.source}
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
              Leer más <span>→</span>
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
