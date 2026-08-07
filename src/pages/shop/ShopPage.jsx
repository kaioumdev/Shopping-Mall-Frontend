import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCards from './ProductCards'
import ShopFiltering from './ShopFiltering'
import Loading from '../../components/Loading'
import { useFetchAllProdutsQuery } from '../../redux/features/products/productsApi'

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity },
    ],
}

const ShopPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: '',
    })
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const { category, color, priceRange } = filtersState
    const [minPrice, maxPrice] = priceRange.split('-').map(Number)
    const [productsPerPage] = useState(8)

    const { data: productsData = {}, error, isLoading } = useFetchAllProdutsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage,
    })

    if (isLoading) return <Loading />

    const { products = [], totalPages = 1, totalProducts = 0 } = productsData?.data || {}

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const clearFilters = () => {
        setFiltersState({ category: 'all', color: 'all', priceRange: '' })
        setCurrentPage(1)
    }

    const startProduct = totalProducts === 0 ? 0 : (currentPage - 1) * productsPerPage + 1
    const endProduct = startProduct + products.length - 1

    const hasActiveFilters =
        filtersState.category !== 'all' ||
        filtersState.color !== 'all' ||
        filtersState.priceRange !== ''

    return (
        <div className="min-h-screen bg-[#0d0d0d]">
            {/* Page hero */}
            <div className="relative bg-gradient-to-br from-[#1a0508] via-[#0d0d0d] to-[#0d0d0d] border-b border-white/5 pt-24 pb-12 px-4">
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="absolute left-0 top-0 w-96 h-full bg-gradient-to-r from-[#ed3849]/10 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/30 mb-4">
                        <Link to="/" className="hover:text-white/70 transition-colors duration-200">Home</Link>
                        <i className="ri-arrow-right-s-line" />
                        <span className="text-white/60">Shop</span>
                    </div>

                    <h1 className="text-5xl font-black text-white mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Shop
                    </h1>
                    <p className="text-white/40 text-sm max-w-md">
                        Elevate your style with our curated collection of trending women's fashion products.
                    </p>
                </div>
            </div>

            {/* Main shop area */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <p className="text-white/40 text-sm">
                        {totalProducts > 0 ? (
                            <>Showing <span className="text-white font-medium">{startProduct}–{endProduct}</span> of <span className="text-white font-medium">{totalProducts}</span> products</>
                        ) : (
                            'No products found'
                        )}
                        {hasActiveFilters && (
                            <span className="ml-2 text-[#ed3849]">(filtered)</span>
                        )}
                    </p>

                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/25 text-sm transition-all duration-200"
                    >
                        <i className="ri-equalizer-2-line" />
                        Filters
                        {hasActiveFilters && (
                            <span className="w-2 h-2 rounded-full bg-[#ed3849]" />
                        )}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar — desktop always visible, mobile toggled */}
                    <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                        <ShopFiltering
                            filters={filters}
                            filtersState={filtersState}
                            setFiltersState={(val) => { setFiltersState(val); setCurrentPage(1) }}
                            clearFilters={clearFilters}
                        />
                    </div>

                    {/* Product grid + pagination */}
                    <div className="flex-1 min-w-0">
                        {error ? (
                            <div className="flex flex-col items-center justify-center py-24 text-white/30">
                                <i className="ri-error-warning-line text-5xl mb-3" />
                                <p>Something went wrong loading products.</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-white/30">
                                <i className="ri-inbox-line text-6xl mb-4" />
                                <p className="text-lg font-medium text-white/40">No products found</p>
                                <p className="text-sm mt-1">Try adjusting your filters</p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-5 px-5 py-2.5 bg-[#ed3849] hover:bg-[#d23141] text-white text-sm font-semibold rounded-full transition-colors duration-200"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <ProductCards products={products} />

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className="w-10 h-10 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                                            aria-label="Previous page"
                                        >
                                            <i className="ri-arrow-left-s-line" />
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => {
                                            const page = i + 1
                                            // Show first, last, current ±1, and ellipsis
                                            const showPage =
                                                page === 1 ||
                                                page === totalPages ||
                                                Math.abs(page - currentPage) <= 1

                                            if (!showPage) {
                                                if (page === 2 && currentPage > 3) return <span key={i} className="text-white/20 px-1">…</span>
                                                if (page === totalPages - 1 && currentPage < totalPages - 2) return <span key={i} className="text-white/20 px-1">…</span>
                                                return null
                                            }

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                                        currentPage === page
                                                            ? 'bg-[#ed3849] text-white shadow-lg shadow-[#ed3849]/30'
                                                            : 'border border-white/10 text-white/50 hover:text-white hover:border-white/25'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        })}

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className="w-10 h-10 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                                            aria-label="Next page"
                                        >
                                            <i className="ri-arrow-right-s-line" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopPage
