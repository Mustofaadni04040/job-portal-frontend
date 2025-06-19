// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setAllRecruiterJobs } from "@/redux/jobSlice";

// export function useGetRecruiterJobs() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchRecruiterJobs = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_JOB_API_END_POINT}/get-admin-jobs`,
//           { withCredentials: true }
//         );

//         if (res.data.success) {
//           dispatch(setAllRecruiterJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchRecruiterJobs();
//   }, [dispatch]);
// }
