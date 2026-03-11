import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        name: {
            en: "",
            ar: ""
        },
        description: {
            en: "",
            ar: ""
        },
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
        setFullData: (state, action) => {
            const { name, description ,_id} = action.payload;
            state.name = name;
            state.description = description;
            state.id = _id;

        },
        resetCategory: (state) => {
            state.name = { en: "", ar: "" };
            state.description = { en: "", ar: "" };
        }
    }
});

export const {
    setName,
    setDescription,
    setFullData,
    resetCategory
} = categorySlice.actions;

export default categorySlice.reducer;
