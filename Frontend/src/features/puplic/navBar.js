import { createSlice } from "@reduxjs/toolkit";

export const navBarSlice = createSlice({
    name: "navBar",
    initialState: {
        isOpen: window.innerWidth > 1024,
    },
    reducers: {
        toggleNavBar: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { toggleNavBar } = navBarSlice.actions;

export default navBarSlice.reducer;