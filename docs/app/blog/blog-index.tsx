'use client'

import Link from 'next/link'
import type { FC } from 'react'

interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    category: string
    readTime: string
    image: string
}

const FEATURED_POSTS: BlogPost[] = [
    {
        slug: 'fara-7b-microsoft',
        title: 'Fara-7b de Microsoft: Análisis de Ética y Regulación',
        description: 'Un análisis profundo sobre el nuevo modelo de Microsoft, sus implicaciones éticas y los desafíos regulatorios que presenta para la industria de la IA.',
        date: '16 Dic 2025',
        category: 'Análisis',
        readTime: '8 min lectura',
        image: '/assets/blog/fara-7b-card.png'
    },
    {
        slug: 'agentes-ia-2026',
        title: 'Lanzamientos más esperados en Agentes IA para 2026',
        description: 'Exploramos el futuro de los agentes autónomos, las tecnologías emergentes y lo que podemos esperar ver en el próximo año en el campo de la IA.',
        date: '15 Dic 2025',
        category: 'Tendencias',
        readTime: '12 min lectura',
        image: '/assets/blog/agents-2026-card.png'
    }
]

export const BlogIndex: FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl mb-4">
                    Blog
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
                    Noticias, análisis y reflexiones sobre la regulación y ética de la Inteligencia Artificial.
                </p>
            </div>

            {/* Featured Grid (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {FEATURED_POSTS.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300"
                    >
                        <div className="aspect-[16/9] w-full relative overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex flex-col flex-1 p-6 sm:p-8">
                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                    {post.category}
                                </span>
                                <span>•</span>
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-base text-gray-600 dark:text-gray-300 flex-1 line-clamp-3">
                                {post.description}
                            </p>
                            <div className="mt-6 flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                Leer artículo
                                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Posts List (Pages) */}
            <div className="border-t border-gray-200 dark:border-white/10 pt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Publicaciones Recientes
                </h3>
                <div className="flex flex-col gap-8">
                    {/* Reusing featured posts as "recent" for now as requested structure implies listing pages below */}
                    {FEATURED_POSTS.map((post) => (
                        <Link
                            key={`list-${post.slug}`}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                            <div className="w-full md:w-64 aspect-[3/2] rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">
                                        {post.category}
                                    </span>
                                    <span>•</span>
                                    <time dateTime={post.date}>{post.date}</time>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                    {post.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
