import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allRecruiterJobs: [],
    detailJob: {},
    applied: false,
    jobsApplied: [],
    searchJob: "",
    searchQuery: "",
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setDetailJob: (state, action) => {
      state.detailJob = action.payload;
    },
    setApplied: (state, action) => {
      state.applied = action.payload;
    },
    setAllRecruiterJobs: (state, action) => {
      state.allRecruiterJobs = action.payload;
    },
    setSearchJob: (state, action) => {
      state.searchJob = action.payload;
    },
    setJobsApplied: (state, action) => {
      state.jobsApplied = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setDetailJob,
  setApplied,
  setAllRecruiterJobs,
  setSearchJob,
  setJobsApplied,
  setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
