import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles.jsx';

const CartIcon = ({onToggleCartOpen}) => {
    const { totalItems, setIsCartOpen, isCartOpen } = useContext(CartContext); 
    const toggleCartOpenHandler = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={toggleCartOpenHandler}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{totalItems}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;