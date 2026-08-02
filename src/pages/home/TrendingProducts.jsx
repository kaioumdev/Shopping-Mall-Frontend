import React, { useState } from 'react'

// import products from '../../data/products.json'
import ProductCards from '../shop/ProductCards';
import { useFetchAllProdutsQuery } from '../../redux/features/products/productsApi';
import Loading from '../../components/Loading';

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    const { data: productsData = {}, error, isLoading } = useFetchAllProdutsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 12
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Something went wrong!</div>;

    const { products = [] } = productsData?.data || {};
    console.log("trending products", {products});

    const loadMoreProducts =() => {
        setVisibleProducts(preCount => preCount + 4)
    }

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader'>Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.
            </p>

            {/* products card */}
            <div className='mt-8'>
            <ProductCards products={products.slice(0, visibleProducts)}/>
            </div>

            {/* load more btn */}
            <div className='product__btn'>
                {
                   visibleProducts < products.length && 
                   <button onClick={loadMoreProducts} className='btn'>
                    Load More
                   </button> 
                }
            </div>
        </section>
    )
}

export default TrendingProducts