import type { FC } from 'react'
import toolsData from '../../data/ai-tools.json'
import { useState } from 'react'

interface AITool {
    name: string
    url: string
    icon: string
    usage: string
    price: string
    version: string
    description: string
}

const { tools: aiTools, metadata } = toolsData

export const TopAIToolsTable: FC = () => {
    const [showAll, setShowAll] = useState(false)

    // Determine which tools to show based on state
    const visibleTools = showAll ? aiTools : aiTools.slice(0, 25)

    // Calculate columns based on visible tools
    // If showing 25, just one column might be better, or split 13/12.
    // Let's keep the split logic relative to visible tools length
    const midPoint = Math.ceil(visibleTools.length / 2)
    const col1 = visibleTools.slice(0, midPoint)
    const col2 = visibleTools.slice(midPoint)

    const ToolRow = ({ tool, rank, isTop }: { tool: AITool, rank: number, isTop?: boolean }) => {
        // Show tooltip below for the first few items in each column
        const tooltipPositionClass = isTop ? 'top-full mt-2' : 'bottom-full mb-2'
        const arrowPositionClass = isTop ? 'bottom-full border-b-gray-900 dark:border-b-gray-100' : 'top-full border-t-gray-900 dark:border-t-gray-100'

        return (
            <div className={`group relative flex items-center gap-4 p-3 border-b border-gray-100/50 dark:border-gray-800/50 hover:bg-black/[.02] dark:hover:bg-white/[.02] transition-colors`}>
                <span className="font-mono text-sm text-gray-400 w-8 text-right flex-shrink-0">#{rank}</span>
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
                <div className={`absolute left-1/2 -translate-x-1/2 ${tooltipPositionClass} w-64 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none`}>
                    <div className={`absolute left-1/2 -translate-x-1/2 ${arrowPositionClass} border-4 border-transparent`}></div>
                    <p className="font-semibold mb-1">{tool.name}</p>
                    <p className="leading-relaxed opacity-90">{tool.description}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col bg-transparent">
            <div className="w-full bg-neutral-900 border-b border-gray-700/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-center text-white m-0">
                    Nuestro Top 50 Herramientas de IA
                </h3>

                <div className="flex flex-col items-end text-xs text-gray-400 gap-1 text-right">
                    <div className="flex items-center gap-2">
                        <span className="uppercase tracking-wider font-semibold text-gray-500">Próxima Act.:</span>
                        <span className="text-white bg-gray-800 px-2 py-0.5 rounded border border-gray-700">{metadata.nextUpdate}</span>
                    </div>
                    {metadata.relevantChanges.length > 0 && (
                        <div className="flex flex-col gap-0.5 mt-1 border-t border-gray-800 pt-1">
                            {metadata.relevantChanges.map((change: string, i: number) => (
                                <span key={i} className="text-gray-300 flex items-center justify-end gap-1">
                                    <span className="w-1 h-1 rounded-full bg-green-500 inline-block"></span>
                                    {change}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-2 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    <div className="flex flex-col">
                        {col1.map((tool, i) => <ToolRow key={i} tool={tool} rank={i + 1} isTop={i < 3} />)}
                    </div>
                    <div className="flex flex-col">
                        {col2.map((tool, i) => <ToolRow key={i} tool={tool} rank={midPoint + i + 1} isTop={i < 3} />)}
                    </div>
                </div>
            </div>

            <div className="px-4 py-2 flex justify-center">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="group flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-full transition-all"
                >
                    {showAll ? (
                        <>
                            Ver menos
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><path d="m18 15-6-6-6 6" /></svg>
                        </>
                    ) : (
                        <>
                            Ver las 50 herramientas
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
                        </>
                    )}
                </button>
            </div>

            <div className="p-4 text-center text-xs text-gray-400 mt-2">
                Última actualización: {metadata.lastUpdated}
            </div>
        </div>
    )
}
