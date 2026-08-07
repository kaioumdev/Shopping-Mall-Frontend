import React, { useState } from 'react'
import { useDeleteOrderbyIdMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi'
import Loading from '../../../../components/Loading'
import UpdateOrderModal from './UpdateOrderModal'

const statusStyle = (status) => {
    switch (status) {
        case 'completed':  return 'bg-green-500/15 text-green-400 border-green-500/25'
        case 'pending':    return 'bg-amber-500/15 text-amber-400 border-amber-500/25'
        case 'processing': return 'bg-blue-500/15 text-blue-400 border-blue-500/25'
        case 'shipped':    return 'bg-purple-500/15 text-purple-400 border-purple-500/25'
        default:           return 'bg-white/10 text-white/50 border-white/10'
    }
}

const ManageOrders = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const { data, isLoading, error, refetch } = useGetAllOrdersQuery()
    const [deleteOrderbyId] = useDeleteOrderbyIdMutation()

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Failed to fetch orders</p>
        </div>
    )

    const orders = data?.data || []

    const handleDeleteClick = async (orderId) => {
        if (!window.confirm('Delete this order?')) return
        try {
            await deleteOrderbyId(orderId).unwrap()
            alert(`Order deleted`)
            refetch()
        } catch (err) {
            console.error('Failed to delete order:', err)
        }
    }

    const handleEdit = (order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedOrder(null)
    }

    return (
        <div>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Admin</p>
                    <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                        Manage Orders
                    </h1>
                </div>
                <span className='px-3 py-1 rounded-full text-xs font-semibold'
                    style={{ background: 'rgba(237,56,73,0.1)', color: '#ed3849', border: '1px solid rgba(237,56,73,0.2)' }}>
                    {orders.length} Total
                </span>
            </div>

            <div className='rounded-2xl border border-white/5 overflow-hidden' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b border-white/5' style={{ background: 'rgba(255,255,255,0.03)' }}>
                                {['Order ID', 'Customer', 'Status', 'Date', 'Actions'].map(h => (
                                    <th key={h} className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase whitespace-nowrap'>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className='text-center py-16 text-white/25'>
                                        <i className='ri-file-list-3-line text-4xl block mb-2' />
                                        No orders found
                                    </td>
                                </tr>
                            ) : orders.map((order, index) => (
                                <tr key={index}
                                    className='border-b border-white/5 hover:bg-white/2 transition-colors last:border-b-0'>
                                    <td className='px-5 py-4 text-white/60 text-xs font-mono max-w-[130px] truncate'>{order.orderId}</td>
                                    <td className='px-5 py-4 text-white/70 text-sm'>{order?.email}</td>
                                    <td className='px-5 py-4'>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className='px-5 py-4 text-white/50 text-sm whitespace-nowrap'>
                                        {new Date(order?.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className='px-5 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <button onClick={() => handleEdit(order)}
                                                className='w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/10 border border-blue-500/20 transition-all duration-200'
                                                title='Edit order'>
                                                <i className='ri-edit-line text-sm' />
                                            </button>
                                            <button onClick={() => handleDeleteClick(order?._id)}
                                                className='w-8 h-8 rounded-lg flex items-center justify-center text-[#ed3849] hover:bg-[#ed3849]/10 border border-[#ed3849]/20 transition-all duration-200'
                                                title='Delete order'>
                                                <i className='ri-delete-bin-7-line text-sm' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <UpdateOrderModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal} refetch={refetch} />
            )}
        </div>
    )
}

export default ManageOrders
