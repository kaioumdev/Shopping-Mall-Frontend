import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetOrdersByEmailQuery } from '../../../../redux/features/orders/orderApi'
import Loading from '../../../../components/Loading'

const statusStyle = (status) => {
    switch (status) {
        case 'completed': return 'bg-green-500/15 text-green-400 border-green-500/25'
        case 'pending':   return 'bg-amber-500/15 text-amber-400 border-amber-500/25'
        case 'processing': return 'bg-blue-500/15 text-blue-400 border-blue-500/25'
        case 'shipped':   return 'bg-purple-500/15 text-purple-400 border-purple-500/25'
        default:          return 'bg-white/10 text-white/50 border-white/10'
    }
}

const UserOrders = () => {
    const { user } = useSelector((state) => state.auth)
    const { data, isLoading, error } = useGetOrdersByEmailQuery(user?.email)

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Failed to load your orders</p>
        </div>
    )

    const orders = data?.data || []

    return (
        <div>
            {/* Page header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Account</p>
                    <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                        My Orders
                    </h1>
                </div>
                <span className='text-sm text-white/40'>{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
            </div>

            {orders.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 rounded-2xl border border-white/5'
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <i className='ri-shopping-bag-3-line text-6xl text-white/10 mb-4' />
                    <p className='text-white/40 font-medium'>No orders yet</p>
                    <p className='text-white/20 text-sm mt-1 mb-5'>Your orders will appear here after checkout</p>
                    <Link to='/shop'
                        className='px-6 py-2.5 bg-[#ed3849] hover:bg-[#d23141] text-white text-sm font-semibold rounded-xl transition-colors duration-200'>
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className='rounded-2xl border border-white/5 overflow-hidden' style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-white/5' style={{ background: 'rgba(255,255,255,0.03)' }}>
                                    <th className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase'>#</th>
                                    <th className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase'>Order ID</th>
                                    <th className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase'>Date</th>
                                    <th className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase'>Status</th>
                                    <th className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase'>Total</th>
                                    <th className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order._id}
                                        className='border-b border-white/5 hover:bg-white/2 transition-colors duration-150 last:border-b-0'
                                        style={{ '--tw-bg-opacity': 1 }}
                                    >
                                        <td className='px-5 py-4 text-white/40 text-sm'>{index + 1}</td>
                                        <td className='px-5 py-4 text-white/70 text-sm font-mono'>
                                            <span className='max-w-[130px] block truncate'>{order?._id}</span>
                                        </td>
                                        <td className='px-5 py-4 text-white/60 text-sm'>
                                            {new Date(order?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className='px-5 py-4'>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusStyle(order?.status)}`}>
                                                {order?.status}
                                            </span>
                                        </td>
                                        <td className='px-5 py-4 text-white font-semibold text-sm'>
                                            ${order?.amount?.toFixed(2)}
                                        </td>
                                        <td className='px-5 py-4'>
                                            <Link to={`/orders/${order._id}`}
                                                className='inline-flex items-center gap-1 text-xs font-semibold text-[#ed3849] hover:text-white bg-[#ed3849]/10 hover:bg-[#ed3849] px-3 py-1.5 rounded-lg transition-all duration-200'>
                                                View <i className='ri-arrow-right-line' />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserOrders
