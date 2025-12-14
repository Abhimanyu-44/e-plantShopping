import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const idx = state.items.findIndex(
        (i) => i.name === product.name
      );

      if (idx !== -1) {
        state.items[idx].quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(
        (i) => i.name !== name
      );
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const item = state.items.find(
        (i) => i.name === name
      );

      if (item) {
        item.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
