import ApplicantsTable from "@/components/fragments/recruiter/ApplicantsTable";
import { setApplicants } from "@/redux/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APPLICATION_API_END_POINT}/${
            params.id
          }/applicants`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <ApplicantsTable />
    </div>
  );
}
