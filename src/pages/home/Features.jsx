import React from 'react'

const features = [
    {
        icon: 'ri-truck-line',
        title: 'Free Delivery',
        desc: 'Free shipping on all orders above $50. Fast & reliable delivery to your doorstep.',
        accent: '#ed3849',
    },
    {
        icon: 'ri-shield-check-line',
        title: '100% Authentic',
        desc: 'Every product is verified genuine. Shop with full confidence and peace of mind.',
        accent: '#8b5cf6',
    },
    {
        icon: 'ri-money-dollar-circle-line',
        title: 'Money Back Guarantee',
        desc: 'Not satisfied? Get a full refund within 30 days — no questions asked.',
        accent: '#10b981',
    },
    {
        icon: 'ri-customer-service-2-line',
        title: '24/7 Support',
        desc: 'Our dedicated support team is always here to help you with any queries or issues.',
        accent: '#f59e0b',
    },
]

const Features = () => {
    return (
        <section className="py-16 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top divider */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-white/20 text-xs tracking-widest uppercase px-4">Why Choose Lebaba</span>
                    <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group relative p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: `${feature.accent}15`, border: `1px solid ${feature.accent}20` }}
                            >
                                <i className={`${feature.icon} text-xl`} style={{ color: feature.accent }} />
                            </div>

                            <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                            <p className="text-white/35 text-sm leading-relaxed">{feature.desc}</p>

                            {/* Hover glow */}
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
