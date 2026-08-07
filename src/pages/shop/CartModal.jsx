import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice'
import OrderSummary from './OrderSummary'

const CartModal = ({ products, isOpen, onClose }) => {
    const dispatch = useDispatch()

    // Lock body scroll when cart is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    const handleUpdateQuantity = (type, id) => dispatch(updateQuantity({ type, id }))
    const handleRemoveFromCart = (e, id) => { e.preventDefault(); dispatch(removeFromCart({ id })) }

    return (
        <div
            className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[#141414] border-l border-white/5 flex flex-col transition-transform duration-400 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <i className="ri-shopping-bag-3-line text-[#ed3849] text-xl" />
                        <h2 className="text-white font-bold text-lg">Your Cart</h2>
                        {products.length > 0 && (
                            <span className="bg-[#ed3849] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {products.length}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                        aria-label="Close cart"
                    >
                        <i className="ri-close-line text-lg" />
                    </button>
                </div>

                {/* Cart items — scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-white/25 py-20">
                            <i className="ri-shopping-cart-2-line text-6xl mb-4" />
                            <p className="text-lg font-medium text-white/30">Your cart is empty</p>
                            <p className="text-sm mt-1">Add items from the shop to get started</p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-6 py-3 bg-[#ed3849] hover:bg-[#d23141] text-white text-sm font-semibold rounded-full transition-colors duration-200"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        products.map((product, index) => (
                            <div
                                key={index}
                                className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/2 hover:border-white/10 transition-all duration-200 group"
                                style={{ background: 'rgba(255,255,255,0.02)' }}
                            >
                                {/* Image */}
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                                    <img
                                        src={product?.image}
                                        alt={product?.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Item number */}
                                    <div className="absolute top-1 left-1 w-4 h-4 bg-[#ed3849] rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h5
                                        className="text-white font-semibold text-sm mb-0.5 truncate"
                                        style={{ fontFamily: '"Playfair Display", serif' }}
                                    >
                                        {product?.name}
                                    </h5>
                                    <p className="text-[#ed3849] font-bold text-sm mb-3">
                                        ${(product?.price * product?.quantity).toFixed(2)}
                                        {product?.quantity > 1 && (
                                            <span className="text-white/25 font-normal text-xs ml-1">
                                                (${product?.price} × {product?.quantity})
                                            </span>
                                        )}
                                    </p>

                                    {/* Qty + remove */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/5">
                                            <button
                                                onClick={() => handleUpdateQuantity('decrement', product?._id)}
                                                className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm"
                                                aria-label="Decrease quantity"
                                            >
                                                <i className="ri-subtract-line" />
                                            </button>
                                            <span className="w-8 text-center text-white text-sm font-semibold">
                                                {product?.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleUpdateQuantity('increament', product?._id)}
                                                className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm"
                                                aria-label="Increase quantity"
                                            >
                                                <i className="ri-add-line" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={(e) => handleRemoveFromCart(e, product?._id)}
                                            className="w-7 h-7 rounded-md flex items-center justify-center text-white/20 hover:text-[#ed3849] hover:bg-[#ed3849]/10 transition-all duration-200"
                                            aria-label="Remove item"
                                        >
                                            <i className="ri-delete-bin-7-line text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order summary pinned at bottom */}
                {products.length > 0 && (
                    <div className="border-t border-white/5 px-6 pt-4 pb-6">
                        <OrderSummary />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartModal
