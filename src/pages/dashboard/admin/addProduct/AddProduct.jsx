import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import UploadImage from './UploadImage'
import { useAddProductMutation } from '../../../../redux/features/products/productsApi'

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Dress', value: 'dress' },
    { label: 'Jewellery', value: 'jewellery' },
    { label: 'Cosmetics', value: 'cosmetics' },
]

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' },
]

const AddProduct = () => {
    const { user } = useSelector(state => state.auth)
    const [product, setProduct] = useState({ name: '', category: '', description: '', price: '', color: '' })
    const [image, setImage] = useState('')
    const [AddProduct, { isLoading }] = useAddProductMutation()

    const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!product.name || !product.category || !product.price || !product.color || !product.description) {
            alert('Please fill in all fields.')
            return
        }
        try {
            await AddProduct({ ...product, image, author: user?._id }).unwrap()
            alert('Product added successfully!')
            setProduct({ name: '', category: '', description: '', price: '', color: '' })
            setImage('')
        } catch (err) {
            console.error('Failed to add product:', err)
            alert('Failed to add product. Please try again.')
        }
    }

    return (
        <div>
            {/* Header */}
            <div className='mb-8'>
                <p className='text-white/30 text-xs tracking-widest uppercase mb-1'>Admin</p>
                <h1 className='text-3xl font-black text-white' style={{ fontFamily: '"Playfair Display", serif' }}>
                    Add New Product
                </h1>
                <p className='text-white/40 text-sm mt-1'>Fill in the details below to list a new product</p>
            </div>

            <div className='rounded-2xl border border-white/5 p-6 md:p-8' style={{ background: 'rgba(255,255,255,0.02)' }}>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <TextInput type='text' label='Product Name' name='name' placeholder='e.g. Diamond Earrings'
                            value={product.name} onChange={handleChange} />
                        <TextInput type='number' label='Price ($)' name='price' placeholder='e.g. 49.99'
                            value={product.price} onChange={handleChange} />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <SelectInput label='Category' name='category' value={product.category}
                            onChange={handleChange} options={categories} />
                        <SelectInput label='Color' name='color' value={product.color}
                            onChange={handleChange} options={colors} />
                    </div>

                    <UploadImage label='Product Image' name='image' id='image' setImage={setImage} />

                    <div>
                        <label htmlFor='description' className='block text-white/50 text-xs font-medium mb-2'>
                            Description
                        </label>
                        <textarea
                            name='description' id='description' rows={5}
                            value={product.description} onChange={handleChange}
                            placeholder='Describe the product in detail...'
                            className='w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none transition-all duration-200 border focus:border-[#ed3849]/50 resize-none'
                            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                    </div>

                    <div className='pt-2'>
                        <button type='submit' disabled={isLoading}
                            className='flex items-center gap-2 px-8 py-3.5 bg-[#ed3849] hover:bg-[#d23141] disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#ed3849]/25'>
                            {isLoading
                                ? <><div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' /> Adding...</>
                                : <><i className='ri-add-line' /> Add Product</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
