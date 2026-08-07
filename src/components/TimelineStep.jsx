import React from 'react'

const TimelineStep = ({ step, order, isCompleted, isCurrent, icon, description, isLastStep }) => {
    return (
        <li className='relative flex-1'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center'>
                {/* Icon + connector */}
                <div className='flex items-center sm:flex-col sm:items-center flex-shrink-0 w-full sm:w-auto'>
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 transition-all duration-300
                        ${isCompleted
                            ? 'bg-[#ed3849] border-2 border-[#ed3849]'
                            : isCurrent
                                ? 'border-2 border-[#ed3849] bg-[#ed3849]/15'
                                : 'border-2 border-white/10 bg-white/5'
                        }
                    `}>
                        <i className={`ri-${icon.iconName} text-base ${isCompleted ? 'text-white' : isCurrent ? 'text-[#ed3849]' : 'text-white/30'}`} />
                        {isCurrent && (
                            <span className='absolute w-10 h-10 rounded-full border-2 border-[#ed3849] animate-ping opacity-20' />
                        )}
                    </div>

                    {/* Horizontal connector for sm+ */}
                    {!isLastStep && (
                        <div className={`hidden sm:block h-0.5 flex-1 mx-1 min-w-[20px] transition-all duration-500 ${isCompleted ? 'bg-[#ed3849]/60' : 'bg-white/8'}`}
                            style={{ minWidth: '40px' }} />
                    )}
                    {/* Vertical connector for mobile */}
                    {!isLastStep && (
                        <div className={`sm:hidden w-0.5 h-6 mt-1 ml-[19px] ${isCompleted ? 'bg-[#ed3849]/60' : 'bg-white/8'}`} />
                    )}
                </div>

                {/* Label — below icon */}
                <div className='mt-3 sm:mt-0 sm:absolute sm:top-12 sm:left-0 sm:right-0 sm:text-center pl-4 sm:pl-0'>
                    <p className={`text-xs font-semibold ${isCompleted || isCurrent ? 'text-white' : 'text-white/30'}`}>
                        {step.label}
                    </p>
                    <p className={`text-[10px] mt-0.5 hidden sm:block ${isCompleted || isCurrent ? 'text-white/40' : 'text-white/15'}`}>
                        {isCompleted || isCurrent ? new Date(order?.updatedAt).toLocaleDateString() : 'Pending'}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default TimelineStep
