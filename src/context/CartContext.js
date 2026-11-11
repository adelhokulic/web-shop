import { createContext, useContext, useEffect, useReducer } from "react";
import {
	cartReducer,
	initialCartState,
	loadCartData,
} from "../reducers/cartReducer";

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
	return (
		<CartContext.Provider
			value={{
				items: cartState.items,
				dispatch: cartDispatch,
				totalItems,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
