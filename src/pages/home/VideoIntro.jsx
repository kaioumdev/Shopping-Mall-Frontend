import React, { useEffect, useRef, useState } from 'react'

const VideoIntro = ({ onComplete }) => {
    const [visible, setVisible] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        // Auto-dismiss after 4.5s if video doesn't fire
        const timer = setTimeout(() => {
            handleSkip()
        }, 4500)
        return () => clearTimeout(timer)
    }, [])

    const handleSkip = () => {
        setFadeOut(true)
        setTimeout(() => {
            setVisible(false)
            onComplete?.()
        }, 700)
    }

    if (!visible) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* Animated background gradient mall-like ambience */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated light beams */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
                <div
                    className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#ed3849]/20 to-transparent animate-pulse"
                    style={{ transform: 'rotate(-15deg)', transformOrigin: 'top', width: '2px' }}
                />
                <div
                    className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse"
                    style={{ animationDelay: '0.5s', width: '1px' }}
                />
                <div
                    className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-transparent via-[#ed3849]/15 to-transparent animate-pulse"
                    style={{ animationDelay: '1s', transform: 'rotate(15deg)', transformOrigin: 'top', width: '2px' }}
                />
                {/* Glowing orbs */}
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#ed3849]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-8">
                {/* Mall icon animation */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-2 border-[#ed3849]/50 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                            <div className="absolute inset-2 rounded-full border border-white/10" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className="ri-store-3-line text-4xl text-white" />
                        </div>
                    </div>
                </div>

                {/* Brand name with staggered letter animation */}
                <div className="overflow-hidden mb-3">
                    <h1
                        className="text-6xl md:text-8xl font-black text-white tracking-widest"
                        style={{ fontFamily: '"Playfair Display", serif', animation: 'slideUp 0.8s ease forwards' }}
                    >
                        ShoppingMall
                    </h1>
                </div>

                <div className="overflow-hidden mb-8">
                    <p
                        className="text-[#ed3849] text-sm md:text-base tracking-[0.4em] uppercase font-medium"
                        style={{ animation: 'slideUp 0.8s ease 0.3s both' }}
                    >
                        Shopping Mall — Est. 2026
                    </p>
                </div>

                {/* Loading bar */}
                <div className="w-48 mx-auto h-px bg-white/10 rounded-full overflow-hidden mb-8">
                    <div
                        className="h-full bg-gradient-to-r from-[#ed3849] to-pink-400 rounded-full"
                        style={{ animation: 'loadBar 3.8s ease forwards' }}
                    />
                </div>

                <p className="text-white/40 text-xs tracking-widest uppercase mb-6" style={{ animation: 'fadeIn 1s ease 1s both' }}>
                    Welcome to your ultimate shopping destination
                </p>

                {/* Skip button */}
                <button
                    onClick={handleSkip}
                    className="text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors duration-300 border border-white/10 hover:border-white/30 px-4 py-2 rounded-full"
                    style={{ animation: 'fadeIn 0.5s ease 1.5s both' }}
                >
                    Enter Mall →
                </button>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes loadBar {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    )
}

export default VideoIntro
