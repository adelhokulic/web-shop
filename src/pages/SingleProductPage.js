import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	Alert,
	Badge,
	Button,
	Card,
	Col,
	Container,
	ListGroup,
	Row,
	Spinner,
} from "react-bootstrap";
import { fetchProductById } from "../fetch/fetchApi";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

const SingleProductPage = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState("");
	const { priceFormatter } = useCurrency();
	const { dispatch } = useCart();

	useEffect(() => {
		const loadDatas = async () => {
			setIsLoading(true);
			try {
				const productResponse = await fetchProductById(id);
				setProduct(productResponse);
				setSelectedImage(productResponse.images[0]);
				setErrorMessage("");
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setErrorMessage("Something went wrong, please try again.");
			}
		};
		loadDatas();
	}, [id]);

	return (
		<Container as="main" className="page">
			<Link to="/" className="back-link">
				← Back to products
			</Link>
			{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

			{!isLoading && product && (
				<Row className="g-4 g-lg-5 fade-up">
					<Col md={6}>
						<section className="gallery">
							<Card className="gallery__main">
								<img
									className="gallery__main-image"
									src={selectedImage}
									alt={product.title}
								/>
							</Card>

							<div className="gallery__thumbs">
								{product.images.map((image) => {
									return (
										<button
											type="button"
											onClick={() => setSelectedImage(image)}
											key={image}
											className={`gallery__thumb ${selectedImage === image ? "gallery__thumb--active" : ""}`}
										>
											<img src={image} alt={product.title} />
										</button>
									);
								})}
							</div>
						</section>
					</Col>

					<Col md={6}>
						<section className="product-info">
							<span className="badge rounded-pill badge-soft">
								{product.category}
							</span>
							<h1 className="product-info__title">{product.title}</h1>
							<p className="product-info__brand">{product.brand}</p>

							<div className="product-info__meta">
								<span className="product-info__rating">★ {product.rating}</span>
								<Badge
									pill
									bg={product.stock > 0 ? "success" : "secondary"}
									className="product-info__stock"
								>
									{product.availabilityStatus} · {product.stock} in stock
								</Badge>
							</div>

							<p className="product-info__price">
								{priceFormatter(product.price)}
							</p>

							<p className="product-info__description">{product.description}</p>

							<Button
								onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
								type="button"
								variant="primary"
								size="lg"
								className="product-info__button"
							>
								Add to cart
							</Button>

							<ListGroup variant="flush" className="product-info__details">
								<ListGroup.Item>
									<span>Warranty</span>
									<span>{product.warrantyInformation}</span>
								</ListGroup.Item>
								<ListGroup.Item>
									<span>Shipping</span>
									<span>{product.shippingInformation}</span>
								</ListGroup.Item>
								<ListGroup.Item>
									<span>Returns</span>
									<span>{product.returnPolicy}</span>
								</ListGroup.Item>
							</ListGroup>
						</section>
					</Col>
				</Row>
			)}
			{isLoading && (
				<div className="loading">
					<Spinner animation="border" role="status" variant="primary" />
					<p>Loading...</p>
				</div>
			)}
		</Container>
	);
};

export default SingleProductPage;
