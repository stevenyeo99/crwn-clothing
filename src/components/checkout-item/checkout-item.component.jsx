import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, Name, Quantity, Price, RemoveButton } from './checkout-item.styles.jsx';

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
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            
            <Name>{name}</Name>
            <Quantity>
                <div className='arrow' onClick={decreaseQuantityHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseQuantityHandler}>&#10095;</div>
            </Quantity>
            <Price><span>{price}</span></Price>
            <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;