import { useNavigate, useLocation } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const redirectCategoryPageHandler = () => {
        navigate(`${pathname}/${title}`);
    };

    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title' onClick={redirectCategoryPageHandler}>{title}</span> 
            </h2>

            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    );
};

export default CategoryPreview;