import React from 'react'
import { Link } from 'react-router-dom'

const posts = [
    {
        tag: 'Timeless Elegance',
        title: 'Mastering the Art of Capsule Wardrobes',
        date: '12th August 2022',
        img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
        readTime: '4 min read',
    },
    {
        tag: 'Summer Breeze',
        title: 'Unveiling the Hottest Beachwear Trends',
        date: '18th January 2023',
        img: 'https://images.unsplash.com/photo-1700159017572-de76bb0c5719?q=80&w=800&auto=format&fit=crop',
        readTime: '3 min read',
    },
    {
        tag: 'Power Dressing',
        title: "Navigating the World of Women's Tailoring",
        date: '5th January 2025',
        img: 'https://plus.unsplash.com/premium_photo-1682142715511-27bfbfdc044f?q=80&w=800&auto=format&fit=crop',
        readTime: '5 min read',
    },
    {
        tag: 'New York Times',
        title: "The World's Best Fashion Fair 2025",
        date: '25th May 2025',
        img: 'https://plus.unsplash.com/premium_photo-1713720663924-4e3fe8f20f79?q=80&w=800&auto=format&fit=crop',
        readTime: '6 min read',
    },
]

const Blogs = () => {
    return (
        <section className="py-20 bg-[#111111]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs tracking-[0.3em] uppercase text-[#ed3849] font-semibold">Style Journal</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Latest from Blog
                        </h2>
                    </div>
                    <Link to="#" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors duration-300 group">
                        All Articles
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {posts.map((post, i) => (
                        <article
                            key={i}
                            className="group bg-white/3 rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                                />
                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-[#ed3849] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#ed3849]/30">
                                    {post.tag}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-white font-semibold text-base leading-snug mb-3 line-clamp-2 group-hover:text-[#ed3849] transition-colors duration-300"
                                    style={{ fontFamily: '"Playfair Display", serif' }}>
                                    {post.title}
                                </h3>
                                <div className="flex items-center justify-between text-white/25 text-xs">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1">
                                        <i className="ri-time-line" />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blogs
