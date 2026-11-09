import { initialProducts } from '../data/initialProducts.js';

const STORAGE_KEY = 'mercado-central-state-v1';

export function createInitialState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (Array.isArray(parsed.products) && Array.isArray(parsed.cart)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('No fue posible recuperar el inventario guardado:', error);
  }

  return { products: initialProducts, cart: [] };
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('No fue posible guardar los cambios del inventario:', error);
  }
}

export function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case 'ADD_TO_CART': {
      const { productId, quantity = 1 } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (!product || quantity < 1 || product.stock < quantity) return state;

      const existingItem = state.cart.find((item) => item.productId === productId);
      const updatedCart = existingItem
        ? state.cart.map((item) => item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item)
        : [...state.cart, { productId, quantity }];

      return {
        ...state,
        products: state.products.map((item) => item.id === productId
          ? { ...item, stock: item.stock - quantity }
          : item),
        cart: updatedCart
      };
    }

    case 'INCREASE_CART_ITEM': {
      const { productId } = action.payload;
      const product = state.products.find((item) => item.id === productId);
      if (!product || product.stock < 1) return state;

      return {
        ...state,
        products: state.products.map((item) => item.id === productId
          ? { ...item, stock: item.stock - 1 }
          : item),
        cart: state.cart.map((item) => item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item)
      };
    }

    case 'DECREASE_CART_ITEM': {
      const { productId } = action.payload;
      const cartItem = state.cart.find((item) => item.productId === productId);
      if (!cartItem) return state;

      return {
        ...state,
        products: state.products.map((item) => item.id === productId
          ? { ...item, stock: item.stock + 1 }
          : item),
        cart: cartItem.quantity === 1
          ? state.cart.filter((item) => item.productId !== productId)
          : state.cart.map((item) => item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item)
      };
    }

    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      const cartItem = state.cart.find((item) => item.productId === productId);
      if (!cartItem) return state;

      return {
        ...state,
        products: state.products.map((item) => item.id === productId
          ? { ...item, stock: item.stock + cartItem.quantity }
          : item),
        cart: state.cart.filter((item) => item.productId !== productId)
      };
    }

    default:
      return state;
  }
}
