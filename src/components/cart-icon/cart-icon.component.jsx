import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = ({onToggleCartOpen}) => {
    const { setIsCartOpen } = useContext(CartContext); 
    const toggleCartOpenHandler = () => {
        setIsCartOpen(prevState => !prevState);
    }

    return (
        <div className='cart-icon-container' onClick={toggleCartOpenHandler}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    );
};

export default CartIcon;