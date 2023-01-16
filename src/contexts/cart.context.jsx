import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    let newCartItems = [...cartItems];
    const existingProductIndex = newCartItems.findIndex(product => {
        return product.id === productToAdd.id;
    });

    if (existingProductIndex >= 0) {
        newCartItems[existingProductIndex].quantity = newCartItems[existingProductIndex].quantity + 1;
    } else {
        newCartItems.push({ ...productToAdd, quantity: 1 });
    }

    return newCartItems;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalItems: 0
});

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce((currentTotal, item) => {
            return currentTotal + item.quantity;
        }, 0);

        setTotalItems(count);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(prevState => addCartItem(prevState, productToAdd));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        totalItems
    };

    return (
        <CartContext.Provider value={value}>
            { children }
        </CartContext.Provider>
    )
};