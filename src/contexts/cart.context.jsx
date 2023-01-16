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

const addOrRemoveItemQuantity = (cartItems, productId, isAdding) => {
    let newCartItems = [...cartItems];
    const existingProductIndex = newCartItems.findIndex(product => {
        return product.id === productId;
    });

    let quantiy = 0;
    if (existingProductIndex >= 0) {
        quantiy = (isAdding) ? (newCartItems[existingProductIndex].quantity + 1) : (newCartItems[existingProductIndex].quantity - 1);
        newCartItems[existingProductIndex].quantity = quantiy;
    }

    if (quantiy <= 0) {
        newCartItems = removeCartItem(newCartItems, productId);
    }

    return newCartItems;
};

const removeCartItem = (cartItems, productId) => {
    let newCartItems = cartItems.filter(item => {
        return item.id !== productId;
    })

    return newCartItems;
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalItems: 0,
    increaseItemQuantity: () => {},
    decreaseItemQuantity: () => {},
    removeItem: () => {},
    subTotal: 0
});

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce((currentTotal, item) => {
            return currentTotal + item.quantity;
        }, 0);

        setTotalItems(count);
    }, [cartItems]);

    useEffect(() => {
        const totalPrice = cartItems.reduce((currentTotal, item) => {
            return currentTotal + (item.price * item.quantity);
        }, 0);

        setSubTotal(totalPrice);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(prevState => addCartItem(prevState, productToAdd));
    };

    const increaseItemQuantity = (productId) => {
        setCartItems(prevState => addOrRemoveItemQuantity(prevState, productId, true));
    };

    const decreaseItemQuantity = (productId) => {
        setCartItems(prevState => addOrRemoveItemQuantity(prevState, productId, false));
    };

    const removeItem = (productId) => {
        setCartItems(prevState => removeCartItem(prevState, productId));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        totalItems,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        subTotal
    };

    return (
        <CartContext.Provider value={value}>
            { children }
        </CartContext.Provider>
    )
};