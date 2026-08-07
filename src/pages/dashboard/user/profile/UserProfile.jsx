import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditProfileMutation } from '../../../../redux/features/auth/authApi'
import { setUser } from '../../../../redux/features/auth/authSlice'
import avatarImg from '../../../../assets/avatar.png'

const inputCls = 'w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none transition-all duration-200 border focus:border-[#ed3849]/50'
const inputStyle = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }

const UserProfile = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [formData, setFormData] = useState({
        username: '',
        profileImage: '',
        bio: '',
        profession: '',
        userId: ''
    })

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                profileImage: user?.profileImage || '',
                bio: user?.bio || '',
                profession: user?.profession || '',
                userId: user?._id || ''
            })
        }
    }, [user])

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const [editProfile, { isLoading }] = useEditProfileMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await editProfile({
                id: user?._id,
                profileData: {
                    username: formData.username,
                    profileImage: formData.profileImage,
                    bio: formData.bio,
                    profession: formData.profession,
                    userId: formData.userId
                }
            }).unwrap()
            dispatch(setUser(response.data))
            alert('Profile updated successfully')
            setIsModalOpen(false)
        } catch {
            alert('Failed to update profile. Please try again.')
        }
    }

    return (
        <div>
            {/* Page header */}
            <div className='mb-8'>
                <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Account</p>
                <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                    My Profile
                </h1>
            </div>

            {/* Profile card */}
            <div className='rounded-2xl border border-white/5 p-6 md:p-8' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                    {/* Avatar */}
                    <div className='relative flex-shrink-0'>
                        <img
                            src={formData.profileImage || avatarImg}
                            alt='Profile'
                            className='w-24 h-24 rounded-2xl object-cover border-2 border-white/10'
                        />
                    </div>

                    {/* Info */}
                    <div className='flex-1 min-w-0'>
                        <h2 className='text-white text-xl font-bold mb-1'>{formData.username || 'No username set'}</h2>
                        <p className='text-white/40 text-sm mb-1'>{formData.profession || 'No profession set'}</p>
                        <p className='text-white/30 text-sm'>{formData.bio || 'No bio written yet'}</p>
                    </div>

                    {/* Edit button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/25 text-sm font-medium transition-all duration-200 flex-shrink-0'>
                        <i className='ri-edit-line' />
                        Edit Profile
                    </button>
                </div>

                {/* Meta row */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/5'>
                    {[
                        { label: 'Email', value: user?.email, icon: 'ri-mail-line' },
                        { label: 'Role', value: user?.role, icon: 'ri-shield-user-line' },
                        { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A', icon: 'ri-calendar-line' },
                    ].map(({ label, value, icon }) => (
                        <div key={label} className='flex items-center gap-3 p-3 rounded-xl' style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <i className={`${icon} text-[#ed3849] text-lg`} />
                            <div>
                                <p className='text-white/30 text-xs'>{label}</p>
                                <p className='text-white text-sm font-medium capitalize'>{value || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit modal */}
            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
                    <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={() => setIsModalOpen(false)} />
                    <div className='relative rounded-2xl border border-white/10 w-full max-w-md overflow-hidden'
                        style={{ background: '#1a1a1a' }}>
                        {/* Modal header */}
                        <div className='flex items-center justify-between px-6 py-5 border-b border-white/5'>
                            <h2 className='text-white font-bold text-lg' style={{ fontFamily: '"Playfair Display", serif' }}>Edit Profile</h2>
                            <button onClick={() => setIsModalOpen(false)}
                                className='w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all'>
                                <i className='ri-close-line text-lg' />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
                            {[
                                { id: 'username', label: 'Username', type: 'text', placeholder: 'Your username' },
                                { id: 'profileImage', label: 'Profile Image URL', type: 'text', placeholder: 'https://...' },
                                { id: 'profession', label: 'Profession', type: 'text', placeholder: 'e.g. Fashion Designer' },
                            ].map(({ id, label, type, placeholder }) => (
                                <div key={id}>
                                    <label htmlFor={id} className='block text-white/50 text-xs font-medium mb-1.5'>{label}</label>
                                    <input id={id} type={type} name={id} value={formData[id]} onChange={handleChange}
                                        placeholder={placeholder} className={inputCls} style={inputStyle} />
                                </div>
                            ))}

                            <div>
                                <label htmlFor='bio' className='block text-white/50 text-xs font-medium mb-1.5'>Bio</label>
                                <textarea id='bio' name='bio' rows={3} value={formData.bio} onChange={handleChange}
                                    placeholder='Tell us about yourself...'
                                    className={`${inputCls} resize-none`} style={inputStyle} />
                            </div>

                            <div className='flex gap-3 pt-2'>
                                <button type='button' onClick={() => setIsModalOpen(false)}
                                    className='flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium transition-all duration-200'>
                                    Cancel
                                </button>
                                <button type='submit' disabled={isLoading}
                                    className='flex-1 py-3 rounded-xl bg-[#ed3849] hover:bg-[#d23141] disabled:opacity-50 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2'>
                                    {isLoading ? <><div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' /> Saving...</> : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile
