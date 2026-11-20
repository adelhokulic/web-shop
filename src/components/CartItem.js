import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const CartItem = ({ item }) => {
	const { dispatch } = useCart();
	const { priceFormatter } = useCurrency();
	return (
		<Card as="article" className="cart-item">
			<Card.Body className="cart-item__body">
				<img className="cart-item__image" src={item.thumbnail} alt={item.title} />

				<div className="cart-item__info">
					<h2 className="cart-item__title">{item.title}</h2>
					<p className="cart-item__price">{priceFormatter(item.price)}</p>
					<p className="cart-item__stock">In stock: {item.stock}</p>
				</div>

				<ButtonGroup size="sm" className="cart-item__quantity">
					<Button
						variant="outline-secondary"
						disabled={item.quantity === 1}
						onClick={() => {
							dispatch({
								type: "CHANGE_QUANTITY",
								payload: { id: item.id, quantity: item.quantity - 1 },
							});
						}}
						type="button"
						className="qty-btn"
						aria-label="Decrease quantity"
					>
						−
					</Button>
					<span className="qty-value">{item.quantity}</span>
					<Button
						variant="outline-secondary"
						disabled={item.quantity === item.stock}
						onClick={() => {
							dispatch({
								type: "CHANGE_QUANTITY",
								payload: { id: item.id, quantity: item.quantity + 1 },
							});
						}}
						type="button"
						className="qty-btn"
						aria-label="Increase quantity"
					>
						+
					</Button>
				</ButtonGroup>

				<p className="cart-item__total">
					{priceFormatter(item.price * item.quantity)}
				</p>

				<Button
					variant="link"
					size="sm"
					onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
					type="button"
					className="cart-item__remove"
				>
					Remove
				</Button>
			</Card.Body>
		</Card>
	);
};

export default CartItem;
