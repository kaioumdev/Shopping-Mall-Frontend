import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { getBaseUrl } from '../../utils/getBaseUrl'

const contactInfo = [
    {
        icon: 'ri-map-pin-2-fill',
        label: 'Visit Us',
        value: '123, London Bridge Street, London',
        sub: 'Mon–Sat: 10:00 AM – 9:00 PM',
        accent: '#ed3849',
        bg: '#ed384915',
        border: '#ed384930',
    },
    {
        icon: 'ri-mail-fill',
        label: 'Email Us',
        value: 'support@ShoppingMall.com',
        sub: 'We reply within 24 hours',
        accent: '#8b5cf6',
        bg: '#8b5cf615',
        border: '#8b5cf630',
    },
    {
        icon: 'ri-phone-fill',
        label: 'Call Us',
        value: '(+012) 3456 789',
        sub: 'Available 24/7 for support',
        accent: '#10b981',
        bg: '#10b98115',
        border: '#10b98130',
    },
    {
        icon: 'ri-time-fill',
        label: 'Working Hours',
        value: 'Mon – Sat: 10AM – 9PM',
        sub: 'Sunday: 11AM – 7PM',
        accent: '#f59e0b',
        bg: '#f59e0b15',
        border: '#f59e0b30',
    },
]

const subjects = [
    'General Inquiry',
    'Order Support',
    'Return & Refund',
    'Product Question',
    'Partnership',
    'Other',
]

const ContactPage = () => {
    const [submitState, setSubmitState] = useState('idle') // idle | loading | success | error
    const [serverMessage, setServerMessage] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setSubmitState('loading')
        setServerMessage('')
        try {
            const response = await axios.post(`${getBaseUrl()}/api/contact`, data)
            if (response.data.success) {
                setSubmitState('success')
                setServerMessage(response.data.message)
                reset()
            } else {
                setSubmitState('error')
                setServerMessage(response.data.message || 'Something went wrong.')
            }
        } catch (err) {
            setSubmitState('error')
            setServerMessage(
                err?.response?.data?.message || 'Failed to send message. Please try again.'
            )
        }
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d]">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-[#1a0508] via-[#0d0d0d] to-[#0d0d0d] border-b border-white/5 pt-24 pb-14 px-4">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="absolute left-0 top-0 w-[500px] h-full bg-gradient-to-r from-[#ed3849]/8 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/30 mb-5">
                        <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
                        <i className="ri-arrow-right-s-line" />
                        <span className="text-white/60">Contact</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
                        style={{ background: '#ed384915', borderColor: '#ed384930', color: '#ed3849' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ed3849] animate-pulse" />
                        We're here to help
                    </div>

                    <h1
                        className="text-5xl md:text-6xl font-black text-white mb-3"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Get in Touch
                    </h1>
                    <p className="text-white/40 text-sm max-w-md leading-relaxed">
                        Have a question, feedback or need support? Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>
            </div>

            {/* Contact info cards */}
            <div className="max-w-7xl mx-auto px-4 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-14">
                    {contactInfo.map((info, i) => (
                        <div
                            key={i}
                            className="group p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                borderColor: 'rgba(255,255,255,0.06)',
                            }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                                style={{ background: info.bg, border: `1px solid ${info.border}` }}
                            >
                                <i className={`${info.icon} text-lg`} style={{ color: info.accent }} />
                            </div>
                            <p className="text-white/30 text-xs mb-1">{info.label}</p>
                            <p className="text-white font-semibold text-sm mb-0.5">{info.value}</p>
                            <p className="text-white/25 text-xs">{info.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main grid: form + map/extra */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Form — wider */}
                    <div className="lg:col-span-3">
                        <div
                            className="rounded-3xl border border-white/5 overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            {/* Form header */}
                            <div className="px-8 pt-8 pb-6 border-b border-white/5">
                                <h2
                                    className="text-2xl font-black text-white mb-1"
                                    style={{ fontFamily: '"Playfair Display", serif' }}
                                >
                                    Send a Message
                                </h2>
                                <p className="text-white/35 text-sm">
                                    Fill in the form below and we'll respond within 24 hours.
                                </p>
                            </div>

                            {/* Success state */}
                            {submitState === 'success' && (
                                <div className="mx-8 mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                                    <i className="ri-checkbox-circle-fill text-green-400 text-xl mt-0.5" />
                                    <div>
                                        <p className="text-green-400 font-semibold text-sm">Message sent!</p>
                                        <p className="text-green-400/70 text-xs mt-0.5">{serverMessage}</p>
                                    </div>
                                </div>
                            )}

                            {/* Error state */}
                            {submitState === 'error' && (
                                <div className="mx-8 mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                                    <i className="ri-error-warning-fill text-[#ed3849] text-xl mt-0.5" />
                                    <div>
                                        <p className="text-[#ed3849] font-semibold text-sm">Failed to send</p>
                                        <p className="text-[#ed3849]/70 text-xs mt-0.5">{serverMessage}</p>
                                    </div>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8 space-y-5">
                                {/* Name + Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-white/60 text-xs font-medium mb-2 tracking-wide">
                                            Full Name <span className="text-[#ed3849]">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-sm placeholder-white/20 focus:outline-none transition-all duration-200 ${
                                                errors.name
                                                    ? 'border-[#ed3849]/60 focus:border-[#ed3849]'
                                                    : 'border-white/10 focus:border-[#ed3849]/50'
                                            }`}
                                            {...register('name', {
                                                required: 'Name is required',
                                                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                                                maxLength: { value: 100, message: 'Name must be under 100 characters' },
                                            })}
                                        />
                                        {errors.name && (
                                            <p className="text-[#ed3849] text-xs mt-1.5 flex items-center gap-1">
                                                <i className="ri-error-warning-line" />
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-white/60 text-xs font-medium mb-2 tracking-wide">
                                            Email Address <span className="text-[#ed3849]">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-sm placeholder-white/20 focus:outline-none transition-all duration-200 ${
                                                errors.email
                                                    ? 'border-[#ed3849]/60 focus:border-[#ed3849]'
                                                    : 'border-white/10 focus:border-[#ed3849]/50'
                                            }`}
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^\S+@\S+\.\S+$/,
                                                    message: 'Enter a valid email address',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="text-[#ed3849] text-xs mt-1.5 flex items-center gap-1">
                                                <i className="ri-error-warning-line" />
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Subject dropdown */}
                                <div>
                                    <label htmlFor="subject" className="block text-white/60 text-xs font-medium mb-2 tracking-wide">
                                        Subject <span className="text-[#ed3849]">*</span>
                                    </label>
                                    <select
                                        id="subject"
                                        className={`w-full px-4 py-3 bg-[#1a1a1a] border rounded-xl text-sm focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
                                            errors.subject
                                                ? 'border-[#ed3849]/60 text-white focus:border-[#ed3849]'
                                                : 'border-white/10 text-white focus:border-[#ed3849]/50'
                                        }`}
                                        style={{ backgroundImage: 'none' }}
                                        {...register('subject', { required: 'Please select a subject' })}
                                        defaultValue=""
                                    >
                                        <option value="" disabled className="text-white/30 bg-[#1a1a1a]">
                                            Select a subject...
                                        </option>
                                        {subjects.map((s) => (
                                            <option key={s} value={s} className="bg-[#1a1a1a] text-white">
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.subject && (
                                        <p className="text-[#ed3849] text-xs mt-1.5 flex items-center gap-1">
                                            <i className="ri-error-warning-line" />
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-white/60 text-xs font-medium mb-2 tracking-wide">
                                        Message <span className="text-[#ed3849]">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="6"
                                        placeholder="Write your message here..."
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-sm placeholder-white/20 focus:outline-none transition-all duration-200 resize-none ${
                                            errors.message
                                                ? 'border-[#ed3849]/60 focus:border-[#ed3849]'
                                                : 'border-white/10 focus:border-[#ed3849]/50'
                                        }`}
                                        {...register('message', {
                                            required: 'Message is required',
                                            minLength: { value: 10, message: 'Message must be at least 10 characters' },
                                            maxLength: { value: 2000, message: 'Message must be under 2000 characters' },
                                        })}
                                    />
                                    {errors.message && (
                                        <p className="text-[#ed3849] text-xs mt-1.5 flex items-center gap-1">
                                            <i className="ri-error-warning-line" />
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={submitState === 'loading'}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#ed3849] hover:bg-[#d23141] disabled:bg-[#ed3849]/40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#ed3849]/25 hover:-translate-y-0.5 disabled:translate-y-0"
                                >
                                    {submitState === 'loading' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <i className="ri-send-plane-2-fill text-lg" />
                                            Send Message
                                            <i className="ri-arrow-right-line" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right side info panel */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* FAQ quick links */}
                        <div
                            className="rounded-3xl border border-white/5 p-6"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                                Quick Help
                            </h3>
                            <p className="text-white/30 text-xs mb-5">Common topics you might be looking for</p>

                            {[
                                { icon: 'ri-truck-line', label: 'Track My Order', desc: 'Check real-time order status', path: '/dashboard/orders', color: '#ed3849' },
                                { icon: 'ri-refresh-line', label: 'Returns & Refunds', desc: '30-day hassle-free returns', path: '/dashboard/orders', color: '#8b5cf6' },
                                { icon: 'ri-bank-card-line', label: 'Payment Issues', desc: 'View payment history', path: '/dashboard/payments', color: '#10b981' },
                                { icon: 'ri-star-line', label: 'Leave a Review', desc: 'Share your experience', path: '/dashboard/reviews', color: '#f59e0b' },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    to={item.path}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group mb-1"
                                >
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                                    >
                                        <i className={`${item.icon} text-sm`} style={{ color: item.color }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{item.label}</p>
                                        <p className="text-white/25 text-xs truncate">{item.desc}</p>
                                    </div>
                                    <i className="ri-arrow-right-s-line text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all duration-200" />
                                </Link>
                            ))}
                        </div>

                        {/* Social media */}
                        <div
                            className="rounded-3xl border border-white/5 p-6"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                                Follow Us
                            </h3>
                            <p className="text-white/30 text-xs mb-5">Stay connected on social media</p>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: 'ri-instagram-line', label: 'Instagram', handle: '@ShoppingMall.style', color: '#e1306c' },
                                    { icon: 'ri-facebook-circle-line', label: 'Facebook', handle: 'ShoppingMall Mall', color: '#1877f2' },
                                    { icon: 'ri-twitter-x-line', label: 'Twitter / X', handle: '@ShoppingMall', color: '#ffffff' },
                                    { icon: 'ri-youtube-line', label: 'YouTube', handle: 'ShoppingMall TV', color: '#ff0000' },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-200 group"
                                        style={{ background: 'rgba(255,255,255,0.02)' }}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ background: `${social.color}15` }}
                                        >
                                            <i className={`${social.icon} text-sm`} style={{ color: social.color }} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white/60 text-xs font-medium group-hover:text-white transition-colors truncate">{social.label}</p>
                                            <p className="text-white/20 text-[10px] truncate">{social.handle}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Response time notice */}
                        <div
                            className="rounded-3xl border p-5 flex items-start gap-3"
                            style={{ background: '#ed384908', borderColor: '#ed384920' }}
                        >
                            <i className="ri-shield-check-line text-[#ed3849] text-xl mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-white/70 text-sm font-semibold mb-1">Guaranteed Response</p>
                                <p className="text-white/30 text-xs leading-relaxed">
                                    All messages are reviewed by our team. Expect a reply within <span className="text-white/60">24 business hours</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
