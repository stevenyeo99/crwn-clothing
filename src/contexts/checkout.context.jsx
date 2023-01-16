import { createContext, useEffect, useState } from "react";

export const CheckoutContext = createContext({
    checkoutItems: [],
    subTotal: 0
});

export const CheckoutProvider = ({children}) => {
    return (
        <CheckoutContext.Provider>
            {children}
        </CheckoutContext.Provider>
    )
};