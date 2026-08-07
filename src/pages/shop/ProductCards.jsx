import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import RatingStars from '../../components/RatingStars'
import { addToCart } from '../../redux/features/cart/cartSlice'

const ProductCards = ({ products }) => {
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (!products?.length) {
        return (
            <div className="text-center py-16 text-white/30">
                <i className="ri-inbox-line text-5xl mb-3 block" />
                No products found.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="group relative bg-white/3 rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    {/* Image area */}
                    <div className="relative overflow-hidden aspect-[4/5] bg-white/5">
                        <Link to={`/shop/${product._id}`}>
                            <img
                                src={product?.image}
                                alt={product?.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </Link>

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Add to cart button */}
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-2.5 bg-[#ed3849] hover:bg-[#d23141] text-white text-xs font-bold rounded-full shadow-lg shadow-[#ed3849]/30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                            aria-label={`Add ${product?.name} to cart`}
                        >
                            <i className="ri-shopping-cart-2-line" />
                            Add to Cart
                        </button>

                        {/* Old price badge */}
                        {product?.oldPrice && (
                            <div className="absolute top-3 left-3 bg-[#ed3849] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                Sale
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <Link to={`/shop/${product._id}`}>
                            <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1 hover:text-[#ed3849] transition-colors duration-200"
                                style={{ fontFamily: '"Playfair Display", serif' }}>
                                {product?.name}
                            </h4>
                        </Link>

                        <RatingStars rating={product?.rating} />

                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-white font-bold text-base">${product?.price}</span>
                            {product?.oldPrice && (
                                <span className="text-white/30 text-sm line-through">${product?.oldPrice}</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCards
