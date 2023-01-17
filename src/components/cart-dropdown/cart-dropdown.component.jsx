import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import Button from'../button/button.component';

import { CartContext } from '../../contexts/cart.context';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const navigateCheckoutPageHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item} />)) : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                    
                }
            </CartItems>
            <Button onClick={navigateCheckoutPageHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;