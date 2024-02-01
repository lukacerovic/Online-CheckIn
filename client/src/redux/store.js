import { configureStore } from '@reduxjs/toolkit'
import hotelReducer from './hotel/hotelSlice.js';

export const store = configureStore({
  reducer: {hotel: hotelReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})