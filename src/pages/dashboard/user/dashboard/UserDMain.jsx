import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi'
import Loading from '../../../../components/Loading'
import UserStats from './UserStats'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDMain = () => {
    const { user } = useSelector(state => state.auth)
    const { data: UserData, isLoading, error } = useGetUserStatsQuery(user?.email)

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Failed to load your stats</p>
        </div>
    )

    const stats = UserData?.data || {}
    const { totalPayments, totalPurchadedProducts, totalReviews } = stats

    const barData = {
        labels: ['Total Payment ($)', 'Reviews', 'Purchased Products'],
        datasets: [{
            label: 'My Activity',
            data: [totalPayments ?? 0, totalReviews ?? 0, totalPurchadedProducts ?? 0],
            backgroundColor: ['rgba(237,56,73,0.6)', 'rgba(245,158,11,0.6)', 'rgba(139,92,246,0.6)'],
            borderColor: ['#ed3849', '#f59e0b', '#8b5cf6'],
            borderWidth: 1.5,
            borderRadius: 8,
        }],
    }

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'rgba(255,255,255,0.5)', font: { size: 12 }, boxWidth: 12 } },
            tooltip: {
                callbacks: {
                    label: (item) => {
                        if (item.label === 'Total Payment ($)') return `Total Payments: $${item.raw}`
                        return `${item.label}: ${item.raw}`
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 12 } },
                grid: { color: 'rgba(255,255,255,0.04)' },
                border: { color: 'rgba(255,255,255,0.05)' },
            },
            y: {
                ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 12 } },
                grid: { color: 'rgba(255,255,255,0.04)' },
                border: { color: 'rgba(255,255,255,0.05)' },
            },
        },
    }

    return (
        <div>
            {/* Page header */}
            <div className='mb-8'>
                <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Account</p>
                <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                    My Dashboard
                </h1>
                <p className='text-white/40 text-sm mt-1.5'>
                    Hello, <span className='text-white font-semibold'>{user?.username}</span>! Here's your activity summary.
                </p>
            </div>

            {/* Stats */}
            <UserStats stats={stats} />

            {/* Chart */}
            <div className='rounded-2xl border border-white/5 p-6' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className='text-white font-semibold text-sm mb-5'>Activity Overview</h3>
                <div style={{ height: '280px' }}>
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    )
}

export default UserDMain
