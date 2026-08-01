import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards'
import { useFetchAllProdutsQuery } from '../../redux/features/products/productsApi';
import Loading from '../../components/Loading';
// import products from "../../data/products.json"

const CategoryPage = () => {
    const {categoryName} = useParams();
    const { data: productsData = {}, error, isLoading } = useFetchAllProdutsQuery({
        category: categoryName?.toLowerCase() || '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 50
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Something went wrong!</div>;

    const { products = [] } = productsData?.data || {};
  
  return (
    <>
        <section className='section__container bg-primary-light'>
           <h2 className='section__header capitalize'>{categoryName}</h2>
           <p className='section__subheader'>Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
        </section>

        {/* Products card */}
        <div className='section__container'>
        <ProductCards products={products}/>
        </div>
    </>
  )
}

export default CategoryPage