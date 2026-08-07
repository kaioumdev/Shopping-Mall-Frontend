import React from 'react'
import { Pie, Line } from 'react-chartjs-2'
import 'chart.js/auto'

const AdminStatsChart = ({ stats }) => {
    const pieData = {
        labels: ['Orders', 'Products', 'Reviews', 'Users'],
        datasets: [{
            data: [
                stats?.totalOrders ?? 0,
                stats?.totalProducts ?? 0,
                stats?.totalReviews ?? 0,
                stats?.totalUsers ?? 0,
            ],
            backgroundColor: ['rgba(237,56,73,0.8)', 'rgba(59,130,246,0.8)', 'rgba(245,158,11,0.8)', 'rgba(139,92,246,0.8)'],
            borderColor: ['#0d0d0d', '#0d0d0d', '#0d0d0d', '#0d0d0d'],
            borderWidth: 2,
            hoverOffset: 6,
        }],
    }

    const earningsData = new Array(12).fill(0)
    stats?.monthlyEarnings?.forEach(entry => {
        earningsData[entry.month - 1] = entry.earnings
    })

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Earnings ($)',
            data: earningsData,
            fill: true,
            backgroundColor: 'rgba(237,56,73,0.07)',
            borderColor: '#ed3849',
            borderWidth: 2,
            pointBackgroundColor: '#ed3849',
            pointBorderColor: '#111',
            pointBorderWidth: 2,
            pointRadius: 4,
            tension: 0.4,
        }],
    }

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: 'rgba(255,255,255,0.5)', font: { size: 12 }, padding: 16, boxWidth: 12, borderRadius: 3 },
            },
        },
    }

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'rgba(255,255,255,0.5)', font: { size: 12 }, boxWidth: 12 } },
        },
        scales: {
            x: {
                ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 11 } },
                grid: { color: 'rgba(255,255,255,0.04)' },
                border: { color: 'rgba(255,255,255,0.05)' },
            },
            y: {
                ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 11 } },
                grid: { color: 'rgba(255,255,255,0.04)' },
                border: { color: 'rgba(255,255,255,0.05)' },
            },
        },
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <div className='rounded-2xl border border-white/5 p-6' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className='text-white font-semibold text-sm mb-5'>Stats Distribution</h3>
                <div style={{ height: '260px' }}>
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>

            <div className='rounded-2xl border border-white/5 p-6' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className='text-white font-semibold text-sm mb-5'>Monthly Earnings</h3>
                <div style={{ height: '260px' }}>
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>
        </div>
    )
}

export default AdminStatsChart
