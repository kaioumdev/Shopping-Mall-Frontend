import React from 'react'

const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <i
                    key={i}
                    className={`text-sm ${i <= rating ? 'ri-star-fill text-amber-400' : 'ri-star-line text-white/15'}`}
                />
            ))}
        </div>
    )
}

export default RatingStars