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
    addArchivedJob: (state, action) => {
      if (!state.getArchived.includes(action.payload)) {
        state.getArchived.push(action.payload);
      }
    },
    removeArchivedJob: (state, action) => {
      state.getArchived = state.getArchived.filter(
        (id) => id !== action.payload
      );
    },
    setRemovedArchived: (state, action) => {
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
  addArchivedJob,
  removeArchivedJob,
} = jobSlice.actions;
export default jobSlice.reducer;
