import React, { useState } from 'react'
import RatingStars from '../../../components/RatingStars'
import PostAReview from './PostAReview'
import avatarImg from '../../../assets/avatar.png'

const ReviewsCard = ({ productReviews }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenReviewModal = () => setIsModalOpen(true)
    const handleCloseReviewModal = () => setIsModalOpen(false)

    const reviews = productReviews || []

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Customer Reviews
                    </h2>
                    <p className="text-white/35 text-sm">
                        {reviews.length > 0
                            ? `${reviews.length} review${reviews.length !== 1 ? 's' : ''} from verified customers`
                            : 'Be the first to review this product'}
                    </p>
                </div>
                <button
                    onClick={handleOpenReviewModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#ed3849] hover:bg-[#d23141] text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#ed3849]/30 hover:-translate-y-0.5"
                >
                    <i className="ri-pencil-line" />
                    Add Review
                </button>
            </div>

            {/* Reviews */}
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl border border-white/5"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            {/* User + date */}
                            <div className="flex items-start gap-4 mb-4">
                                <img
                                    src={avatarImg}
                                    alt={review?.userId?.username}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-white font-semibold capitalize">
                                            {review?.userId?.username || 'Anonymous'}
                                        </p>
                                        <span className="text-white/20 text-xs">
                                            {new Date(review?.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <RatingStars rating={review?.rating} />
                                </div>
                            </div>

                            {/* Comment */}
                            <p className="text-white/60 text-sm leading-relaxed pl-16">
                                {review?.comment}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-white/20 border border-white/5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <i className="ri-chat-3-line text-5xl mb-3" />
                    <p className="text-sm">No reviews yet</p>
                </div>
            )}

            {/* Modal */}
            <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
        </div>
    )
}

export default ReviewsCard
