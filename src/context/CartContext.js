import { createContext, useContext, useEffect, useReducer } from "react";
import {
	cartReducer,
	initialCartState,
	loadCartData,
} from "../reducers/cartReducer";

export const free_shipping_price = 100;
const shipping_cost = 10;

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartState, cartDispatch] = useReducer(
		cartReducer,
		initialCartState,
		loadCartData,
	);

	useEffect(() => {
		localStorage.setItem("cartData", JSON.stringify(cartState));
	}, [cartState]);
	const totalItems = cartState.items.reduce(
		(total, item) => total + item.quantity,
		0,
	);
	const totalPrice = cartState.items.reduce(
		(total, item) => total + item.quantity * item.price,
		0,
	);
	const shippingCost = totalPrice >= free_shipping_price ? 0 : shipping_cost;
	const totalOrderPrice = totalPrice + shippingCost;
	const leftToFreeShipping = Math.max(
		free_shipping_price - totalPrice,
		0,
	);
	return (
		<CartContext.Provider
			value={{
				items: cartState.items,
				dispatch: cartDispatch,
				totalItems,
				totalPrice,
				shippingCost,
				totalOrderPrice,
				leftToFreeShipping,
				free_shipping_price,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
