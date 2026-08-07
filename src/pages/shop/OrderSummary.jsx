import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'
import { loadStripe } from '@stripe/stripe-js'
import { getBaseUrl } from '../../utils/getBaseUrl'
import axios from 'axios'

const OrderSummary = () => {
    const dispatch = useDispatch()
    const { products, selectedItems, totalPrice } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    const handleClearCart = () => dispatch(clearCart())

    const makePayment = async (e) => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK)
        const body = { products, userId: user?._id }

        try {
            const response = await axios.post(
                `${getBaseUrl()}/api/orders/create-checkout-session`,
                body,
                { headers: { 'Content-Type': 'application/json' } }
            )
            const result = stripe.redirectToCheckout({ sessionId: response.data.id })
            if (result.error) console.error('Error redirecting to checkout', result.error)
        } catch (error) {
            console.error('Error creating checkout', error)
        }
    }

    // Calculate savings if any items have oldPrice
    const savings = products.reduce((acc, p) => {
        if (p.oldPrice) return acc + (p.oldPrice - p.price) * p.quantity
        return acc
    }, 0)

    return (
        <div className="space-y-4">
            {/* Summary rows */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Items ({selectedItems})</span>
                    <span className="text-white/70">${totalPrice.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400/70">You save</span>
                        <span className="text-green-400 font-semibold">−${savings.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Shipping</span>
                    <span className="text-green-400 font-semibold">Free</span>
                </div>
                <div className="border-t border-white/5 pt-2 flex items-center justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-[#ed3849] font-black text-xl">${totalPrice.toFixed(2)}</span>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={(e) => { e.stopPropagation(); makePayment() }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#ed3849] hover:bg-[#d23141] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#ed3849]/30 hover:-translate-y-0.5"
            >
                <i className="ri-secure-payment-line" />
                Proceed to Checkout
                <i className="ri-arrow-right-line" />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); handleClearCart() }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-[#ed3849] hover:border-[#ed3849]/30 text-sm transition-all duration-200"
            >
                <i className="ri-delete-bin-7-line" />
                Clear Cart
            </button>
        </div>
    )
}

export default OrderSummary
