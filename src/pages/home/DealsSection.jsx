import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dealsImg from '../../assets/deals.png'

const getTimeLeft = () => {
    // Count down to end of month
    const now = new Date()
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0)
    const diff = Math.max(0, end - now)
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
    }
}

const CountdownUnit = ({ value, label, accent = '#ed3849' }) => (
    <div className="flex flex-col items-center">
        <div
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
            {/* Top and bottom "flip" decorators */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-black/30" />
            <span
                className="text-3xl md:text-4xl font-black tabular-nums leading-none"
                style={{ color: accent, fontFamily: '"Playfair Display", serif' }}
            >
                {String(value).padStart(2, '0')}
            </span>
        </div>
        <span className="text-white/30 text-xs tracking-widest uppercase mt-2">{label}</span>
    </div>
)

const DealsSection = () => {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft())

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-20 bg-[#111111] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a0508] to-[#0d0d0d] border border-white/5">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"
                        style={{ background: 'radial-gradient(circle, #ed3849 0%, transparent 70%)' }}
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-10 md:p-16">
                        {/* Image side */}
                        <div className="relative flex justify-center order-2 lg:order-1">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ed3849]/10 blur-2xl rounded-full" />
                            <img
                                src={dealsImg}
                                alt="Deals"
                                className="relative z-10 max-h-[420px] w-auto object-contain drop-shadow-2xl"
                                style={{ filter: 'drop-shadow(0 10px 40px rgba(237,56,73,0.2))' }}
                            />
                        </div>

                        {/* Content side */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
                                style={{ background: '#ed384915', borderColor: '#ed384930', color: '#ed3849' }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ed3849] animate-pulse" />
                                Limited Time Offer
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3"
                                style={{ fontFamily: '"Playfair Display", serif' }}>
                                Deals of the Month
                            </h2>

                            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md">
                                Discover handpicked fashion deals across clothing, accessories, and footwear. 
                                Up to <span className="text-[#ed3849] font-semibold">20% off</span> on premium collections — don't miss out.
                            </p>

                            {/* Countdown */}
                            <div className="flex items-center gap-3 md:gap-4 mb-10">
                                <CountdownUnit value={timeLeft.days} label="Days" />
                                <div className="text-white/20 text-2xl font-black pb-5">:</div>
                                <CountdownUnit value={timeLeft.hours} label="Hours" />
                                <div className="text-white/20 text-2xl font-black pb-5">:</div>
                                <CountdownUnit value={timeLeft.mins} label="Mins" />
                                <div className="text-white/20 text-2xl font-black pb-5">:</div>
                                <CountdownUnit value={timeLeft.secs} label="Secs" accent="#f59e0b" />
                            </div>

                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#ed3849] hover:bg-[#d23141] text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#ed3849]/30 hover:-translate-y-0.5"
                            >
                                <i className="ri-flashlight-line" />
                                Shop the Deals
                                <i className="ri-arrow-right-line" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DealsSection
