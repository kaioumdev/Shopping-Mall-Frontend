import React from 'react'
import { Link } from 'react-router-dom'
import card1 from '../../assets/card-1.png'
import card2 from '../../assets/card-2.png'
import card3 from '../../assets/card-3.png'

const trendItems = [
    {
        id: 1,
        season: '2026 Trend',
        title: "Women's Shirts",
        sub: 'Elegant & casual styles',
        image: card1,
        path: '/categories/dress',
        accentColor: '#ed3849',
    },
    {
        id: 2,
        season: '2026 Trend',
        title: "Women's Dresses",
        sub: 'From formal to festive',
        image: card2,
        path: '/categories/dress',
        accentColor: '#8b5cf6',
        featured: true,
    },
    {
        id: 3,
        season: '2026 Trend',
        title: "Women's Casuals",
        sub: 'Comfort meets fashion',
        image: card3,
        path: '/categories/dress',
        accentColor: '#f59e0b',
    },
]

const Trends = () => {
    return (
        <section className="py-20 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs tracking-[0.3em] uppercase text-[#ed3849] font-semibold">
                            What's Hot
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Latest Trends
                        </h2>
                    </div>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors duration-300 group"
                    >
                        View All Trends
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {trendItems.map((item, i) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`group relative overflow-hidden rounded-2xl block ${item.featured ? 'md:row-span-1' : ''}`}
                        >
                            {/* Background image */}
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.featured ? 'h-[420px]' : 'h-80'}`}
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                {/* Season badge */}
                                <div
                                    className="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                                    style={{ background: `${item.accentColor}20`, color: item.accentColor, border: `1px solid ${item.accentColor}40` }}
                                >
                                    {item.season}
                                </div>

                                {/* Featured badge */}
                                {item.featured && (
                                    <div className="absolute top-4 right-4 bg-[#ed3849] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                        Featured
                                    </div>
                                )}

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white font-bold text-2xl mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-white/50 text-sm mb-3">{item.sub}</p>
                                    <div
                                        className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                                        style={{ color: item.accentColor }}
                                    >
                                        Discover More
                                        <i className="ri-arrow-right-line" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Trends
