import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUsersQuery } from '../../../../redux/features/auth/authApi'
import Loading from '../../../../components/Loading'
import UpdateUserModal from './‎UpdateUserModal'
import avatarImg from '../../../../assets/avatar.png'

const ManageUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const { data, isLoading, error, refetch } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()

    if (isLoading) return <Loading />
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 text-white/30'>
            <i className='ri-error-warning-line text-5xl mb-3' />
            <p>Failed to load users</p>
        </div>
    )

    const users = data?.data || []

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Delete this user?')) return
        try {
            await deleteUser(id).unwrap()
            alert('User deleted successfully!')
            refetch()
        } catch (err) {
            console.error('Failed to delete user', err)
        }
    }

    const handleEdit = (user) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }

    return (
        <div>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Admin</p>
                    <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                        All Users
                    </h1>
                </div>
                <span className='px-3 py-1 rounded-full text-xs font-semibold'
                    style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {users.length} Users
                </span>
            </div>

            <div className='rounded-2xl border border-white/5 overflow-hidden' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b border-white/5' style={{ background: 'rgba(255,255,255,0.03)' }}>
                                {['#', 'User', 'Email', 'Role', 'Actions'].map(h => (
                                    <th key={h} className='text-left px-5 py-3.5 text-white/40 text-xs font-semibold tracking-wider uppercase'>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className='text-center py-16 text-white/25'>
                                        <i className='ri-group-line text-4xl block mb-2' />
                                        No users found
                                    </td>
                                </tr>
                            ) : users.map((user, index) => (
                                <tr key={user._id}
                                    className='border-b border-white/5 hover:bg-white/2 transition-colors last:border-b-0'>
                                    <td className='px-5 py-4 text-white/40 text-sm'>{index + 1}</td>
                                    <td className='px-5 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <img src={user?.profileImage || avatarImg} alt=''
                                                className='w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0' />
                                            <span className='text-white/70 text-sm font-medium'>{user?.username || '—'}</span>
                                        </div>
                                    </td>
                                    <td className='px-5 py-4 text-white/60 text-sm'>{user?.email}</td>
                                    <td className='px-5 py-4'>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${user?.role === 'admin'
                                            ? 'bg-[#ed3849]/15 text-[#ed3849] border-[#ed3849]/25'
                                            : 'bg-white/8 text-white/50 border-white/10'}`}>
                                            {user?.role}
                                        </span>
                                    </td>
                                    <td className='px-5 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <button onClick={() => handleEdit(user)}
                                                className='w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-500/10 border border-blue-500/20 transition-all duration-200'
                                                title='Edit user'>
                                                <i className='ri-edit-line text-sm' />
                                            </button>
                                            <button onClick={() => handleDeleteUser(user?._id)}
                                                className='w-8 h-8 rounded-lg flex items-center justify-center text-[#ed3849] hover:bg-[#ed3849]/10 border border-[#ed3849]/20 transition-all duration-200'
                                                title='Delete user'>
                                                <i className='ri-delete-bin-7-line text-sm' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch} />
            )}
        </div>
    )
}

export default ManageUsers
