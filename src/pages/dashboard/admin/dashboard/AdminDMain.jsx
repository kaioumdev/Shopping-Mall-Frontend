import React from 'react'
import { useSelector } from 'react-redux'
import AdminStats from './AdminStats'
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi'
import Loading from '../../../../components/Loading'
import AdminStatsChart from './AdminStatsChart'

const AdminDMain = () => {
    const { user } = useSelector(state => state.auth)
    const { data: adminData, isLoading, error } = useGetAdminStatsQuery()

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Failed to load dashboard data</p>
        </div>
    )

    const stats = adminData || {}

    return (
        <div>
            {/* Page header */}
            <div className='mb-8'>
                <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Admin</p>
                <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                    Dashboard Overview
                </h1>
                <p className='text-white/40 text-sm mt-1.5'>
                    Welcome back, <span className='text-white font-semibold'>{user?.username}</span>! Here's what's happening.
                </p>
            </div>

            {/* Stats cards */}
            <AdminStats stats={stats} />

            {/* Charts */}
            <AdminStatsChart stats={stats} />
        </div>
    )
}

export default AdminDMain
