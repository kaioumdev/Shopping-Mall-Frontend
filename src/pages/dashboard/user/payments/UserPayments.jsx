import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../../redux/features/orders/orderApi'
import Loading from '../../../../components/Loading'

const statusStyle = (status) => {
    switch (status) {
        case 'completed':  return 'bg-green-500/15 text-green-400 border-green-500/25'
        case 'pending':    return 'bg-amber-500/15 text-amber-400 border-amber-500/25'
        case 'processing': return 'bg-blue-500/15 text-blue-400 border-blue-500/25'
        case 'shipped':    return 'bg-purple-500/15 text-purple-400 border-purple-500/25'
        default:           return 'bg-white/10 text-white/50 border-white/10'
    }
}

const UserPayments = () => {
    const { user } = useSelector(state => state.auth)
    const { data, isLoading, error } = useGetOrdersByEmailQuery(user?.email)

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Failed to load payments</p>
        </div>
    )

    const orders = data?.data || []
    const totalPayment = orders.reduce((acc, o) => acc + (o.amount || 0), 0)

    return (
        <div>
            {/* Page header */}
            <div className='mb-8'>
                <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Account</p>
                <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                    Payments
                </h1>
            </div>

            {/* Total card */}
            <div className='p-6 rounded-2xl border border-white/5 mb-6 flex items-center gap-5'
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className='w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0'
                    style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <i className='ri-bank-card-line text-2xl text-green-400' />
                </div>
                <div>
                    <p className='text-white/40 text-xs mb-1'>Total Amount Spent</p>
                    <p className='text-white font-black text-3xl' style={{ fontFamily: '"Playfair Display", serif' }}>
                        ${totalPayment.toFixed(2)}
                    </p>
                    <p className='text-white/25 text-xs mt-1'>{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
                </div>
            </div>

            {/* Payment list */}
            {orders.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 rounded-2xl border border-white/5'
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <i className='ri-bank-card-line text-5xl text-white/10 mb-3' />
                    <p className='text-white/30'>No payment history yet</p>
                </div>
            ) : (
                <div className='space-y-3'>
                    {orders.map((item, index) => (
                        <div key={index}
                            className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-200'
                            style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className='flex items-center gap-4'>
                                <div className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
                                    style={{ background: 'rgba(237,56,73,0.1)', border: '1px solid rgba(237,56,73,0.15)' }}>
                                    <span className='text-[#ed3849] text-xs font-bold'>#{index + 1}</span>
                                </div>
                                <div>
                                    <p className='text-white/70 text-xs font-mono truncate max-w-[180px]'>{item._id}</p>
                                    <p className='text-white/30 text-xs mt-0.5'>
                                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4 sm:gap-6 pl-14 sm:pl-0'>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusStyle(item.status)}`}>
                                    {item.status}
                                </span>
                                <span className='text-white font-bold text-sm'>${item?.amount?.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserPayments
