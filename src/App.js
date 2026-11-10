import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import ProductsPage from "./pages/ProductsPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ProductsPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
