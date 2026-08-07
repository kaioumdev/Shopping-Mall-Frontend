import React from 'react'

const AdminStats = ({ stats }) => {
    const cards = [
        {
            label: 'Total Earnings',
            value: `$${stats?.totalEarnings?.toFixed(2) ?? '0.00'}`,
            icon: 'ri-money-dollar-circle-line',
            accent: '#10b981',
            bg: 'rgba(16,185,129,0.1)',
            border: 'rgba(16,185,129,0.2)',
        },
        {
            label: 'Total Orders',
            value: stats?.totalOrders ?? 0,
            icon: 'ri-file-list-3-line',
            accent: '#3b82f6',
            bg: 'rgba(59,130,246,0.1)',
            border: 'rgba(59,130,246,0.2)',
        },
        {
            label: 'Total Users',
            value: stats?.totalUsers ?? 0,
            icon: 'ri-group-line',
            accent: '#8b5cf6',
            bg: 'rgba(139,92,246,0.1)',
            border: 'rgba(139,92,246,0.2)',
        },
        {
            label: 'Total Products',
            value: stats?.totalProducts ?? 0,
            icon: 'ri-box-3-line',
            accent: '#f59e0b',
            bg: 'rgba(245,158,11,0.1)',
            border: 'rgba(245,158,11,0.2)',
        },
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8'>
            {cards.map((card, i) => (
                <div key={i}
                    className='p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5'
                    style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                    <div className='flex items-center justify-between mb-4'>
                        <div className='w-11 h-11 rounded-xl flex items-center justify-center'
                            style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                            <i className={`${card.icon} text-xl`} style={{ color: card.accent }} />
                        </div>
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

export default AdminStats
