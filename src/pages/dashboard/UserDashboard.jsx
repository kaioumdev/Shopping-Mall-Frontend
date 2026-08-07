import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { logout } from '../../redux/features/auth/authSlice'
import avatarImg from '../../assets/avatar.png'

const navItems = [
    { path: '/dashboard',          label: 'Overview',          icon: 'ri-pie-chart-2-line',    end: true },
    { path: '/dashboard/orders',   label: 'My Orders',         icon: 'ri-shopping-bag-3-line', end: false },
    { path: '/dashboard/payments', label: 'Payments',          icon: 'ri-bank-card-line',      end: false },
    { path: '/dashboard/profile',  label: 'Profile',           icon: 'ri-user-settings-line',  end: false },
    { path: '/dashboard/reviews',  label: 'My Reviews',        icon: 'ri-star-line',           end: false },
]

const UserDashboard = () => {
    const { user } = useSelector(state => state.auth)
    const [logoutUser] = useLogoutUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error('Error logging out', error)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh' }}>
            {/* Logo */}
            <div className='px-6 pt-6 pb-4 border-b border-white/5'>
                <Link to='/'>
                    <span className='text-2xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                        Lebaba<span className='text-[#ed3849]'>.</span>
                    </span>
                </Link>
                <div className='mt-2'>
                    <span className='inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full'
                        style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        My Account
                    </span>
                </div>
            </div>

            {/* User info */}
            <div className='px-4 py-4 border-b border-white/5'>
                <div className='flex items-center gap-3 px-3 py-3 rounded-xl' style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <img
                        src={user?.profileImage || avatarImg}
                        alt='user avatar'
                        className='w-10 h-10 rounded-full object-cover border-2 border-white/10 flex-shrink-0'
                    />
                    <div className='min-w-0'>
                        <p className='text-white text-sm font-semibold truncate'>{user?.username || 'User'}</p>
                        <p className='text-white/30 text-xs truncate'>{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Nav links — explicitly column */}
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '12px 12px 8px' }}>
                <p className='text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase px-3 mb-2'>Menu</p>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? 'text-[#ed3849]'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`
                        }
                        style={({ isActive }) => isActive
                            ? { background: 'rgba(237,56,73,0.12)', border: '1px solid rgba(237,56,73,0.18)', display: 'flex', marginBottom: '2px' }
                            : { display: 'flex', marginBottom: '2px' }
                        }
                    >
                        <i className={`${item.icon} text-base`} style={{ width: '20px', textAlign: 'center' }} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Spacer to push bottom links down */}
            <div style={{ flex: 1 }} />

            {/* Bottom */}
            <div className='border-t border-white/5' style={{ padding: '16px 12px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Link to='/shop'
                    className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all'>
                    <i className='ri-store-line text-base' style={{ width: '20px', textAlign: 'center' }} />
                    Continue Shopping
                </Link>
                <button
                    onClick={handleLogout}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}
                    className='px-3 py-2.5 rounded-xl text-sm text-[#ed3849] hover:bg-[#ed3849]/10 transition-all duration-200'>
                    <i className='ri-logout-box-r-line text-base' style={{ width: '20px', textAlign: 'center' }} />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default UserDashboard
