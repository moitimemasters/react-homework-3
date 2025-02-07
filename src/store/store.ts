import { configureStore } from '@reduxjs/toolkit';
import goodsReducer from './goodsSlice';
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
  reducer: {
    goods: goodsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
