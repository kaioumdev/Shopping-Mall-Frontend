import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetReviewByUserIdQuery } from '../../../../redux/features/reviews/reviewsApi'
import Loading from '../../../../components/Loading'

const UserReviews = () => {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const { data, isLoading, error } = useGetReviewByUserIdQuery(user?._id)

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Failed to load your reviews</p>
        </div>
    )

    const reviews = data?.data || []

    const renderStars = (rating) =>
        [1, 2, 3, 4, 5].map(i => (
            <i key={i} className={`text-sm ${i <= rating ? 'ri-star-fill text-amber-400' : 'ri-star-line text-white/15'}`} />
        ))

    return (
        <div>
            {/* Page header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Account</p>
                    <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                        My Reviews
                    </h1>
                </div>
                <span className='text-sm text-white/40'>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
            </div>

            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                {/* Review cards */}
                {reviews.map((review) => (
                    <div key={review._id}
                        className='p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-200'
                        style={{ background: 'rgba(255,255,255,0.02)' }}>
                        {/* Stars */}
                        <div className='flex items-center gap-0.5 mb-3'>
                            {renderStars(review.rating)}
                        </div>
                        {/* Comment */}
                        <p className='text-white/70 text-sm leading-relaxed mb-4 line-clamp-3'>{review.comment}</p>
                        {/* Meta */}
                        <div className='border-t border-white/5 pt-3 space-y-1'>
                            <p className='text-white/25 text-xs font-mono truncate'>Product: {review.productId}</p>
                            <p className='text-white/20 text-xs'>
                                {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Add new review CTA */}
                <button
                    onClick={() => navigate('/shop')}
                    className='flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed text-[#ed3849] hover:bg-[#ed3849]/5 transition-all duration-200 min-h-[160px]'
                    style={{ borderColor: 'rgba(237,56,73,0.25)' }}>
                    <i className='ri-add-circle-line text-3xl mb-2' />
                    <p className='font-semibold text-sm'>Add New Review</p>
                    <p className='text-[#ed3849]/50 text-xs mt-1'>Browse products to review</p>
                </button>
            </div>

            {reviews.length === 0 && (
                <div className='flex flex-col items-center justify-center py-16 text-white/25 -mt-4'>
                    <i className='ri-star-line text-5xl mb-3 text-white/10' />
                    <p className='text-sm'>You haven't written any reviews yet</p>
                </div>
            )}
        </div>
    )
}

export default UserReviews
