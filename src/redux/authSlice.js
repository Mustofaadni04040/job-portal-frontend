import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // state
    loading: false,
  },
  reducers: {
    // action
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
