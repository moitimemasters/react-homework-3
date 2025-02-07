import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';

interface CategoriesState {
    items: Category[];
}

const initialState: CategoriesState = {
    items: [
        { id: 1, name: 'Вещи' },
        { id: 2, name: 'Животные', description: 'Животные' },
    ],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.items.push(action.payload);
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.items.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteCategory: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(cat => cat.id !== action.payload);
        },
    },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
