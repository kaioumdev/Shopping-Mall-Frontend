import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../assets/header.png'

const slides = [
    {
        tag: "New Season 2024",
        heading: "Discover\nYour Style",
        sub: "Explore premium fashion across 100+ brands at Lebaba Shopping Mall.",
        cta: "Shop Now",
        ctaPath: "/shop",
        accent: "#ed3849",
        bg: "from-[#1a0a0c] via-[#2d0d14] to-[#0f0a0a]",
    },
    {
        tag: "Up to 20% Off",
        heading: "Exclusive\nDeals",
        sub: "Limited-time offers across fashion, jewellery, beauty & accessories.",
        cta: "See Deals",
        ctaPath: "/shop",
        accent: "#8b5cf6",
        bg: "from-[#0d0a1a] via-[#160d2d] to-[#0a0a0f]",
    },
    {
        tag: "Premium Brands",
        heading: "Luxury\nShopping",
        sub: "Handpicked collections from the world's finest fashion houses.",
        cta: "Explore",
        ctaPath: "/categories/accessories",
        accent: "#f59e0b",
        bg: "from-[#1a1200] via-[#2d1f00] to-[#0f0c00]",
    },
]

const Banner = () => {
    const [current, setCurrent] = useState(0)
    const [animKey, setAnimKey] = useState(0)
    const intervalRef = useRef(null)

    const goTo = (idx) => {
        setCurrent(idx)
        setAnimKey(k => k + 1)
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrent(prev => {
                const next = (prev + 1) % slides.length
                setAnimKey(k => k + 1)
                return next
            })
        }, 5000)
        return () => clearInterval(intervalRef.current)
    }, [])

    const slide = slides[current]

    return (
        <section className={`relative min-h-screen flex items-center bg-gradient-to-br ${slide.bg} overflow-hidden transition-all duration-1000`}>
            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Animated accent blob */}
            <div
                className="absolute right-0 top-0 w-[60vw] h-[100vh] opacity-20 blur-3xl transition-all duration-1000"
                style={{ background: `radial-gradient(circle at 70% 40%, ${slide.accent} 0%, transparent 65%)` }}
            />
            <div
                className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-10"
                style={{ background: slide.accent }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-24 pt-36">
                {/* Text side */}
                <div key={`text-${animKey}`}>
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
                        style={{
                            background: `${slide.accent}15`,
                            borderColor: `${slide.accent}30`,
                            color: slide.accent,
                            animation: 'fadeSlideLeft 0.7s ease forwards'
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accent }} />
                        {slide.tag}
                    </div>

                    <h1
                        className="text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.95] mb-6 whitespace-pre-line"
                        style={{ fontFamily: '"Playfair Display", serif', animation: 'fadeSlideLeft 0.7s ease 0.1s both' }}
                    >
                        {slide.heading}
                    </h1>

                    <p
                        className="text-white/50 text-lg max-w-md mb-10 leading-relaxed"
                        style={{ animation: 'fadeSlideLeft 0.7s ease 0.2s both' }}
                    >
                        {slide.sub}
                    </p>

                    <div className="flex items-center gap-4" style={{ animation: 'fadeSlideLeft 0.7s ease 0.3s both' }}>
                        <Link
                            to={slide.ctaPath}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            style={{
                                background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                                boxShadow: `0 8px 32px ${slide.accent}40`
                            }}
                        >
                            {slide.cta}
                            <i className="ri-arrow-right-line" />
                        </Link>
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
                        >
                            View All
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-8 mt-12" style={{ animation: 'fadeSlideLeft 0.7s ease 0.4s both' }}>
                        {[['100+', 'Brands'], ['4', 'Floors'], ['10K+', 'Products']].map(([num, label]) => (
                            <div key={label}>
                                <div className="text-2xl font-black text-white">{num}</div>
                                <div className="text-xs text-white/30 tracking-wider uppercase">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image side */}
                <div key={`img-${animKey}`} className="relative flex justify-center" style={{ animation: 'fadeSlideRight 0.8s ease 0.1s both' }}>
                    {/* Decorative ring */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border opacity-20 animate-[spin_20s_linear_infinite]"
                        style={{ borderColor: slide.accent }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border opacity-10 animate-[spin_30s_linear_infinite_reverse]"
                        style={{ borderColor: slide.accent, borderStyle: 'dashed' }}
                    />

                    {/* Floating badge */}
                    <div
                        className="absolute top-8 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-white text-sm font-medium"
                        style={{ animation: 'float 3s ease-in-out infinite' }}
                    >
                        <div className="text-xs text-white/50 mb-0.5">Today's Deal</div>
                        <div className="text-lg font-black" style={{ color: slide.accent }}>−20%</div>
                    </div>

                    {/* Main image */}
                    <div className="relative z-10">
                        <div
                            className="absolute inset-0 blur-2xl opacity-40 rounded-full scale-75"
                            style={{ background: slide.accent }}
                        />
                        <img
                            src={bannerImg}
                            alt="Fashion Model"
                            className="relative z-10 max-h-[520px] w-auto object-contain drop-shadow-2xl"
                            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
                        />
                    </div>
                </div>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {slides.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                        style={i === current ? { background: slide.accent } : {}}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/20 text-xs tracking-widest uppercase">
                <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
                Scroll
            </div>

            <style>{`
                @keyframes fadeSlideLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeSlideRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </section>
    )
}

export default Banner
