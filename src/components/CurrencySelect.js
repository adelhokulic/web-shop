import { currencies, useCurrency } from "../context/CurrencyContext";

const CurrencySelect = () => {
	const { currency, updateCurrency } = useCurrency();
	return (
		<div className="currency-select">
			<label htmlFor="currency" className="currency-select__label">
				Currency
			</label>
			<select
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
			</select>
		</div>
	);
};

export default CurrencySelect;
