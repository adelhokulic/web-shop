import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import CartIcon from "./CartIcon";
import CurrencySelect from "./CurrencySelect";

const Navbar = () => {
	return (
		<BsNavbar expand="md" sticky="top" className="site-nav">
			<Container>
				<BsNavbar.Brand as={Link} to="/" className="site-nav__logo">
					Web<span>Shop</span>
				</BsNavbar.Brand>

				{/* cart stays visible on mobile, next to the hamburger */}
				<div className="d-flex align-items-center gap-2 order-md-last">
					<CartIcon />
					<BsNavbar.Toggle aria-controls="main-nav" className="site-nav__toggle" />
				</div>

				<BsNavbar.Collapse id="main-nav">
					<Nav className="ms-auto align-items-md-center gap-md-3">
						<Nav.Link as={NavLink} to="/" end className="site-nav__link">
							Products
						</Nav.Link>
						<Nav.Link as={NavLink} to="/cart" className="site-nav__link">
							Cart
						</Nav.Link>
						<div className="py-2 py-md-0 me-md-2">
							<CurrencySelect />
						</div>
					</Nav>
				</BsNavbar.Collapse>
			</Container>
		</BsNavbar>
	);
};

export default Navbar;
