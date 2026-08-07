import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

    if (!user) {
        alert('You must be logged in')
        return <Navigate to='/login' replace />
    }

    const Sidebar = user?.role === 'admin' ? AdminDashboard : UserDashboard

    return (
        <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex' }}>
            {/* Desktop sidebar — sticky, full height */}
            <aside
                className='hidden md:block border-r border-white/5'
                style={{
                    width: '256px',
                    flexShrink: 0,
                    background: '#111111',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                <Sidebar />
            </aside>

            {/* Mobile sidebar overlay */}
            {mobileSidebarOpen && (
                <div className='fixed inset-0 z-50 md:hidden' style={{ display: 'flex' }}>
                    <div className='absolute inset-0 bg-black/70' onClick={() => setMobileSidebarOpen(false)} />
                    <aside
                        className='relative'
                        style={{
                            width: '288px',
                            flexShrink: 0,
                            height: '100%',
                            overflowY: 'auto',
                            background: '#111111',
                            zIndex: 10,
                        }}
                    >
                        <Sidebar />
                    </aside>
                </div>
            )}

            {/* Content area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Mobile top bar */}
                <div className='md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/5' style={{ background: '#111111' }}>
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className='w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all'
                    >
                        <i className='ri-menu-3-line text-xl' />
                    </button>
                    <span className='text-white font-bold text-lg' style={{ fontFamily: '"Playfair Display", serif' }}>
                        ShoppingMall<span className='text-[#ed3849]'>.</span>
                    </span>
                </div>

                <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
