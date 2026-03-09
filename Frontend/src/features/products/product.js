import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        name: {
            en: "",
            ar: ""
        },
        description: {
            en: "",
            ar: ""
        },
        price: 0,
        categoryId: '',
    },
    reducers: {
        setName: (state, action) => {
            const { lang, value } = action.payload;
            state.name[lang] = value;
        },

        setDescription: (state, action) => {
            const { lang, value } = action.payload;
            state.description[lang] = value;
        },

        setPrice: (state, action) => {
            state.price = action.payload;
        },

        setCategory: (state, action) => {
            state.categoryId = action.payload;
        },

        resetProduct: (state) => {
            state.name = { en: "", ar: "" };
            state.description = { en: "", ar: "" };
            state.price = 0;
            state.categoryId = null;
        }
    }
});

export const {
    setName,
    setDescription,
    setPrice,
    setCategory,
    resetProduct
} = productSlice.actions;

export default productSlice.reducer;