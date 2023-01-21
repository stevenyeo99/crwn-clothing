import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.util";

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

export const CART_ACTION_TYPES = {
    TOGGLE_CART_DISPLAY: 'TOGGLE_CART_DISPLAY',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.TOGGLE_CART_DISPLAY:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            throw new Error(`Unhandler action type: ${type}`);
    }
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalItems: 0,
    subTotal: 0
};

export const CartProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, totalItems, subTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const totalItems = newCartItems.reduce((currentTotal, item) => {
            return currentTotal + item.quantity;
        }, 0);

        const subTotal = newCartItems.reduce((currentTotal, item) => {
            return currentTotal + (item.price * item.quantity);
        }, 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                totalItems: totalItems,
                subTotal: subTotal
            }
        ));
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_DISPLAY, bool));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const increaseItemQuantity = (productId) => {
        const newCartItems = addOrRemoveItemQuantity(cartItems, productId, true);
        updateCartItemsReducer(newCartItems);
    };

    const decreaseItemQuantity = (productId) => {
        const newCartItems = addOrRemoveItemQuantity(cartItems, productId, false);
        updateCartItemsReducer(newCartItems);
    };

    const removeItem = (productId) => {
        const newCartItems = removeCartItem(cartItems, productId);
        updateCartItemsReducer(newCartItems);
    };

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