import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const Navbar = () => {
	return (
		<header className="site-nav">
			<nav className="site-nav__inner">
				<Link to="/" className="site-nav__logo">
					Web<span>Shop</span>
				</Link>

				<div className="site-nav__links">
					<Link to="/" className="site-nav__link">
						Products
					</Link>
					<CartIcon />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
