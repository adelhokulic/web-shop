import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const ProductCard = ({ product }) => {
	const { dispatch } = useCart();
	const { priceFormatter } = useCurrency();
	return (
		<Card as="article" className="product-card h-100">
			<Link to={`/product/${product.id}`} className="product-card__image-wrap">
				<Card.Img
					variant="top"
					className="product-card__image"
					src={product.thumbnail}
					alt={product.title}
					loading="lazy"
				/>
				<span className="badge rounded-pill badge-soft product-card__category">
					{product.category}
				</span>
			</Link>

			<Card.Body className="d-flex flex-column">
				<p className="product-card__brand">{product.brand}</p>
				<Link to={`/product/${product.id}`} className="product-card__title-link">
					<Card.Title as="h2" className="product-card__title">
						{product.title}
					</Card.Title>
				</Link>

				<div className="product-card__meta">
					<span className="product-card__rating">★ {product.rating}</span>
					<span>In stock: {product.stock}</span>
				</div>

				<div className="product-card__footer">
					<span className="product-card__price">
						{priceFormatter(product.price)}
					</span>
					<Button
						onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
						type="button"
						size="sm"
						variant="primary"
						className="product-card__button"
					>
						Add to cart
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;
