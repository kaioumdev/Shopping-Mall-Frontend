import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import avatarImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { logout } from '../redux/features/auth/authSlice'
import CartModal from '../pages/shop/CartModal'

const Navbar = () => {
    const products = useSelector((state) => state.cart.products)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)

    // Track scroll for glass effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleCartToggle = () => setIsCartOpen(!isCartOpen)
    const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen)

    const userDropdownMenus = [
        { label: 'Dashboard', path: '/dashboard', icon: 'ri-dashboard-line' },
        { label: 'Profile', path: '/dashboard/profile', icon: 'ri-user-settings-line' },
        { label: 'Payments', path: '/dashboard/payments', icon: 'ri-bank-card-line' },
        { label: 'Orders', path: '/dashboard/orders', icon: 'ri-shopping-bag-3-line' },
    ]

    const adminDropdownMenus = [
        { label: 'Dashboard', path: '/dashboard/admin', icon: 'ri-dashboard-line' },
        { label: 'Manage Items', path: '/dashboard/manage-products', icon: 'ri-box-3-line' },
        { label: 'All Orders', path: '/dashboard/manage-orders', icon: 'ri-file-list-3-line' },
        { label: 'Add Product', path: '/dashboard/add-product', icon: 'ri-add-box-line' },
    ]

    const dropDownMenus = user?.role === 'admin' ? adminDropdownMenus : userDropdownMenus

    const [logoutUser] = useLogoutUserMutation()
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error('Error logging out', error)
        }
    }

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Categories', path: '/categories/dress' },
        { label: 'Contact', path: '/contact' },
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
                    isScrolled
                        ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
                        : 'bg-transparent'
                }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-black text-white hover:text-[#ed3849] transition-colors duration-300 tracking-tight"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        Lebaba<span className="text-[#ed3849]">.</span>
                    </Link>

                    {/* Desktop nav links */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'text-[#ed3849] bg-[#ed3849]/10'
                                                : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Right icons */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Search */}
                        <Link
                            to="/search"
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                            aria-label="Search"
                        >
                            <i className="ri-search-line text-lg" />
                        </Link>

                        {/* Cart */}
                        <button
                            onClick={handleCartToggle}
                            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                            aria-label="Open cart"
                        >
                            <i className="ri-shopping-bag-line text-lg" />
                            {products.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ed3849] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {products.length}
                                </span>
                            )}
                        </button>

                        {/* User / Avatar */}
                        <div className="relative">
                            {user ? (
                                <>
                                    <button
                                        onClick={handleDropDownToggle}
                                        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
                                        aria-expanded={isDropDownOpen}
                                        aria-haspopup="true"
                                    >
                                        <img
                                            src={user?.profileImage || avatarImg}
                                            alt="User avatar"
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className="text-white/70 text-sm hidden sm:block max-w-[80px] truncate">
                                            {user?.name?.split(' ')[0] || 'Account'}
                                        </span>
                                        <i className={`ri-arrow-down-s-line text-white/40 text-sm transition-transform duration-200 ${isDropDownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isDropDownOpen && (
                                        <>
                                            {/* Backdrop */}
                                            <div className="fixed inset-0 z-10" onClick={() => setIsDropDownOpen(false)} />
                                            
                                            <div className="absolute right-0 top-full mt-2 w-52 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-20 overflow-hidden">
                                                {/* User info header */}
                                                <div className="px-4 py-3 border-b border-white/5">
                                                    <p className="text-white font-semibold text-sm truncate">{user?.name || 'User'}</p>
                                                    <p className="text-white/30 text-xs truncate">{user?.email}</p>
                                                </div>

                                                <div className="py-1.5">
                                                    {dropDownMenus.map((menu, index) => (
                                                        <Link
                                                            key={index}
                                                            to={menu.path}
                                                            onClick={() => setIsDropDownOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-sm transition-colors duration-200"
                                                        >
                                                            <i className={`${menu.icon} text-base`} />
                                                            {menu.label}
                                                        </Link>
                                                    ))}
                                                </div>

                                                <div className="border-t border-white/5 p-1.5">
                                                    <button
                                                        onClick={() => { setIsDropDownOpen(false); handleLogout() }}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[#ed3849] hover:bg-[#ed3849]/10 text-sm rounded-lg transition-colors duration-200"
                                                    >
                                                        <i className="ri-logout-box-r-line text-base" />
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#ed3849] hover:bg-[#d23141] text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#ed3849]/25"
                                >
                                    <i className="ri-user-line text-sm" />
                                    <span className="hidden sm:inline">Sign In</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 ml-1"
                            aria-label="Toggle mobile menu"
                        >
                            <i className={`text-lg transition-all duration-200 ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'}`} />
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                <div
                    className={`md:hidden border-t border-white/5 bg-black/90 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        isActive ? 'text-[#ed3849] bg-[#ed3849]/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </header>

            {/* Cart Modal */}
            {isCartOpen && (
                <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
            )}
        </>
    )
}

export default Navbar
