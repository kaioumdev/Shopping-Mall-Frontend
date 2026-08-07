import React from 'react'
import { Link } from 'react-router-dom'
import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import category4 from '../../assets/category-4.jpg'

const categories = [
    { id: 1, name: 'Accessories', path: 'accessories', image: category1, tag: '250+ Items', icon: 'ri-handbag-line' },
    { id: 2, name: 'Dress Collection', path: 'dress', image: category2, tag: '400+ Items', icon: 'ri-t-shirt-line' },
    { id: 3, name: 'Jewellery', path: 'jewellery', image: category3, tag: '180+ Items', icon: 'ri-gem-line' },
    { id: 4, name: 'Cosmetics', path: 'cosmetics', image: category4, tag: '300+ Items', icon: 'ri-magic-line' },
]

const Categories = () => {
    return (
        <section className="py-20 bg-[#111111]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-xs tracking-[0.3em] uppercase text-[#ed3849] font-semibold">
                        Shop by Category
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Our Collections
                    </h2>
                    <p className="text-white/40 text-sm max-w-md mx-auto">Find exactly what you're looking for across our curated fashion categories</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat, index) => (
                        <Link
                            key={cat.id}
                            to={`/categories/${cat.path}`}
                            className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Image */}
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                            {/* Corner badge */}
                            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                                <i className={`${cat.icon} text-[#ed3849] text-sm`} />
                                <span className="text-white/70 text-xs">{cat.tag}</span>
                            </div>

                            {/* Bottom content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {cat.name}
                                </h3>
                                <div className="flex items-center gap-1.5 text-[#ed3849] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span>Explore</span>
                                    <i className="ri-arrow-right-line" />
                                </div>
                            </div>

                            {/* Hover border glow */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-[#ed3849]/0 group-hover:border-[#ed3849]/30 transition-all duration-500" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories
