import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
	return (
		<Row xs={1} sm={2} lg={3} xl={4} className="g-4">
			{products.map((product, index) => {
				return (
					<Col
						key={product.id}
						className="fade-up"
						// cards appear one after another (max 0.6s delay)
						style={{ animationDelay: `${Math.min(index, 12) * 50}ms` }}
					>
						<ProductCard product={product} />
					</Col>
				);
			})}
		</Row>
	);
};

export default ProductList;
