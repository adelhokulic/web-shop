import { createContext, useContext, useReducer } from "react";
import { cartReducer, initialCartState } from "../reducers/cartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

	return (
		<CartContext.Provider
			value={{ items: cartState.items, dispatch: cartDispatch }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
