import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi'

const UpdateOrderModal = ({ order, isOpen, onClose, refetch }) => {
    const [status, setStatus] = useState(order?.status)
    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation()

    const handleUpdate = async () => {
        try {
            await updateOrderStatus({ id: order?._id, status }).unwrap()
            alert('Order status updated')
            if (refetch) refetch()
            onClose()
        } catch (err) {
            console.error('Failed to update order status:', err)
            alert('Failed to update. Please try again.')
        }
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
            <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />
            <div className='relative rounded-2xl border border-white/10 w-full max-w-sm overflow-hidden'
                style={{ background: '#1a1a1a' }}>
                {/* Header */}
                <div className='flex items-center justify-between px-6 py-5 border-b border-white/5'>
                    <h2 className='text-white font-bold text-lg' style={{ fontFamily: '"Playfair Display", serif' }}>
                        Update Order
                    </h2>
                    <button onClick={onClose}
                        className='w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all'>
                        <i className='ri-close-line text-lg' />
                    </button>
                </div>

                {/* Body */}
                <div className='p-6 space-y-4'>
                    <div>
                        <p className='text-white/40 text-xs mb-1'>Order ID</p>
                        <p className='text-white/60 text-xs font-mono truncate'>{order?.orderId}</p>
                    </div>

                    <div>
                        <label htmlFor='order-status' className='block text-white/50 text-xs font-medium mb-2'>
                            New Status
                        </label>
                        <select
                            id='order-status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all duration-200 appearance-none border focus:border-[#ed3849]/50'
                            style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <option value='pending'>Pending</option>
                            <option value='processing'>Processing</option>
                            <option value='shipped'>Shipped</option>
                            <option value='completed'>Completed</option>
                        </select>
                    </div>

                    <div className='flex gap-3 pt-2'>
                        <button onClick={onClose}
                            className='flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium transition-all duration-200'>
                            Cancel
                        </button>
                        <button onClick={handleUpdate} disabled={isLoading}
                            className='flex-1 py-2.5 rounded-xl bg-[#ed3849] hover:bg-[#d23141] disabled:opacity-50 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2'>
                            {isLoading ? <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' /> : null}
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrderModal
