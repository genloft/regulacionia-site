import type { FC } from 'react'

interface RankingItem {
    rank: number
    name: string
    url: string
    followers: string
    change: string
    country: string
}

interface RankingData {
    lastUpdated: string
    nextUpdate: string
    summary: string
    items: RankingItem[]
}

interface RankingListProps {
    title: string
    icon: React.ReactNode
    data: RankingData
    colorClass: string
}

export const RankingList: FC<RankingListProps> = ({ title, icon, data, colorClass }) => {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className={`p-4 border-b border-gray-100 dark:border-gray-800 ${colorClass}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white dark:bg-black/20 rounded-lg shadow-sm">
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold m-0 leading-tight text-gray-900 dark:text-white">
                        {title}
                    </h3>
                </div>
                <div className="flex justify-between items-end">
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                        <span className="opacity-75">Actualización:</span> {data.nextUpdate}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded-full text-gray-700 dark:text-gray-300">
                        {data.summary}
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-0">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {data.items.slice(0, 10).map((item) => (
                        <a
                            key={item.rank}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/[.02] transition-colors group"
                        >
                            <div className="flex-shrink-0 w-6 text-center font-mono text-sm font-bold text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                #{item.rank}
                            </div>

                            <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="block text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.name}
                                    </span>
                                    <span className="text-sm">{item.country}</span>
                                </div>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">
                                    {item.followers} seguidores
                                </span>
                            </div>

                            <div className={`flex-shrink-0 text-xs font-medium px-1.5 py-0.5 rounded ${item.change.includes('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                    item.change.includes('-') ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                        item.change === 'NEW' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                {item.change}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
