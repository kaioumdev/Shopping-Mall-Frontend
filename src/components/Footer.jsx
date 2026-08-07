import React from 'react'
import { Link } from 'react-router-dom'
import instaImg1 from '../assets/instagram-1.jpg'
import instaImg2 from '../assets/instagram-2.jpg'
import instaImg3 from '../assets/instagram-3.jpg'
import instaImg4 from '../assets/instagram-4.jpg'
import instaImg5 from '../assets/instagram-5.jpg'
import instaImg6 from '../assets/instagram-6.jpg'

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/5">
            {/* Main footer grid */}
            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand column */}
                <div>
                    <h2 className="text-2xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Lebaba<span className="text-[#ed3849]">.</span>
                    </h2>
                    <p className="text-white/35 text-sm leading-relaxed mb-5">
                        Your ultimate shopping destination. Four floors of curated fashion, jewellery, beauty, and more.
                    </p>
                    <div className="flex items-center gap-3">
                        {[
                            { icon: 'ri-instagram-line', label: 'Instagram' },
                            { icon: 'ri-facebook-circle-line', label: 'Facebook' },
                            { icon: 'ri-twitter-x-line', label: 'Twitter' },
                            { icon: 'ri-youtube-line', label: 'YouTube' },
                        ].map(({ icon, label }) => (
                            <a
                                key={label}
                                href="#"
                                aria-label={label}
                                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ed3849] flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
                            >
                                <i className={`${icon} text-sm`} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Company</h4>
                    <ul className="space-y-2.5">
                        {['Home', 'About Us', 'Work With Us', 'Our Blog', 'Terms & Conditions'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Home' ? '/' : '#'}
                                    className="text-white/40 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <i className="ri-arrow-right-s-line text-[#ed3849] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Useful Links */}
                <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Quick Links</h4>
                    <ul className="space-y-2.5">
                        {['Help & Support', 'Track My Order', 'Men', 'Women', 'Dresses'].map((item) => (
                            <li key={item}>
                                <Link to="#" className="text-white/40 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                                    <i className="ri-arrow-right-s-line text-[#ed3849] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instagram grid */}
                <div>
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Instagram</h4>
                    <div className="grid grid-cols-3 gap-1.5">
                        {[instaImg1, instaImg2, instaImg3, instaImg4, instaImg5, instaImg6].map((img, i) => (
                            <a key={i} href="#" className="block overflow-hidden rounded-lg aspect-square group" aria-label={`Instagram post ${i + 1}`}>
                                <img
                                    src={img}
                                    alt={`Instagram ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact strip */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/25">
                    <div className="flex flex-wrap items-center gap-6">
                        <span className="flex items-center gap-2">
                            <i className="ri-map-pin-2-fill text-[#ed3849]" />
                            123 London Bridge Street, London
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="ri-mail-fill text-[#ed3849]" />
                            support@Lebaba.com
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="ri-phone-fill text-[#ed3849]" />
                            (+012) 3456 789
                        </span>
                    </div>
                    <p>© 2025 Lebaba Shopping Mall. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
