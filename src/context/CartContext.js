import { createContext, useContext, useEffect, useReducer } from "react";
import {
	cartReducer,
	initialCartState,
	loadCartData,
	coupons,
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
	const discountPercent = cartState.coupon ? coupons[cartState.coupon] : 0;
	const discountPrice = (totalPrice * discountPercent) / 100;
	const priceWithDiscount = totalPrice - discountPrice;

	const shippingCost =
		priceWithDiscount >= free_shipping_price ? 0 : shipping_cost;
	const totalOrderPrice = priceWithDiscount + shippingCost;

	const leftToFreeShipping = Math.max(
		free_shipping_price - priceWithDiscount,
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
				coupon: cartState.coupon,
				discountPercent,
				discountPrice,
				priceWithDiscount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
