import React from 'react'

const Loading = () => {
    return (
        <div className="min-h-[300px] flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#ed3849] animate-spin" />
                <span className="text-white/30 text-xs tracking-widest uppercase">Loading</span>
            </div>
        </div>
    )
}

export default Loading