import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
    companies: [],
    searchCompany: "",
  },
  reducers: {
    // actions
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompany: (state, action) => {
      state.searchCompany = action.payload;
    },
  },
});

export const { setCompany, setCompanies, setSearchCompany } =
  companySlice.actions;
export default companySlice.reducer;
