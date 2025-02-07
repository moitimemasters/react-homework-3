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
        setCategories(state, action: PayloadAction<Category[]>) {
            state.items = action.payload;
        },
        addCategory(state, action: PayloadAction<Category>) {
            state.items.push(action.payload);
        },
    },
});

export const { setCategories, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
