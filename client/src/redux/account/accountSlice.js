import { createSlice } from "@reduxjs/toolkit";

// Initial states
const initialState = {
    currentAccount: null,
    error: null,
    loading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentAccount = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = accountSlice.actions;

export default accountSlice.reducer;