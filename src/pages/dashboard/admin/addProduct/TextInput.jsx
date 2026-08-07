import React from 'react'

const TextInput = ({ label, name, placeholder, value, type, onChange }) => {
    return (
        <div>
            <label htmlFor={name} className='block text-white/50 text-xs font-medium mb-2'>
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none transition-all duration-200 border focus:border-[#ed3849]/50'
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
            />
        </div>
    )
}

export default TextInput
