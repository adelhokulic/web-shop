import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
		<main className="product-page">
			<Link to="/" className="product-page__back">
				← Back to products
			</Link>
			{errorMessage && (
				<p className="products-page__message products-page__message--error">
					{errorMessage}
				</p>
			)}

			{!isLoading && product && (
				<div className="product-page__layout">
					<section className="gallery">
						<div className="gallery__main">
							<img
								className="gallery__main-image"
								src={selectedImage}
								alt={product.title}
							/>
						</div>

						<div className={`gallery__thumbs`}>
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

					<section className="product-info">
						<span className="product-info__category">{product.category}</span>
						<h1 className="product-info__title">{product.title}</h1>
						<p className="product-info__brand">{product.brand}</p>

						<div className="product-info__meta">
							<span className="product-info__rating">★ {product.rating}</span>
							<span className="product-info__stock">
								{product.availabilityStatus} · {product.stock} in stock
							</span>
						</div>

						<p className="product-info__price">
							{priceFormatter(product.price)}
						</p>

						<p className="product-info__description">{product.description}</p>

						<button
							onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
							type="button"
							className="product-info__button"
						>
							Add to cart
						</button>

						<ul className="product-info__details">
							<li>
								<span>Warranty</span>
								<span>{product.warrantyInformation}</span>
							</li>
							<li>
								<span>Shipping</span>
								<span>{product.shippingInformation}</span>
							</li>
							<li>
								<span>Returns</span>
								<span>{product.returnPolicy}</span>
							</li>
						</ul>
					</section>
				</div>
			)}
			{isLoading && <p className="products-page__message">Loading...</p>}
		</main>
	);
};

export default SingleProductPage;
