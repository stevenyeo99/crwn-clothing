import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({item}) => {
    const { removeItem, increaseItemQuantity, decreaseItemQuantity } = useContext(CartContext);
    const {id, name, imageUrl, price, quantity} = item;
    
    const increaseQuantityHandler = () => {
        increaseItemQuantity(id);
    }

    const decreaseQuantityHandler = () => {
        decreaseItemQuantity(id);
    }

    const removeItemHandler = () => {
        removeItem(id);
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            
            <div className='name'>{name}</div>
            <div className='quantity'>
                <div className='arrow' onClick={decreaseQuantityHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseQuantityHandler}>&#10095;</div>
            </div>
            <div className='price'><span>{price}</span></div>
            <div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;