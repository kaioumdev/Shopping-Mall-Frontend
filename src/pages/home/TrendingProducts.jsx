import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCards from '../shop/ProductCards'
import { useFetchAllProdutsQuery } from '../../redux/features/products/productsApi'
import Loading from '../../components/Loading'

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8)
    const { data: productsData = {}, error, isLoading } = useFetchAllProdutsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 12,
    })

    if (isLoading) return <Loading />
    if (error) return (
        <div className="py-16 text-center text-white/40">
            <i className="ri-error-warning-line text-4xl mb-3 block" />
            Something went wrong loading products.
        </div>
    )

    const { products = [] } = productsData?.data || {}

    const loadMoreProducts = () => setVisibleProducts(prev => prev + 4)

    return (
        <section className="py-20 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs tracking-[0.3em] uppercase text-[#ed3849] font-semibold">Hot Right Now</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Trending Products
                        </h2>
                        <p className="text-white/35 text-sm mt-2 max-w-md">
                            Discover the hottest picks curated from our collection of trending women's fashion.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors duration-300 group shrink-0"
                    >
                        View All Products
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Product cards */}
                <ProductCards products={products.slice(0, visibleProducts)} />

                {/* Load more */}
                {visibleProducts < products.length && (
                    <div className="text-center mt-12">
                        <button
                            onClick={loadMoreProducts}
                            className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-[#ed3849]/50 text-white/70 hover:text-white rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <i className="ri-refresh-line" />
                            Load More Products
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default TrendingProducts
