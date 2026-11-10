import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
	return (
		<section className="products-grid">
			{products.map((product) => {
				return <ProductCard key={product.id} product={product} />;
			})}
		</section>
	);
};

export default ProductList;
