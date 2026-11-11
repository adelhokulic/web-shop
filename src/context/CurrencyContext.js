import { createContext, useContext, useState } from "react";

export const currencies = {
	USD: { rate: 1, symbol: "$" },
	EUR: { rate: 0.92, symbol: "€" },
	RSD: { rate: 108, symbol: "RSD" },
};

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
	const [currency, setCurrency] = useState("USD");
	const priceFormatter = (price) => {
		const result = (price * currencies[currency].rate).toFixed(2);
		return `${result} ${currencies[currency].symbol}`;
	};

	const updateCurrency = (newCurrency) => {
		setCurrency(newCurrency);
	};

	return (
		<CurrencyContext.Provider
			value={{ currency, updateCurrency, priceFormatter }}
		>
			{children}
		</CurrencyContext.Provider>
	);
};

export const useCurrency = () => useContext(CurrencyContext);
