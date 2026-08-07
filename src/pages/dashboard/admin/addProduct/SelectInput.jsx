import React from 'react'

const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div>
            <label htmlFor={name} className='block text-white/50 text-xs font-medium mb-2'>
                {label}
            </label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className='w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all duration-200 appearance-none border focus:border-[#ed3849]/50'
                style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,0.1)' }}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value} className='bg-[#1a1a1a]'>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput
