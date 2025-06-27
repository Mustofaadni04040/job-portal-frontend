import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allRecruiterJobs: [],
    detailJob: {},
    applied: false,
    jobsApplied: [],
    searchQuery: "",
    savedJobs: [],
    archived: false,
    getArchived: [],
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
    setJobsApplied: (state, action) => {
      state.jobsApplied = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    setArchived: (state, action) => {
      state.archived = action.payload;
    },
    setGetArchived: (state, action) => {
      state.getArchived = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setDetailJob,
  setApplied,
  setAllRecruiterJobs,
  setJobsApplied,
  setSearchQuery,
  setSavedJobs,
  setArchived,
  setGetArchived,
} = jobSlice.actions;
export default jobSlice.reducer;
