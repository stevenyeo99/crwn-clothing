import { Fragment, useContext } from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import Footer from '../../components/footer/footer.component';

import { selectCurrentUser } from '../../store/user/user.selector';

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles.jsx';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo />
                </LogoContainer>
                
                <NavLinksContainer>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>

                    {
                        currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink to="/auth">SIGN IN</NavLink>)
                    }

                    <CartIcon />
                </NavLinksContainer>

                { isCartOpen && <CartDropdown /> }
            </NavigationContainer>

            <Outlet />

            <Footer />
        </Fragment>
    );
};

export default Navigation;