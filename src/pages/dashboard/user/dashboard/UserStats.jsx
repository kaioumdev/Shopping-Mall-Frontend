import React from 'react'

const UserStats = ({ stats }) => {
    const cards = [
        {
            label: 'Total Payments',
            value: `$${stats?.totalPayments ?? 0}`,
            icon: 'ri-bank-card-line',
            accent: '#10b981',
            bg: 'rgba(16,185,129,0.1)',
            border: 'rgba(16,185,129,0.2)',
        },
        {
            label: 'Total Reviews',
            value: stats?.totalReviews ?? 0,
            icon: 'ri-star-line',
            accent: '#f59e0b',
            bg: 'rgba(245,158,11,0.1)',
            border: 'rgba(245,158,11,0.2)',
        },
        {
            label: 'Purchased Products',
            value: stats?.totalPurchadedProducts ?? 0,
            icon: 'ri-shopping-bag-3-line',
            accent: '#8b5cf6',
            bg: 'rgba(139,92,246,0.1)',
            border: 'rgba(139,92,246,0.2)',
        },
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
            {cards.map((card, i) => (
                <div key={i}
                    className='p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5'
                    style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                    <div className='w-11 h-11 rounded-xl flex items-center justify-center mb-4'
                        style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                        <i className={`${card.icon} text-xl`} style={{ color: card.accent }} />
                    </div>
                    <p className='text-white/40 text-xs mb-1'>{card.label}</p>
                    <p className='text-white font-black text-2xl' style={{ fontFamily: '"Playfair Display", serif' }}>
                        {card.value}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default UserStats
