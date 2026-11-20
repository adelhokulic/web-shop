import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
	const { totalItems } = useCart();
	return (
		<Link to="/cart" className="cart-icon" aria-label="Cart">
			<svg
				className="cart-icon__svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<circle cx="9" cy="21" r="1" />
				<circle cx="20" cy="21" r="1" />
				<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
			</svg>
			{totalItems > 0 && (
				<Badge pill bg="danger" className="cart-icon__badge">
					{totalItems}
				</Badge>
			)}
		</Link>
	);
};

export default CartIcon;
