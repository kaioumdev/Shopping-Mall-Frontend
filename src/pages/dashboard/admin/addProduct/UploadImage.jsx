import React, { useState } from 'react'
import axios from 'axios'
import { getBaseUrl } from '../../../../utils/getBaseUrl'

const UploadImage = ({ name, setImage, label, id }) => {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')

    const convertBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
    })

    const uploadSingleImage = async (base64) => {
        setLoading(true)
        try {
            const res = await axios.post(`${getBaseUrl()}/uploadImage`, { image: base64 })
            const imageUrl = res.data
            setUrl(imageUrl)
            setImage(imageUrl)
            alert('Image uploaded successfully!')
        } catch (err) {
            console.error('Failed to upload image', err)
            alert('Failed to upload image, please try again!')
        } finally {
            setLoading(false)
        }
    }

    const uploadImage = async (e) => {
        const files = e.target.files
        if (!files?.length) return
        const base64 = await convertBase64(files[0])
        uploadSingleImage(base64)
    }

    return (
        <div>
            <label htmlFor={name} className='block text-white/50 text-xs font-medium mb-2'>
                {label || 'Product Image'}
            </label>

            <label htmlFor={id || name}
                className='flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 hover:border-[#ed3849]/40 group'
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed' }}>
                <div className='w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0'
                    style={{ background: 'rgba(237,56,73,0.1)', border: '1px solid rgba(237,56,73,0.2)' }}>
                    <i className='ri-upload-cloud-2-line text-[#ed3849] text-lg' />
                </div>
                <div>
                    <p className='text-white/60 text-sm font-medium group-hover:text-white transition-colors'>
                        {loading ? 'Uploading...' : url ? 'Change image' : 'Click to upload image'}
                    </p>
                    <p className='text-white/25 text-xs'>PNG, JPG, WEBP supported</p>
                </div>
                <input type='file' id={id || name} name={name} onChange={uploadImage} className='sr-only' accept='image/*' />
            </label>

            {loading && (
                <div className='flex items-center gap-2 mt-2 text-white/40 text-xs'>
                    <div className='w-3 h-3 border border-white/30 border-t-[#ed3849] rounded-full animate-spin' />
                    Uploading to cloud...
                </div>
            )}

            {url && (
                <div className='mt-3 flex items-center gap-3 p-3 rounded-xl border border-green-500/20'
                    style={{ background: 'rgba(16,185,129,0.05)' }}>
                    <img src={url} alt='Uploaded' className='w-12 h-12 rounded-lg object-cover' />
                    <div>
                        <p className='text-green-400 text-xs font-medium'>Image uploaded</p>
                        <p className='text-white/30 text-xs truncate max-w-[200px]'>{url}</p>
                    </div>
                    <i className='ri-checkbox-circle-fill text-green-400 ml-auto' />
                </div>
            )}
        </div>
    )
}

export default UploadImage
