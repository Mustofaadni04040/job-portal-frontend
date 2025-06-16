// import { setAllJobs } from "@/redux/jobSlice";
// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getData } from "@/utils/fetch";
// import debounce from "debounce-promise";

// export function useGetAllJobs() {
//   const dispatch = useDispatch();
//   const { searchQuery } = useSelector((store) => store.job);
//   const debouncedGetData = useMemo(() => debounce(getData, 5000), []);

//   useEffect(() => {
//     const fetchAllJobs = async () => {
// const params = {
//   keyword: searchQuery,
// };

//       try {
//         const res = await debouncedGetData("/get-jobs");

//         if (res.data.success) {
//           dispatch(setAllJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAllJobs();
//   }, [debouncedGetData, dispatch]);
// }
