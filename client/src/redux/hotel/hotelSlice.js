import { createSlice } from "@reduxjs/toolkit";

// Initial states
const initialState = {
    currentHotel: null,
    error: null,
    loading: false,
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentHotel = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = hotelSlice.actions;

export default hotelSlice.reducer;