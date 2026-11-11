import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<ProductsPage />} />
					<Route path="/cart" element={<CartPage />} />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
