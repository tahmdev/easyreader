import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  value: string;
}
interface IPayload {
  value: string;
}

const initialState = { value: "reader" } as IState;

export const displaySlice = createSlice({
  name: "display",
  initialState: initialState,
  reducers: {
    setDisplay: (state, action: PayloadAction<IPayload>) => {
      const newState =
        action.payload.value !== state.value ? action.payload.value : "reader";
      state.value = newState;
    },
  },
});

export const { setDisplay } = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
