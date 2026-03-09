import { configureStore } from "@reduxjs/toolkit";

import navBarReducer from "../features/puplic/navBar.js";
import productReducer from "../features/products/product.js";
import categoryReducer from "../features/categories/category.js";


export const store = configureStore({
    reducer: {
        navBar: navBarReducer,
        product: productReducer,
        category: categoryReducer,
    },
});

export default store;
