import { configureStore } from "@reduxjs/toolkit";

import navBarReducer from "../features/puplic/navBar.js";
import productReducer from "../features/products/product.js";


export const store = configureStore({
    reducer: {
        navBar: navBarReducer,
        product: productReducer,
    },
});

export default store;
