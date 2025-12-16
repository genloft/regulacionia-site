'use client'

import { useEffect, useState, useRef } from 'react'
import type { FC } from 'react'
import { motion } from 'framer-motion'

interface NewsArticle {
  title: string
  summary: string
  category: string
  url: string
  publishedAt: string
  source: string
  originalLanguage?: string
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

import { ScrollableContainer } from './scrollable-container'

export const AINews: FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
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

  const recentNewsCount = news.filter(article => {
    const date = new Date(article.publishedAt)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    return diffHours <= 48
  }).length

  if (loading) {
    return (
      <div className="flex gap-4 p-6 overflow-hidden w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse min-w-[300px]">
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

  // Calculate available options based on current selection
  const newsForSources = news.filter(article => {
    const categoryMatch = selectedCategory ? article.category === selectedCategory : true
    const languageMatch = selectedLanguage ? article.originalLanguage === selectedLanguage : true
    return categoryMatch && languageMatch
  })

  const newsForCategories = news.filter(article => {
    const sourceMatch = selectedSource ? article.source === selectedSource : true
    const languageMatch = selectedLanguage ? article.originalLanguage === selectedLanguage : true
    return sourceMatch && languageMatch
  })

  const uniqueSources = Array.from(new Set(newsForSources.map(article => article.source))).sort()
  const uniqueCategories = Array.from(new Set(newsForCategories.map(article => article.category))).sort()

  const sourceCounts = newsForSources.reduce((acc, article) => {
    acc[article.source] = (acc[article.source] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categoryCounts = newsForCategories.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const filteredNews = news.filter(article => {
    const sourceMatch = selectedSource ? article.source === selectedSource : true
    const categoryMatch = selectedCategory ? article.category === selectedCategory : true
    const languageMatch = selectedLanguage ? article.originalLanguage === selectedLanguage : true
    return sourceMatch && categoryMatch && languageMatch
  })

  return (
    <div className="flex flex-col gap-2 font-sans antialiased h-full w-full">
      <div className="px-4 pt-2 flex justify-between items-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          {recentNewsCount} noticias en las últimas 48h
        </span>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setSelectedLanguage(selectedLanguage === 'es' ? null : 'es')}
              className={`px-2 py-0.5 text-xs rounded-md transition-colors ${selectedLanguage === 'es' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              ES
            </button>
            <button
              onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? null : 'en')}
              className={`px-2 py-0.5 text-xs rounded-md transition-colors ${selectedLanguage === 'en' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              EN
            </button>
          </div>

          {(selectedSource || selectedCategory || selectedLanguage) && (
            <button
              onClick={() => {
                setSelectedSource(null)
                setSelectedCategory(null)
                setSelectedLanguage(null)
              }}
              className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <ScrollableContainer className="px-4 pb-2" itemClassName="gap-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-none w-[300px] snap-center p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] bg-black/[.05] dark:bg-gray-50/10 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 select-none"
              onDragStart={(e) => e.preventDefault()}
            >
              <div className="flex flex-col h-full pointer-events-none">
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

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 flex-grow">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Fuente: {article.source}
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1">
                    Leer más <span>→</span>
                  </span>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="w-full text-center py-8 text-gray-500">
            No hay noticias disponibles para esta selección.
          </div>
        )}
      </ScrollableContainer>

      <div className="px-4 py-2 mt-2">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50/50 dark:bg-purple-900/10 rounded-xl p-3 border border-purple-100 dark:border-purple-900/20">
            <p className="text-xs text-purple-900 dark:text-purple-100 mb-2 font-medium flex items-center justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Filtrar por tema {selectedCategory && <span className="font-bold">({selectedCategory})</span>}
            </p>
            <ScrollableContainer itemClassName="gap-2 pb-1">
              {uniqueCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`flex-none px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap border transition-colors select-none ${selectedCategory === category
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  {category} <span className="opacity-60 ml-0.5">({categoryCounts[category]})</span>
                </button>
              ))}
            </ScrollableContainer>
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-3 border border-blue-100 dark:border-blue-900/20">
            <p className="text-xs text-blue-900 dark:text-blue-100 mb-2 font-medium flex items-center justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Filtrar por fuente {selectedSource && <span className="font-bold">({selectedSource})</span>}
            </p>
            <ScrollableContainer itemClassName="gap-2 pb-1">
              {uniqueSources.map((source, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSource(selectedSource === source ? null : source)}
                  className={`flex-none px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap border transition-colors select-none ${selectedSource === source
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  {source} <span className="opacity-60 ml-0.5">({sourceCounts[source]})</span>
                </button>
              ))}
            </ScrollableContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
