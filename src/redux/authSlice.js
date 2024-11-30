import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // state
    loading: false,
    user: null,
    token: null,
  },
  reducers: {
    // action
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setLoading, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
