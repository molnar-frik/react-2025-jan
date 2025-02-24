import {createContext, useReducer} from "react";
import {DUMMY_PRODUCTS} from "../dummy-products.js";

// A shopping-cart-context.jsx fájl a kosár állapotának kezelésére szolgál
// A CartContext egy kontextus, amely alapértelmezett értékeket tartalmaz (items, addItemToCart, updateCartItems).
// A shoppingCartReducer függvény kezeli a kosár állapotának változásait kétféle akcióval: ADD_ITEM és UPDATE_ITEM.
// A CartContextProvider komponens körülveszi az alkalmazást, és biztosítja a kosár állapotát és a kezelő függvényeket.

// A createContext használata azért szükséges, mert ez hozza létre a kontextust, amelyet a CartContextProvider biztosít a gyermek komponensek számára.
// A CartContext maga a kontextus objektum, amelyet a useContext hook segítségével lehet elérni a különböző komponensekben.
// A CartContextProvider pedig a kontextus értékét biztosítja a fa alatti komponensek számára a shoppingCartReducer segítségével.

// A komponensekben használt useContext(CartContext) a kontextus objektumot adja vissza, amelyet a CartContextProvider biztosít.
// Szintaktikája szerint csak azt kell lekérni belőle, amit az aktuális komponensben használni szeretnénk:
// const {addItemToCart} = useContext(CartContext);
// const {items} = useContext(CartContext);
// const {items, updateCartItems} = useContext(CartContext);

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {
    },
    updateCartItems: () => {
    },
});


function shoppingCartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const updatedItems = [...state.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.payload
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                updatedItems[existingCartItemIndex] = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
                updatedItems.push({
                    id: action.payload,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }
            return {
                ...state,
                items: updatedItems,
            };
        }
        case 'UPDATE_ITEM': {
            const updatedItems = [...state.items];
            const updatedCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.payload.productId
            );

            const updatedItem = {
                ...updatedItems[updatedCartItemIndex]
            }

            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedCartItemIndex, 1);
            } else {
                updatedItems[updatedCartItemIndex] = updatedItem;
            }

            return {
                ...state,
                items: updatedItems,
            }

        }
        default: {
            return state
        }
    }
}

export default function CartContextProvider({children}) {

    const [shoppingCartSate, dispatchShoppingCart] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    )

    function handleAddItemToCart(id) {
        dispatchShoppingCart({
            type: "ADD_ITEM",
            payload: id,
        })
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        dispatchShoppingCart({
            type: "UPDATE_ITEM",
            payload: {
                productId,
                amount,
            }
        })
    }

    const ctxValue = {
        items: shoppingCartSate.items,
        addItemToCart: handleAddItemToCart,
        updateCartItems: handleUpdateCartItemQuantity,
    }

    return (
        <CartContext.Provider value = {ctxValue}>
            {children}
        </CartContext.Provider>
    )
}
