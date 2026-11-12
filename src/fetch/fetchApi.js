import axios from "axios";

export const fetchProducts = async () => {
	const response = await axios.get(
		`${process.env.REACT_APP_PRODUCTS_API_URL}`,
		{
			params: { limit: 0 },
		},
	);
	const data = response.data;
	return data;
};
export const fetchCategories = async () => {
	const response = await axios.get(`${process.env.REACT_APP_CATEGORY_API_URL}`);
	const data = response.data;
	return data;
};
export const fetchProductsByCategories = async (selectedCategory) => {
	const response = await axios.get(
		`${process.env.REACT_APP_PRODUCTS_FROM_CATEGORY_API_URL}/${selectedCategory}`,
	);
	const data = response.data;
	return data;
};
export const fetchProductById = async (id) => {
	const response = await axios.get(
		`${process.env.REACT_APP_PRODUCTS_API_URL}/${id}`,
	);
	const data = response.data;
	return data;
};
