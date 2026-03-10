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
        price: '',
        categoryId: '',
        categoryName: '',
        id:''
    },
    reducers: {

        setFullData: (state, action) => {
            const { name, description, price, categoryId, categoryName, _id } = action.payload;
            state.name = name;
            state.description = description;
            state.price = price;
            state.categoryId = categoryId;
            state.categoryName = categoryName;
            state.id = _id;
        },

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
    resetProduct,
    setFullData
} = productSlice.actions;

export default productSlice.reducer;