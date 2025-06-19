import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    // state
    applicants: [],
  },
  reducers: {
    // action
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setApplicantStatus: (state, action) => {
      const { id, status } = action.payload;
      const applicant = state.applicants.find((a) => a._id === id);
      if (applicant) {
        applicant.status = status;
      }
    },
  },
});

export const { setApplicants, setApplicantStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
