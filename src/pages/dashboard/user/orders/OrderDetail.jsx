import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetOrdersByIdQuery } from '../../../../redux/features/orders/orderApi'
import Loading from '../../../../components/Loading'
import TimelineStep from '../../../../components/TimelineStep'

const statusStyle = (status) => {
    switch (status) {
        case 'completed':  return 'bg-green-500/15 text-green-400 border-green-500/25'
        case 'pending':    return 'bg-amber-500/15 text-amber-400 border-amber-500/25'
        case 'processing': return 'bg-blue-500/15 text-blue-400 border-blue-500/25'
        case 'shipped':    return 'bg-purple-500/15 text-purple-400 border-purple-500/25'
        default:           return 'bg-white/10 text-white/50 border-white/10'
    }
}

const steps = [
    {
        status: 'pending',
        label: 'Pending',
        description: 'Your order has been created and is awaiting processing.',
        icon: { iconName: 'time-line' },
    },
    {
        status: 'processing',
        label: 'Processing',
        description: 'Your order is currently being processed.',
        icon: { iconName: 'loader-line' },
    },
    {
        status: 'shipped',
        label: 'Shipped',
        description: 'Your order has been shipped.',
        icon: { iconName: 'truck-line' },
    },
    {
        status: 'completed',
        label: 'Delivered',
        description: 'Your order has been successfully delivered.',
        icon: { iconName: 'checkbox-circle-line' },
    },
]

const OrderDetail = () => {
    const { orderId } = useParams()
    const { data, isLoading, error } = useGetOrdersByIdQuery(orderId)

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Error loading order details</p>
        </div>
    )

    const order = data?.data || {}

    const statuses = ['pending', 'processing', 'shipped', 'completed']
    const isCompleted = (status) => statuses.indexOf(status) < statuses.indexOf(order.status)
    const isCurrent = (status) => order.status === status

    return (
        <div>
            {/* Header */}
            <div className='flex items-center gap-4 mb-8'>
                <Link to='/dashboard/orders'
                    className='w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all duration-200'>
                    <i className='ri-arrow-left-line' />
                </Link>
                <div>
                    <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Order Details</p>
                    <h1 className='text-2xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                        Order #{order?.orderId?.slice(-8) || orderId?.slice(-8)}
                    </h1>
                </div>
            </div>

            {/* Info cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
                <div className='p-5 rounded-2xl border border-white/5' style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className='text-white/30 text-xs mb-1'>Order ID</p>
                    <p className='text-white font-mono text-sm break-all'>{order?.orderId || orderId}</p>
                </div>
                <div className='p-5 rounded-2xl border border-white/5' style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className='text-white/30 text-xs mb-2'>Current Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border capitalize ${statusStyle(order?.status)}`}>
                        {order?.status}
                    </span>
                </div>
            </div>

            {/* Timeline */}
            <div className='rounded-2xl border border-white/5 p-6 md:p-8' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h2 className='text-white font-semibold mb-8'>Order Progress</h2>
                <ol className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-2 relative'>
                    {steps.map((step, index) => (
                        <TimelineStep
                            key={index}
                            step={step}
                            order={order}
                            isCompleted={isCompleted(step.status)}
                            isCurrent={isCurrent(step.status)}
                            isLastStep={index === steps.length - 1}
                            icon={step.icon}
                            description={step.description}
                        />
                    ))}
                </ol>

                {/* Step descriptions */}
                <div className='mt-10 grid grid-cols-1 sm:grid-cols-4 gap-3'>
                    {steps.map((step, i) => (
                        <div key={i} className='p-3 rounded-xl border border-white/5' style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <p className={`text-xs font-semibold mb-1 ${isCompleted(step.status) || isCurrent(step.status) ? 'text-white' : 'text-white/25'}`}>
                                {step.label}
                            </p>
                            <p className={`text-xs ${isCompleted(step.status) || isCurrent(step.status) ? 'text-white/40' : 'text-white/15'}`}>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
