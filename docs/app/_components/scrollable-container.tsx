'use client'

import { useEffect, useState, useRef } from 'react'
import type { FC } from 'react'

interface ScrollableContainerProps {
    children: React.ReactNode
    className?: string
    itemClassName?: string
}

export const ScrollableContainer: FC<ScrollableContainerProps> = ({ children, className = '', itemClassName = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const checkScroll = () => {
        if (!containerRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // -10 buffer
    }

    useEffect(() => {
        checkScroll()
        window.addEventListener('resize', checkScroll)
        return () => window.removeEventListener('resize', checkScroll)
    }, [children])

    const scroll = (direction: 'left' | 'right') => {
        if (!containerRef.current) return
        const container = containerRef.current
        const scrollAmount = container.clientWidth * 0.75
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        isDragging.current = true
        startX.current = e.pageX - containerRef.current.offsetLeft
        scrollLeft.current = containerRef.current.scrollLeft
        containerRef.current.style.cursor = 'grabbing'
        containerRef.current.style.userSelect = 'none'
    }

    const handleMouseLeave = () => {
        if (!containerRef.current) return
        isDragging.current = false
        containerRef.current.style.cursor = 'grab'
        containerRef.current.style.removeProperty('user-select')
    }

    const handleMouseUp = () => {
        if (!containerRef.current) return
        isDragging.current = false
        containerRef.current.style.cursor = 'grab'
        containerRef.current.style.removeProperty('user-select')
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX.current) * 2 // Scroll-fast
        containerRef.current.scrollLeft = scrollLeft.current - walk
        checkScroll()
    }

    return (
        <div className={`relative group ${className}`}>
            {showLeftArrow && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    aria-label="Scroll left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
            )}

            <div
                ref={containerRef}
                className={`flex overflow-x-auto gap-4 pb-4 scrollbar-hide cursor-grab ${itemClassName}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={checkScroll}
            >
                {children}
            </div>

            {showRightArrow && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    aria-label="Scroll right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
            )}
        </div>
    )
}
