import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteProductMutation, useFetchAllProdutsQuery } from '../../../../redux/features/products/productsApi'
import Loading from '../../../../components/Loading'

const ManageProducts = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(12)
    const [deleteProduct] = useDeleteProductMutation()

    const { data: productsData = {}, error, isLoading, refetch } = useFetchAllProdutsQuery({
        category: '', color: '', minPrice: '', maxPrice: '',
        page: currentPage, limit: productsPerPage,
    })

    if (isLoading) return <Loading />

    const { products = [], totalProducts = 0, totalPages = 1 } = productsData?.data || {}

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return
        try {
            await deleteProduct(id).unwrap()
            alert('Product deleted successfully!')
            await refetch()
        } catch (err) {
            console.error('Failed to delete product:', err)
        }
    }

    const startProduct = (currentPage - 1) * productsPerPage + 1
    const endProduct = Math.min(startProduct + products.length - 1, totalProducts)

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page)
    }

    return (
        <div>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Admin</p>
                    <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                        Manage Products
                    </h1>
                    <p className='text-white/30 text-xs mt-1'>
                        Showing {startProduct}–{endProduct} of {totalProducts} products
                    </p>
                </div>
                <Link to='/dashboard/add-product'
                    className='flex items-center gap-2 px-4 py-2.5 bg-[#ed3849] hover:bg-[#d23141] text-white text-sm font-semibold rounded-xl transition-all duration-200'>
                    <i className='ri-add-line' /> Add Product
                </Link>
            </div>

            {/* Table */}
            <div className='rounded-2xl border border-white/5 overflow-hidden' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b border-white/5' style={{ background: 'rgba(255,255,255,0.03)' }}>
                                {['#', 'Product', 'Category', 'Price', 'Added', 'Actions'].map(h => (
                                    <th key={h} className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase whitespace-nowrap'>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className='text-center py-16 text-white/25'>
                                        <i className='ri-box-3-line text-4xl block mb-2' />
                                        No products found
                                    </td>
                                </tr>
                            ) : products.map((product, index) => (
                                <tr key={product._id}
                                    className='border-b border-white/5 hover:bg-white/2 transition-colors last:border-b-0'>
                                    <td className='px-5 py-4 text-white/40 text-sm'>{(currentPage - 1) * productsPerPage + index + 1}</td>
                                    <td className='px-5 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-xl overflow-hidden bg-white/5 flex-shrink-0'>
                                                {product?.image && (
                                                    <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
                                                )}
                                            </div>
                                            <Link to={`/shop/${product?._id}`}
                                                className='text-white/70 hover:text-[#ed3849] text-sm font-medium transition-colors max-w-[160px] truncate block'>
                                                {product?.name}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className='px-5 py-4'>
                                        <span className='text-xs capitalize px-2.5 py-0.5 rounded-full border'
                                            style={{ background: 'rgba(237,56,73,0.08)', color: '#ed3849', borderColor: 'rgba(237,56,73,0.15)' }}>
                                            {product?.category}
                                        </span>
                                    </td>
                                    <td className='px-5 py-4 text-white font-semibold text-sm'>${product?.price}</td>
                                    <td className='px-5 py-4 text-white/40 text-sm whitespace-nowrap'>
                                        {new Date(product?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className='px-5 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <Link to={`/dashboard/update-product/${product?._id}`}
                                                className='w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/10 border border-blue-500/20 transition-all duration-200'
                                                title='Edit product'>
                                                <i className='ri-edit-line text-sm' />
                                            </Link>
                                            <button onClick={() => handleDelete(product?._id)}
                                                className='w-8 h-8 rounded-lg flex items-center justify-center text-[#ed3849] hover:bg-[#ed3849]/10 border border-[#ed3849]/20 transition-all duration-200'
                                                title='Delete product'>
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='flex items-center justify-center gap-2 mt-8'>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                        className='w-9 h-9 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200'>
                        <i className='ri-arrow-left-s-line' />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => handlePageChange(i + 1)}
                            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${currentPage === i + 1
                                ? 'bg-[#ed3849] text-white shadow-lg shadow-[#ed3849]/25'
                                : 'border border-white/10 text-white/50 hover:text-white hover:border-white/25'
                            }`}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                        className='w-9 h-9 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200'>
                        <i className='ri-arrow-right-s-line' />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ManageProducts
