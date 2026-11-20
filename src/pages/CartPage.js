import { Link } from "react-router-dom";
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	InputGroup,
	ProgressBar,
	Row,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useCurrency } from "../context/CurrencyContext";
import { useState } from "react";
import { coupons } from "../reducers/cartReducer";

const CartPage = () => {
	const [couponInput, setCouponInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const {
		items,
		totalItems,
		totalPrice,
		dispatch,
		shippingCost,
		totalOrderPrice,
		leftToFreeShipping,
		free_shipping_price,
		priceWithDiscount,
		coupon,
		discountPercent,
		discountPrice,
	} = useCart();
	const { priceFormatter } = useCurrency();

	const checkClearCart = () => {
		const check = window.confirm("Are you sure you want to clear the cart?");

		if (check) {
			dispatch({
				type: "CLEAR_CART",
			});
		}
	};
	const progressInPercent = Math.min(
		(priceWithDiscount / free_shipping_price) * 100,
		100,
	);

	const applyDiscount = (e) => {
		e.preventDefault();
		const couponValue = couponInput.trim().toUpperCase();
		if (!coupons[couponValue]) {
			setErrorMessage("This coupon code is not valid.");
		} else {
			dispatch({ type: "APPLY_COUPON", payload: couponValue });
			setCouponInput("");
			setErrorMessage("");
		}
	};
	return (
		<Container as="main" className="page">
			<h1 className="page__title">Your cart</h1>

			{totalItems === 0 ? (
				<Card className="cart-empty fade-up">
					<Card.Body>
						<div className="cart-empty__icon" aria-hidden="true">
							🛒
						</div>
						<p className="cart-empty__text">Your cart is empty.</p>
						<Button as={Link} to="/" variant="primary">
							Continue shopping
						</Button>
					</Card.Body>
				</Card>
			) : (
				<Row className="g-4">
					<Col lg={8}>
						<section className="cart-page__items">
							{items.map((item) => (
								<CartItem key={item.id} item={item} />
							))}
						</section>
					</Col>

					<Col lg={4}>
						<Card as="aside" className="cart-summary">
							<Card.Body className="cart-summary__body">
								<h2 className="cart-summary__title">Order summary</h2>

								<div className="free-shipping">
									{leftToFreeShipping > 0 ? (
										<p className="free-shipping__text">
											Add <strong>{priceFormatter(leftToFreeShipping)}</strong>{" "}
											more for free shipping
										</p>
									) : (
										<p className="free-shipping__text free-shipping__text--done">
											🎉 You get free shipping!
										</p>
									)}

									<ProgressBar
										now={progressInPercent}
										className="free-shipping__bar"
										variant={leftToFreeShipping > 0 ? "primary" : "success"}
										aria-label="Progress to free shipping"
									/>
								</div>

								<div className="coupon">
									{!coupon ? (
										<Form onSubmit={applyDiscount} className="coupon__form">
											<Form.Label htmlFor="coupon" className="coupon__label">
												Coupon code
											</Form.Label>
											<InputGroup>
												<Form.Control
													id="coupon"
													type="text"
													className="coupon__input"
													placeholder="e.g. SAVE10"
													value={couponInput}
													onChange={(e) => setCouponInput(e.target.value)}
													isInvalid={!!errorMessage}
												/>
												<Button type="submit" variant="outline-primary">
													Apply
												</Button>
												{errorMessage && (
													<Form.Control.Feedback
														type="invalid"
														className="coupon__error"
													>
														{errorMessage}
													</Form.Control.Feedback>
												)}
											</InputGroup>
										</Form>
									) : (
										<div className="coupon__applied">
											<span className="coupon__tag">
												🏷️ {coupon} <small>(-{discountPercent}%)</small>
											</span>
											<Button
												variant="link"
												size="sm"
												type="button"
												onClick={() => dispatch({ type: "REMOVE_COUPON" })}
												className="coupon__remove"
											>
												Remove
											</Button>
										</div>
									)}
								</div>

								<div className="cart-summary__rows">
									<div className="cart-summary__row">
										<span>Items</span>
										<span>{totalItems}</span>
									</div>

									<div className="cart-summary__row">
										<span>Subtotal</span>
										<span>{priceFormatter(totalPrice)}</span>
									</div>

									{coupon && (
										<div className="cart-summary__row cart-summary__row--discount">
											<span>Discount ({coupon})</span>
											<span>-{priceFormatter(discountPrice)}</span>
										</div>
									)}

									<div className="cart-summary__row">
										<span>Shipping</span>
										<span
											className={
												shippingCost === 0 ? "cart-summary__shipping" : ""
											}
										>
											{shippingCost === 0 ? "Free" : priceFormatter(shippingCost)}
										</span>
									</div>

									<div className="cart-summary__row cart-summary__row--total">
										<span>Total</span>
										<span>{priceFormatter(totalOrderPrice)}</span>
									</div>
								</div>

								<div className="d-grid gap-2">
									<Button as={Link} to="/" variant="primary">
										Continue shopping
									</Button>
									<Button
										onClick={checkClearCart}
										type="button"
										variant="outline-danger"
									>
										Clear cart
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default CartPage;
