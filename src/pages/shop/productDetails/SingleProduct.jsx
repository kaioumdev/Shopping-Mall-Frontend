import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFetchProductbyIdQuery } from '../../../redux/features/products/productsApi'
import { addToCart } from '../../../redux/features/cart/cartSlice'
import Loading from '../../../components/Loading'
import RatingStars from '../../../components/RatingStars'
import ReviewsCard from '../reviews/ReviewsCard'

const categoryIconMap = {
    accessories: 'ri-handbag-line',
    dress: 'ri-t-shirt-line',
    jewellery: 'ri-gem-line',
    cosmetics: 'ri-magic-line',
}

const SingleProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { data: { data: productDetails } = {}, isLoading, isError } = useFetchProductbyIdQuery(id)

    if (isLoading) return <Loading />
    if (isError) return (
        <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center text-white/30">
            <i className="ri-error-warning-line text-5xl mb-3" />
            <p>Could not load product details.</p>
        </div>
    )

    const { product, reviews } = productDetails || {}

    const handleAddToCart = () => dispatch(addToCart(product))

    const discount = product?.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : null

    return (
        <div className="min-h-screen bg-[#0d0d0d]">
            {/* Breadcrumb hero */}
            <div className="relative bg-gradient-to-br from-[#1a0508] via-[#0d0d0d] to-[#0d0d0d] border-b border-white/5 pt-24 pb-10 px-4">
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-2 text-sm text-white/30">
                        <Link to="/" className="hover:text-white/70 transition-colors duration-200">Home</Link>
                        <i className="ri-arrow-right-s-line" />
                        <Link to="/shop" className="hover:text-white/70 transition-colors duration-200">Shop</Link>
                        <i className="ri-arrow-right-s-line" />
                        <span className="text-white/60 capitalize truncate max-w-[200px]">{product?.name}</span>
                    </div>
                </div>
            </div>

            {/* Product detail */}
            <div className="max-w-7xl mx-auto px-4 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-3xl bg-white/3 border border-white/5 aspect-square"
                            style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <img
                                src={product?.image}
                                alt={product?.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                        </div>

                        {/* Discount badge */}
                        {discount && (
                            <div className="absolute top-4 left-4 bg-[#ed3849] text-white text-sm font-black px-3 py-1.5 rounded-full shadow-lg">
                                −{discount}%
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        {/* Category badge */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
                                style={{ background: '#ed384915', color: '#ed3849', border: '1px solid #ed384930' }}>
                                <i className={`${categoryIconMap[product?.category] || 'ri-tag-line'} text-sm`} />
                                {product?.category}
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-4xl font-black text-white leading-tight"
                            style={{ fontFamily: '"Playfair Display", serif' }}>
                            {product?.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <RatingStars rating={product?.rating} />
                            <span className="text-white/30 text-sm">
                                ({reviews?.length || 0} review{reviews?.length !== 1 ? 's' : ''})
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-black text-[#ed3849]">${product?.price}</span>
                            {product?.oldPrice && (
                                <>
                                    <span className="text-white/25 text-xl line-through mb-0.5">${product?.oldPrice}</span>
                                    <span className="text-green-400 text-sm font-semibold mb-1">Save ${(product.oldPrice - product.price).toFixed(2)}</span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-white/50 leading-relaxed text-sm border-t border-white/5 pt-6">
                            {product?.description}
                        </p>

                        {/* Meta grid */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            {[
                                { label: 'Category', value: product?.category, icon: categoryIconMap[product?.category] || 'ri-tag-line' },
                                { label: 'Color', value: product?.color, icon: 'ri-palette-line' },
                            ].map(({ label, value, icon }) => (
                                <div key={label}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5"
                                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <i className={`${icon} text-[#ed3849] text-lg`} />
                                    <div>
                                        <div className="text-white/30 text-xs">{label}</div>
                                        <div className="text-white capitalize text-sm font-medium">{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add to cart */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleAddToCart() }}
                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#ed3849] hover:bg-[#d23141] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#ed3849]/30 hover:-translate-y-0.5 text-sm"
                            >
                                <i className="ri-shopping-cart-2-line text-lg" />
                                Add to Cart
                            </button>
                            <Link
                                to="/shop"
                                className="w-14 flex items-center justify-center rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all duration-200"
                                aria-label="Back to shop"
                            >
                                <i className="ri-arrow-left-line" />
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                            {[
                                { icon: 'ri-truck-line', label: 'Free Delivery' },
                                { icon: 'ri-refresh-line', label: 'Easy Returns' },
                                { icon: 'ri-shield-check-line', label: '100% Authentic' },
                            ].map(({ icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-white/5 text-center"
                                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <i className={`${icon} text-[#ed3849] text-lg`} />
                                    <span className="text-white/40 text-xs">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews section */}
                <div className="mt-16 border-t border-white/5 pt-12">
                    <ReviewsCard productReviews={reviews} />
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
