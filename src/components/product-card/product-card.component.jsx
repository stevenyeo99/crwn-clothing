import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, imageUrl, price } = product;

    const addProductToCart = () => {
        addItemToCart(product);
    };

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to Card</Button>
        </div>
    )
};

export default ProductCard;