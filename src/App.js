import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import { CurrencyProvider } from "./context/CurrencyContext";

function App() {
	return (
		<CartProvider>
			<CurrencyProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<ProductsPage />} />
						<Route path="/cart" element={<CartPage />} />
					</Routes>
				</BrowserRouter>
			</CurrencyProvider>
		</CartProvider>
	);
}

export default App;
