const ProductCard = ({ product }) => {
	return (
		<article className="product-card">
			<div className="product-card__image-wrap">
				<img
					className="product-card__image"
					src={product.thumbnail}
					alt={product.title}
					loading="lazy"
				/>
				<span className="product-card__category">{product.category}</span>
			</div>

			<div className="product-card__body">
				<p className="product-card__brand">{product.brand}</p>
				<h2 className="product-card__title">{product.title}</h2>

				<div className="product-card__meta">
					<span className="product-card__rating">★ {product.rating}</span>
					<span className="product-card__stock">Na stanju: {product.stock}</span>
				</div>

				<div className="product-card__footer">
					<p className="product-card__price">${product.price}</p>
					{/* TODO (logika): onClick koji dodaje proizvod u korpu */}
					<button type="button" className="product-card__button">
						Dodaj u korpu
					</button>
				</div>
			</div>
		</article>
	);
};

export default ProductCard;
