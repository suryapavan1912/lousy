import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    Add: (state,action) => {
      state.value  = action.payload ;
    },
    Remove: (state) => {
      state.value  = null ;
    },
  },
});

export const { Add, Remove } = counterSlice.actions;
export const userr = (state) => state.counter.value;
export default counterSlice.reducer;
