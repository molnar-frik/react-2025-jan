import {createContext, useReducer, useState} from "react";
import {DUMMY_PRODUCTS} from "../dummy-products.js";

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
				const updatedItem = {
					...existingCartItem,
					quantity: existingCartItem.quantity + 1,
				};
				updatedItems[existingCartItemIndex] = updatedItem;
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
		<CartContext.Provider value={ctxValue}>
			{children}
		</CartContext.Provider>
	)
}
