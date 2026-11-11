import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const CartPage = () => {
	const { items, totalItems, totalPrice, dispatch } = useCart();

	const checkClearCart = () => {
		const check = window.confirm("Are you sure you want to clear the cart?");

		if (check) {
			dispatch({
				type: "CLEAR_CART",
			});
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

						<div className="cart-summary__row">
							<span>Items</span>
							<span>{totalItems}</span>
						</div>

						<div className="cart-summary__row cart-summary__row--total">
							<span>Total</span>
							<span>${totalPrice.toFixed(2)}</span>
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
