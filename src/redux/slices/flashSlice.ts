import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  value: any;
}
interface IPayload {
  value: number;
}

const initialState = { value: 0 } as IState;

export const flashSlice = createSlice({
  name: "flash",
  initialState: initialState,
  reducers: {
    setFlashIndex: (state, action: PayloadAction<IPayload>) => {
      state.value = action.payload.value;
    },
  },
});

export const { setFlashIndex } = flashSlice.actions;
export const flashReducer = flashSlice.reducer;
