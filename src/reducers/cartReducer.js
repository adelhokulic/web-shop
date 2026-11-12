export const coupons = {
	SAVE10: 10,
	SAVE20: 20,
	SAVE30: 30,
};

export const initialCartState = {
	items: [],
	coupon: null,
};

export const loadCartData = () => {
	const cartData = localStorage.getItem("cartData");
	if (cartData) {
		try {
			return JSON.parse(cartData);
		} catch (error) {
			return initialCartState;
		}
	} else return initialCartState;
};

export const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM": {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id,
			);
			if (existingItem) {
				return {
					...state,
					items: state.items.map((item) => {
						if (item.id === action.payload.id) {
							return {
								...item,
								quantity: Math.min(item.quantity + 1, item.stock),
							};
						}
						return item;
					}),
				};
			}
			return {
				...state,
				items: [
					...state.items,
					{
						id: action.payload.id,
						title: action.payload.title,
						price: action.payload.price,
						thumbnail: action.payload.thumbnail,
						stock: action.payload.stock,
						quantity: 1,
					},
				],
			};
		}

		case "REMOVE_ITEM":
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			};
		case "CHANGE_QUANTITY":
			return {
				...state,
				items: state.items.map((item) => {
					if (item.id === action.payload.id) {
						return {
							...item,
							quantity: Math.max(
								1,
								Math.min(action.payload.quantity, item.stock),
							),
						};
					}
					return item;
				}),
			};
		case "CLEAR_CART":
			return { ...state, items: [] };

		case "APPLY_COUPON":
			if (coupons[action.payload.toUpperCase().trim()]) {
				return { ...state, coupon: action.payload.toUpperCase().trim() };
			}
			return state;

		case "REMOVE_COUPON":
			return { ...state, coupon: null };
		default:
			return state;
	}
};
