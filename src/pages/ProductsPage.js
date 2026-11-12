import { useEffect, useState } from "react";
import {
	fetchCategories,
	fetchProducts,
	fetchProductsByCategories,
} from "../fetch/fetchApi";
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
		<main className="products-page">
			<header className="products-page__header">
				<div>
					<h1 className="products-page__title">Discover our products</h1>
					<p className="products-page__subtitle">
						Pick a category and find something you'll love
					</p>
				</div>

				<div className="products-page__filter">
					<label htmlFor="category" className="products-page__label">
						Category
					</label>
					<select
						id="category"
						className="products-page__select"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="">All</option>
						{categories.map((category) => {
							return (
								<option key={category} value={category}>
									{category}
								</option>
							);
						})}
					</select>
				</div>
			</header>
			{errorMessage && (
				<p className="products-page__message products-page__message--error">
					{errorMessage}
				</p>
			)}

			<ProductList products={products} />
		</main>
	);
};

export default ProductsPage;
