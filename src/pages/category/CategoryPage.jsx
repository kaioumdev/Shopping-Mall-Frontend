import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards'
import { useFetchAllProdutsQuery } from '../../redux/features/products/productsApi'
import Loading from '../../components/Loading'

const categoryMeta = {
    accessories: { icon: 'ri-handbag-line', desc: 'Bags, belts, scarves & more — all in one place' },
    dress: { icon: 'ri-t-shirt-line', desc: 'Elegant dresses, casual wear and everything in between' },
    jewellery: { icon: 'ri-gem-line', desc: 'Exquisite jewellery from luxury to everyday wear' },
    cosmetics: { icon: 'ri-magic-line', desc: 'Cosmetics, skincare and wellness brands' },
}

const CategoryPage = () => {
    const { categoryName } = useParams()
    const meta = categoryMeta[categoryName?.toLowerCase()] || { icon: 'ri-shopping-bag-line', desc: 'Browse our curated collection' }

    const { data: productsData = {}, error, isLoading } = useFetchAllProdutsQuery({
        category: categoryName?.toLowerCase() || '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 50,
    })

    if (isLoading) return <Loading />

    const { products = [] } = productsData?.data || {}

    return (
        <div className="min-h-screen bg-[#0d0d0d]">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-[#1a0508] via-[#0d0d0d] to-[#0d0d0d] border-b border-white/5 pt-24 pb-12 px-4">
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="absolute left-0 top-0 w-96 h-full bg-gradient-to-r from-[#ed3849]/8 to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/30 mb-5">
                        <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
                        <i className="ri-arrow-right-s-line" />
                        <Link to="/shop" className="hover:text-white/70 transition-colors">Shop</Link>
                        <i className="ri-arrow-right-s-line" />
                        <span className="text-white/60 capitalize">{categoryName}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{ background: '#ed384915', border: '1px solid #ed384930' }}>
                            <i className={`${meta.icon} text-2xl text-[#ed3849]`} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white capitalize" style={{ fontFamily: '"Playfair Display", serif' }}>
                                {categoryName}
                            </h1>
                            <p className="text-white/35 text-sm mt-1">{meta.desc}</p>
                        </div>
                    </div>

                    {/* Product count */}
                    {products.length > 0 && (
                        <p className="text-white/25 text-xs mt-4">
                            {products.length} product{products.length !== 1 ? 's' : ''} available
                        </p>
                    )}
                </div>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {error ? (
                    <div className="flex flex-col items-center justify-center py-24 text-white/30">
                        <i className="ri-error-warning-line text-5xl mb-3" />
                        <p>Something went wrong loading products.</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-white/25">
                        <i className="ri-inbox-line text-6xl mb-4" />
                        <p className="text-lg font-medium text-white/35">No products found</p>
                        <p className="text-sm mt-1">Check back soon for new arrivals</p>
                        <Link
                            to="/shop"
                            className="mt-6 px-6 py-3 bg-[#ed3849] hover:bg-[#d23141] text-white text-sm font-semibold rounded-full transition-colors duration-200"
                        >
                            Browse All Products
                        </Link>
                    </div>
                ) : (
                    <ProductCards products={products} />
                )}
            </div>
        </div>
    )
}

export default CategoryPage
