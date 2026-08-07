import React, { useState } from 'react'

const colorMap = {
    black: '#1a1a1a',
    red: '#ef4444',
    gold: '#f59e0b',
    blue: '#3b82f6',
    silver: '#94a3b8',
    beige: '#d4b89a',
    green: '#22c55e',
    all: null,
}

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    const [openSections, setOpenSections] = useState({ category: true, color: true, price: true })

    const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))

    const hasActiveFilters =
        filtersState.category !== 'all' ||
        filtersState.color !== 'all' ||
        filtersState.priceRange !== ''

    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <i className="ri-equalizer-2-line text-[#ed3849]" />
                    <h3 className="text-white font-bold text-lg">Filters</h3>
                    {hasActiveFilters && (
                        <span className="text-xs bg-[#ed3849] text-white font-bold px-1.5 py-0.5 rounded-full">
                            {[
                                filtersState.category !== 'all',
                                filtersState.color !== 'all',
                                filtersState.priceRange !== ''
                            ].filter(Boolean).length}
                        </span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-[#ed3849] hover:text-white transition-colors duration-200 flex items-center gap-1"
                    >
                        <i className="ri-refresh-line" />
                        Reset
                    </button>
                )}
            </div>

            {/* Category filter */}
            <div className="mb-4 border border-white/5 rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection('category')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/3 hover:bg-white/5 transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                    <span className="text-white/80 font-semibold text-sm">Category</span>
                    <i className={`ri-arrow-down-s-line text-white/30 transition-transform duration-200 ${openSections.category ? 'rotate-180' : ''}`} />
                </button>
                {openSections.category && (
                    <div className="px-4 py-3 space-y-2">
                        {filters.categories.map((cat, i) => (
                            <label
                                key={i}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div
                                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0 ${
                                        filtersState.category === cat
                                            ? 'bg-[#ed3849] border-[#ed3849]'
                                            : 'border-white/20 group-hover:border-white/40'
                                    }`}
                                >
                                    {filtersState.category === cat && (
                                        <i className="ri-check-line text-white text-[10px]" />
                                    )}
                                </div>
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat}
                                    checked={filtersState.category === cat}
                                    onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
                                    className="sr-only"
                                />
                                <span className={`text-sm capitalize transition-colors duration-200 ${
                                    filtersState.category === cat ? 'text-white font-medium' : 'text-white/50 group-hover:text-white/80'
                                }`}>
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Color filter */}
            <div className="mb-4 border border-white/5 rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection('color')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                    <span className="text-white/80 font-semibold text-sm">Color</span>
                    <i className={`ri-arrow-down-s-line text-white/30 transition-transform duration-200 ${openSections.color ? 'rotate-180' : ''}`} />
                </button>
                {openSections.color && (
                    <div className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                            {filters.colors.map((color, i) => (
                                <button
                                    key={i}
                                    onClick={() => setFiltersState({ ...filtersState, color })}
                                    title={color}
                                    className={`relative transition-all duration-200 ${
                                        filtersState.color === color
                                            ? 'scale-110'
                                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                                    }`}
                                >
                                    {color === 'all' ? (
                                        <div
                                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                                                filtersState.color === 'all'
                                                    ? 'border-[#ed3849] text-[#ed3849]'
                                                    : 'border-white/20 text-white/40'
                                            }`}
                                        >
                                            All
                                        </div>
                                    ) : (
                                        <div
                                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                                                filtersState.color === color
                                                    ? 'border-[#ed3849] shadow-lg'
                                                    : 'border-white/10 hover:border-white/30'
                                            }`}
                                            style={{
                                                background: colorMap[color] || color,
                                                boxShadow: filtersState.color === color ? `0 0 12px ${colorMap[color] || color}60` : undefined
                                            }}
                                        />
                                    )}
                                    {filtersState.color === color && color !== 'all' && (
                                        <i className="ri-check-line absolute inset-0 flex items-center justify-center text-white text-xs drop-shadow-md" />
                                    )}
                                </button>
                            ))}
                        </div>
                        {filtersState.color !== 'all' && (
                            <p className="text-white/40 text-xs mt-2 capitalize">Selected: {filtersState.color}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Price range filter */}
            <div className="mb-6 border border-white/5 rounded-xl overflow-hidden">
                <button
                    onClick={() => toggleSection('price')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                    <span className="text-white/80 font-semibold text-sm">Price Range</span>
                    <i className={`ri-arrow-down-s-line text-white/30 transition-transform duration-200 ${openSections.price ? 'rotate-180' : ''}`} />
                </button>
                {openSections.price && (
                    <div className="px-4 py-3 space-y-2">
                        {filters.priceRanges.map((range, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                <div
                                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0 ${
                                        filtersState.priceRange === `${range.min}-${range.max}`
                                            ? 'bg-[#ed3849] border-[#ed3849]'
                                            : 'border-white/20 group-hover:border-white/40'
                                    }`}
                                >
                                    {filtersState.priceRange === `${range.min}-${range.max}` && (
                                        <i className="ri-check-line text-white text-[10px]" />
                                    )}
                                </div>
                                <input
                                    type="radio"
                                    name="priceRange"
                                    value={`${range.min}-${range.max}`}
                                    checked={filtersState.priceRange === `${range.min}-${range.max}`}
                                    onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                                    className="sr-only"
                                />
                                <span className={`text-sm transition-colors duration-200 ${
                                    filtersState.priceRange === `${range.min}-${range.max}`
                                        ? 'text-white font-medium'
                                        : 'text-white/50 group-hover:text-white/80'
                                }`}>
                                    {range.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Clear all */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="w-full py-3 rounded-xl border border-[#ed3849]/30 text-[#ed3849] hover:bg-[#ed3849] hover:text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <i className="ri-filter-off-line" />
                    Clear All Filters
                </button>
            )}
        </aside>
    )
}

export default ShopFiltering
