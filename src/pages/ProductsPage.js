import { useEffect, useState } from "react";
import {
	fetchCategories,
	fetchProducts,
	fetchProductsByCategories,
} from "../fetch/fetchApi";
import { Alert, Button, Container } from "react-bootstrap";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const loadDatas = async () => {
			try {
				const categoriesResponse = await fetchCategories();
				setCategories(categoriesResponse);
				setErrorMessage("");
			} catch (error) {
				setErrorMessage("Something went wrong, please try again.");
			}
		};
		loadDatas();
	}, []);

	useEffect(() => {
		const loadDatas = async () => {
			try {
				const productsResponse =
					selectedCategory === ""
						? await fetchProducts()
						: await fetchProductsByCategories(selectedCategory);
				const productsData = productsResponse.products;
				setProducts(productsData);
				setErrorMessage("");
			} catch (error) {
				setErrorMessage("Something went wrong, please try again.");
			}
		};
		loadDatas();
	}, [selectedCategory]);

	return (
		<main>
			<section className="hero">
				<Container>
					<p className="hero__eyebrow">Web Shop</p>
					<h1 className="hero__title">Discover our products</h1>
					<p className="hero__subtitle">
						Pick a category and find something you'll love
					</p>
				</Container>
			</section>

			<Container className="page">
				<div className="category-bar" role="group" aria-label="Category">
					<Button
						type="button"
						variant={selectedCategory === "" ? "primary" : "outline-secondary"}
						className="category-pill"
						aria-pressed={selectedCategory === ""}
						onClick={() => setSelectedCategory("")}
					>
						All
					</Button>
					{categories.map((category) => {
						return (
							<Button
								key={category}
								type="button"
								variant={
									selectedCategory === category ? "primary" : "outline-secondary"
								}
								className="category-pill"
								aria-pressed={selectedCategory === category}
								onClick={() => setSelectedCategory(category)}
							>
								{category}
							</Button>
						);
					})}
				</div>

				{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

				<p className="results-count">{products.length} products</p>

				<ProductList products={products} />
			</Container>
		</main>
	);
};

export default ProductsPage;
