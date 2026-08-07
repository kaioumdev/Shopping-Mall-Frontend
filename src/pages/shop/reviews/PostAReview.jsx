import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProductbyIdQuery } from '../../../redux/features/products/productsApi'
import { usePostAReviewMutation } from '../../../redux/features/reviews/reviewsApi'

const PostAReview = ({ isModalOpen, handleClose }) => {
    const { id } = useParams()
    const { user } = useSelector((state) => state.auth)
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState('')
    const navigate = useNavigate()

    const { refetch } = useFetchProductbyIdQuery(id, { skip: !id })
    const [postAReview, { isLoading }] = usePostAReviewMutation()

    // Lock body scroll when modal open
    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isModalOpen])

    // Close on Escape
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape' && isModalOpen) handleClose() }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [isModalOpen, handleClose])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            alert('You must be logged in to post a review.')
            navigate('/login')
            return
        }

        if (rating === 0) {
            alert('Please select a rating.')
            return
        }

        if (!comment.trim()) {
            alert('Please write a comment.')
            return
        }

        const newReview = {
            comment: comment.trim(),
            rating,
            userId: user._id,
            productId: id,
        }

        try {
            await postAReview(newReview).unwrap()
            alert('Review posted successfully!')
            setRating(0)
            setComment('')
            refetch()
            handleClose()
        } catch (error) {
            console.error('Error posting review:', error)
            alert('Error posting review. Please try again.')
        }
    }

    if (!isModalOpen) return null

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h3 className="text-white font-bold text-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
                            Write a Review
                        </h3>
                        <p className="text-white/30 text-xs mt-0.5">Share your experience with this product</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
                        aria-label="Close modal"
                    >
                        <i className="ri-close-line text-lg" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Rating selector */}
                    <div>
                        <label className="text-white/70 text-sm font-medium mb-2 block">
                            Your Rating <span className="text-[#ed3849]">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="text-3xl transition-all duration-200 hover:scale-110"
                                    style={{
                                        color: star <= (hoveredRating || rating) ? '#f59e0b' : 'rgba(255,255,255,0.1)',
                                    }}
                                >
                                    <i className={star <= (hoveredRating || rating) ? 'ri-star-fill' : 'ri-star-line'} />
                                </button>
                            ))}
                            {rating > 0 && (
                                <span className="text-white/30 text-sm ml-2">
                                    {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Comment textarea */}
                    <div>
                        <label htmlFor="comment" className="text-white/70 text-sm font-medium mb-2 block">
                            Your Review <span className="text-[#ed3849]">*</span>
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="5"
                            placeholder="Tell us what you think about this product..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#ed3849]/50 transition-colors duration-200 resize-none"
                        />
                        <p className="text-white/20 text-xs mt-1">{comment.length} characters</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-2.5 bg-[#ed3849] hover:bg-[#d23141] text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#ed3849]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <i className="ri-send-plane-2-line" />
                                    Submit Review
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostAReview
