import React from 'react'
import { Link } from 'react-router-dom'

const outlets = [
    {
        id: 1,
        floor: 'Ground Floor',
        name: 'Fashion Avenue',
        description: 'Latest trends in clothing & apparel for every style',
        icon: 'ri-t-shirt-line',
        color: 'from-rose-500 to-pink-600',
        accent: '#ed3849',
        path: '/categories/dress',
        badge: '40+ Stores',
        tag: 'Most Popular',
    },
    {
        id: 2,
        floor: 'Level 1',
        name: 'Jewels & Gems',
        description: 'Exquisite jewellery and luxury accessories',
        icon: 'ri-gem-line',
        color: 'from-amber-500 to-yellow-600',
        accent: '#f59e0b',
        path: '/categories/jewellery',
        badge: '20+ Stores',
        tag: 'Premium',
    },
    {
        id: 3,
        floor: 'Level 2',
        name: 'Beauty Hub',
        description: 'Cosmetics, skincare & wellness brands',
        icon: 'ri-magic-line',
        color: 'from-purple-500 to-violet-600',
        accent: '#8b5cf6',
        path: '/categories/cosmetics',
        badge: '30+ Brands',
        tag: 'Trending',
    },
    {
        id: 4,
        floor: 'Level 3',
        name: 'Accessories World',
        description: 'Bags, belts, scarves & more — all in one place',
        icon: 'ri-handbag-line',
        color: 'from-teal-500 to-cyan-600',
        accent: '#14b8a6',
        path: '/categories/accessories',
        badge: '25+ Stores',
        tag: 'New Arrivals',
    },
]

const MallOutlets = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-14">
                    <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#ed3849] font-semibold mb-3">
                        Mall Directory
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Explore Our Outlets
                    </h2>
                    <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
                        Four floors of curated shopping experiences. Each outlet crafted to offer the finest products in its category.
                    </p>
                </div>

                {/* Outlet grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {outlets.map((outlet, index) => (
                        <Link
                            key={outlet.id}
                            to={outlet.path}
                            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                boxShadow: 'hover' ? undefined : `0 0 40px ${outlet.accent}10`,
                            }}
                        >
                            {/* Gradient top bar */}
                            <div className={`h-1 w-full bg-gradient-to-r ${outlet.color}`} />

                            <div className="p-6">
                                {/* Floor label + tag */}
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-xs text-white/30 tracking-wider uppercase">{outlet.floor}</span>
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                        style={{ background: `${outlet.accent}20`, color: outlet.accent }}
                                    >
                                        {outlet.tag}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${outlet.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <i className={`${outlet.icon} text-2xl text-white`} />
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                                    {outlet.name}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-5">
                                    {outlet.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/20">{outlet.badge}</span>
                                    <span
                                        className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all duration-300"
                                        style={{ color: outlet.accent }}
                                    >
                                        Visit <i className="ri-arrow-right-line" />
                                    </span>
                                </div>
                            </div>

                            {/* Hover glow effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                style={{ background: `radial-gradient(circle at 50% 0%, ${outlet.accent}08 0%, transparent 70%)` }}
                            />
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#ed3849] hover:bg-[#d23141] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#ed3849]/30 hover:-translate-y-0.5"
                    >
                        <i className="ri-store-line" />
                        Browse All Products
                        <i className="ri-arrow-right-line" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default MallOutlets
