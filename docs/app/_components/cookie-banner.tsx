'use client'

import { useState, useEffect } from 'react'

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [showConfig, setShowConfig] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('uia-cookie-consent')
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('uia-cookie-consent', 'accepted')
        setIsVisible(false)
    }

    const handleReject = () => {
        localStorage.setItem('uia-cookie-consent', 'rejected')
        setIsVisible(false)
    }

    const handleSaveConfig = () => {
        // In a real app we would save specific preferences here
        localStorage.setItem('uia-cookie-consent', 'configured')
        setShowConfig(false)
        setIsVisible(false)
    }

    // Avoid hydration mismatch by not rendering until client-side (useEffect runs)
    if (!isVisible) return null

    if (showConfig) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-neutral-900 border border-gray-700 rounded-xl p-6 max-w-lg w-full shadow-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">Configuración de Cookies</h3>
                        <button onClick={() => setShowConfig(false)} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    <p className="text-sm text-gray-300 mb-6">
                        Puedes configurar qué cookies permites que utilicemos. Las cookies técnicas son necesarias para el funcionamiento de la web.
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <div>
                                <p className="text-white font-medium flex items-center gap-2">
                                    Esenciales
                                    <span className="text-[10px] uppercase bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">Requerido</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Necesarias para que la web funcione correctamente.</p>
                            </div>
                            <input type="checkbox" checked disabled className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 opacity-50 cursor-not-allowed" />
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <div>
                                <p className="text-white font-medium">Analíticas</p>
                                <p className="text-xs text-gray-400 mt-1">Nos ayudan a entender cómo usas la web y mejorarla.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer" />
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <div>
                                <p className="text-white font-medium">Marketing</p>
                                <p className="text-xs text-gray-400 mt-1">Para mostrarte contenido relevante según tus intereses.</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                        <button
                            onClick={() => setShowConfig(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveConfig}
                            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors shadow-lg"
                        >
                            Guardar preferencias
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-neutral-900 border-t border-gray-700 z-[90] text-white shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-300">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                <div className="flex-1 text-sm text-gray-300 text-center lg:text-left">
                    <p>
                        <span className="font-semibold text-white">🍪 Valoramos tu privacidad.</span> Utilizamos cookies propias y de terceros para fines analíticos y para mostrarte publicidad personalizada en base a un perfil elaborado a partir de tus hábitos de navegación (por ejemplo, páginas visitadas).
                        <br className="hidden md:inline" /> Puedes aceptar todas las cookies, rechazarlas o configurar tus preferencias.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 justify-center">
                    <button
                        onClick={() => setShowConfig(true)}
                        className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white underline decoration-gray-500 hover:decoration-white transition-colors"
                    >
                        Configurar
                    </button>
                    <button
                        onClick={handleReject}
                        className="px-4 py-2.5 text-sm font-medium bg-transparent hover:bg-gray-800 text-white rounded-lg transition-colors border border-gray-600"
                    >
                        Rechazar todo
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg transition-colors font-bold shadow-lg shadow-white/10"
                    >
                        Aceptar todo
                    </button>
                </div>
            </div>
        </div>
    )
}
