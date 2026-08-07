import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi'

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user?.role)
    const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation()

    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ userId: user?._id, role }).unwrap()
            alert('User role updated successfully!')
            onRoleUpdate()
            onClose()
        } catch (error) {
            console.error('Failed to update user role', error)
            alert('Failed to update role. Please try again.')
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
            <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />
            <div className='relative rounded-2xl border border-white/10 w-full max-w-sm overflow-hidden'
                style={{ background: '#1a1a1a' }}>
                {/* Header */}
                <div className='flex items-center justify-between px-6 py-5 border-b border-white/5'>
                    <h2 className='text-white font-bold text-lg' style={{ fontFamily: '"Playfair Display", serif' }}>
                        Edit User Role
                    </h2>
                    <button onClick={onClose}
                        className='w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all'>
                        <i className='ri-close-line text-lg' />
                    </button>
                </div>

                {/* Body */}
                <div className='p-6 space-y-4'>
                    <div>
                        <label className='block text-white/50 text-xs font-medium mb-2'>Email</label>
                        <input
                            type='text'
                            value={user.email}
                            readOnly
                            className='w-full px-4 py-3 rounded-xl text-white/50 text-sm border focus:outline-none cursor-not-allowed'
                            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                        />
                    </div>

                    <div>
                        <label className='block text-white/50 text-xs font-medium mb-2'>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='w-full px-4 py-3 rounded-xl text-white text-sm border focus:outline-none focus:border-[#ed3849]/50 transition-all appearance-none'
                            style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>

                    <div className='flex gap-3 pt-2'>
                        <button onClick={onClose}
                            className='flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium transition-all duration-200'>
                            Cancel
                        </button>
                        <button onClick={handleUpdateRole} disabled={isLoading}
                            className='flex-1 py-2.5 rounded-xl bg-[#ed3849] hover:bg-[#d23141] disabled:opacity-50 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2'>
                            {isLoading ? <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' /> : null}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserModal