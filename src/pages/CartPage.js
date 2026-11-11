import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useCurrency } from "../context/CurrencyContext";

const CartPage = () => {
	const {
		items,
		totalItems,
		totalPrice,
		dispatch,
		shippingCost,
		totalOrderPrice,
		leftToFreeShipping,
		free_shipping_price,
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
		(totalPrice / free_shipping_price) * 100,
		100,
	);
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

						<div className="cart-summary__row">
							<span>Items</span>
							<span>{totalItems}</span>
						</div>

						<div className="cart-summary__row">
							<span>Subtotal</span>
							<span>{priceFormatter(totalPrice)}</span>
						</div>

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
