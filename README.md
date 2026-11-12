# Web Shop

A responsive online store built with React. Products come from the [DummyJSON](https://dummyjson.com/docs/products) API, and the cart is global state managed with **Context API + `useReducer`**, persisted in `localStorage`.

The project focuses on clean state management: one reducer owns every change to the cart, components read shared state through custom hooks instead of prop drilling, and all totals are derived from the cart contents instead of being stored separately.

## Features

**Products**
- Product list loaded from DummyJSON, with category filter
- Product details page with an image gallery (`/product/:id`)
- Loading and error states (e.g. a product that does not exist)

**Cart**
- Add to cart from the product list or the product page
- Adding the same product again increases its quantity instead of creating a new row
- Quantity is always between 1 and the product's available stock (`+` / `−` buttons are disabled at the limits)
- Remove a single item, or clear the whole cart after a confirmation
- Cart icon in the navbar shows the item count without receiving any props
- Cart and applied coupon survive a page refresh (`localStorage`)

**Pricing**
- Currency switcher (USD, EUR, RSD) that updates every price in the app instantly
- Coupon codes (`SAVE10`, `SAVE20`, `SAVE30`) — case-insensitive, invalid codes show an error
- Free shipping above a threshold, with a progress bar showing how much is left
- Shipping threshold is checked against the price **after** the discount

## Tech Stack

| Area | Tools |
|---|---|
| UI | React 19 (function components, hooks) |
| Routing | React Router 7 |
| State | Context API, `useReducer`, `useState` |
| Data fetching | Axios, `async/await`, DummyJSON REST API |
| Persistence | `localStorage` |
| Styling | Custom CSS (CSS variables, Grid, Flexbox), mobile-first |
| Tooling | Create React App, ESLint, Prettier, Git |

## Architecture

```
src/
├── components/        # Reusable UI: Navbar, CartIcon, CurrencySelect, ProductCard, ProductList, CartItem
├── context/
│   ├── CartContext.js      # CartProvider, useCart() hook, derived totals
│   └── CurrencyContext.js  # CurrencyProvider, useCurrency() hook, exchange rates, price formatting
├── reducers/
│   └── cartReducer.js      # Cart actions, initial state, coupon codes
├── fetch/
│   └── fetchApi.js         # All API calls in one place
├── pages/             # ProductsPage, SingleProductPage, CartPage
├── App.js             # Providers and routes
└── App.css            # All styles, organised by component
```

### Cart state and actions

The cart state is intentionally small:

```js
{
  items: [{ id, title, price, thumbnail, stock, quantity }],
  coupon: "SAVE10" | null
}
```

| Action | Payload | What it does |
|---|---|---|
| `ADD_ITEM` | product | Adds the product, or increases its quantity up to `stock` |
| `REMOVE_ITEM` | `id` | Removes one item |
| `CHANGE_QUANTITY` | `{ id, quantity }` | Sets the quantity, clamped between 1 and `stock` |
| `CLEAR_CART` | — | Empties the cart |
| `APPLY_COUPON` | code | Applies the coupon if it exists |
| `REMOVE_COUPON` | — | Removes the coupon |

The reducer never mutates state. Every action returns a new object built with spread, `map` and `filter`.

### Design decisions

- **Derived values are calculated, not stored.** Item count, subtotal, discount, shipping and order total are computed from `items` on every render. They can never get out of sync with the cart.
- **Only the coupon code is stored, not the discount amount.** The amount depends on the cart contents, so it is recalculated whenever the cart changes. An emptied cart automatically has no discount.
- **Prices are kept in USD.** The currency is applied only when a price is displayed, through one `priceFormatter` function, so the reducer and `localStorage` stay currency-independent.
- **Two separate contexts.** Cart and currency are unrelated concerns, so each has its own provider and hook.
- **Validation on both sides.** The reducer rejects unknown coupon codes, and the cart page validates the code too so it can show an error message to the user.
- **Safe persistence.** The cart is loaded once with `useReducer`'s lazy initializer, and corrupted `localStorage` data falls back to an empty cart instead of crashing the app.

## Getting Started

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/<your-username>/web-shop.git
cd web-shop
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment variables

API URLs are read from `.env` (they are public DummyJSON endpoints, no keys required):

```
REACT_APP_CATEGORY_API_URL=https://dummyjson.com/products/category-list
REACT_APP_PRODUCTS_API_URL=https://dummyjson.com/products
REACT_APP_PRODUCTS_FROM_CATEGORY_API_URL=https://dummyjson.com/products/category
```

### Scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run build` | Creates a production build in `build/` |

## What I Learned

- Solving prop drilling with `createContext`, a Provider and custom hooks
- Modelling state changes as reducer actions with `dispatch`
- Writing immutable updates for nested state (arrays of objects)
- Working with multiple contexts in one app
- Syncing state with `localStorage` through `useEffect`
- Handling loading, error and "not found" states for async data
- Dynamic routes with `useParams`

## Possible Improvements

- Unit tests for the reducer and integration tests for the cart flow (React Testing Library)
- Product search and sorting
- Live exchange rates from an API instead of hardcoded rates
- Migration to TypeScript
