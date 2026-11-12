import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useCurrency } from "../context/CurrencyContext";
import { useState } from "react";
import { coupons } from "../reducers/cartReducer";

const CartPage = () => {
	const [couponInput, setCouponInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const {
		items,
		totalItems,
		totalPrice,
		dispatch,
		shippingCost,
		totalOrderPrice,
		leftToFreeShipping,
		free_shipping_price,
		priceWithDiscount,
		coupon,
		discountPercent,
		discountPrice,
	} = useCart();
	const { priceFormatter } = useCurrency();

	const checkClearCart = () => {
		const check = window.confirm("Are you sure you want to clear the cart?");

		if (check) {
			dispatch({
				type: "CLEAR_CART",
			});
		}
	};
	const progressInPercent = Math.min(
		(priceWithDiscount / free_shipping_price) * 100,
		100,
	);

	const applyDiscount = (e) => {
		e.preventDefault();
		const couponValue = couponInput.trim().toUpperCase();
		if (!coupons[couponValue]) {
			setErrorMessage("This coupon code is not valid.");
		} else {
			dispatch({ type: "APPLY_COUPON", payload: couponValue });
			setCouponInput("");
			setErrorMessage("");
		}
	};
	return (
		<main className="cart-page">
			<h1 className="cart-page__title">Your cart</h1>

			{totalItems === 0 ? (
				<div className="cart-empty">
					<p className="cart-empty__text">Your cart is empty.</p>
					<Link to="/" className="cart-empty__link">
						Continue shopping
					</Link>
				</div>
			) : (
				<div className="cart-page__layout">
					<section className="cart-page__items">
						{items.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</section>

					<aside className="cart-summary">
						<h2 className="cart-summary__title">Order summary</h2>

						<div className="free-shipping">
							{leftToFreeShipping > 0 ? (
								<p className="free-shipping__text">
									Add <strong>{priceFormatter(leftToFreeShipping)}</strong> more
									for free shipping
								</p>
							) : (
								<p className="free-shipping__text free-shipping__text--done">
									🎉 You get free shipping!
								</p>
							)}

							<div className="free-shipping__bar">
								<div
									className="free-shipping__fill"
									style={{ width: `${progressInPercent}%` }}
								/>
							</div>
						</div>

						<div className="coupon">
							{!coupon ? (
								<form onSubmit={applyDiscount} className="coupon__form">
									<label htmlFor="coupon" className="coupon__label">
										Coupon code
									</label>
									<div className="coupon__controls">
										<input
											id="coupon"
											type="text"
											className="coupon__input"
											placeholder="e.g. SAVE10"
											value={couponInput}
											onChange={(e) => setCouponInput(e.target.value)}
										/>
										<button type="submit" className="coupon__apply">
											Apply
										</button>
									</div>
									{errorMessage && (
										<p className="coupon__error">{errorMessage}</p>
									)}
								</form>
							) : (
								<div className="coupon__applied">
									<span className="coupon__tag">
										🏷️ {coupon} <small>(-{discountPercent}%)</small>
									</span>
									<button
										type="button"
										onClick={() => dispatch({ type: "REMOVE_COUPON" })}
										className="coupon__remove"
									>
										Remove
									</button>
								</div>
							)}
						</div>

						<div className="cart-summary__row">
							<span>Items</span>
							<span>{totalItems}</span>
						</div>

						<div className="cart-summary__row">
							<span>Subtotal</span>
							<span>{priceFormatter(totalPrice)}</span>
						</div>

						{coupon && (
							<div className="cart-summary__row cart-summary__row--discount">
								<span>Discount ({coupon})</span>
								<span>-{priceFormatter(discountPrice)}</span>
							</div>
						)}

						<div className="cart-summary__row">
							<span>Shipping</span>
							<span className="cart-summary__shipping">
								{shippingCost === 0 ? "Free" : priceFormatter(shippingCost)}
							</span>
						</div>

						<div className="cart-summary__row cart-summary__row--total">
							<span>Total</span>
							<span>{priceFormatter(totalOrderPrice)}</span>
						</div>

						<Link to="/" className="cart-summary__continue">
							Continue shopping
						</Link>

						<button
							onClick={checkClearCart}
							type="button"
							className="cart-summary__clear"
						>
							Clear cart
						</button>
					</aside>
				</div>
			)}
		</main>
	);
};

export default CartPage;
