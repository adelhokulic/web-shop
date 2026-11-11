import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ProductsPage />} />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
