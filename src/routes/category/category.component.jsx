import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [ categoryProducts, setCategoryProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setCategoryProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <div className='category-container'>
            {
                categoryProducts &&
                categoryProducts.map(product => {
                    return <ProductCard product={product} />
                })
            }
        </div>
    );
};

export default Category;