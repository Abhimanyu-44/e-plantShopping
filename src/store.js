// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import the cart reducer that manages the cart slice
import cartReducer from './CartSlice';

// Create a Redux store using configureStore
const store = configureStore({
    // Define the root reducer object
    reducer: {
        // 'cart' slice is managed by cartReducer
        cart: cartReducer,
    },
});

// Export the store to use it in your app (e.g., in <Provider store={store}>)
export default store;
