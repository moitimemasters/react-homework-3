import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardProps } from '../types';
import cardData from "../data/cards.json"



interface FilterState {
    search: string;
    nonZeroStock: boolean;
    category: number;
}

interface GoodsState {
    items: CardProps[];
    filter: FilterState;
}

const initialState: GoodsState = {
    items: cardData,
    filter: {
        search: '',
        nonZeroStock: false,
        category: -1,
    },
};

const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        setGoods(state, action: PayloadAction<CardProps[]>) {
            state.items = action.payload;
        },
        updateFilterCriteria(state, action: PayloadAction<FilterState>) {
            state.filter = { ...state.filter, ...action.payload };
        },
        resetFilterCriteria(state) {
            state.filter = { search: '', nonZeroStock: false, category: -1 };
        },
    },
});

export const { setGoods, updateFilterCriteria, resetFilterCriteria } = goodsSlice.actions;
export default goodsSlice.reducer;
