import { Form } from "react-bootstrap";
import { currencies, useCurrency } from "../context/CurrencyContext";

const CurrencySelect = () => {
	const { currency, updateCurrency } = useCurrency();
	return (
		<div className="currency-select">
			<Form.Label htmlFor="currency" className="visually-hidden">
				Currency
			</Form.Label>
			<Form.Select
				size="sm"
				value={currency}
				onChange={(e) => updateCurrency(e.target.value)}
				id="currency"
				className="currency-select__select"
			>
				{Object.keys(currencies).map((currency) => {
					return (
						<option key={currency} value={currency}>
							{currency}
						</option>
					);
				})}
			</Form.Select>
		</div>
	);
};

export default CurrencySelect;
