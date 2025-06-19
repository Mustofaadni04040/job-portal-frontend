import ApplicantsTable from "@/components/fragments/recruiter/ApplicantsTable";
import { setApplicants } from "@/redux/applicationSlice";
import { getData } from "@/utils/fetch";
import debounce from "debounce-promise";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Applicants() {
  const paramsId = useParams();
  const dispatch = useDispatch();
  const debouncedGetData = useMemo(() => debounce(getData, 1000), []);
  const [loading, setLoading] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(5);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          limit: 5,
        };
        const res = await debouncedGetData(
          `${import.meta.env.VITE_APPLICATION_API_END_POINT}/${
            paramsId.id
          }/applicants`,
          params,
          null,
          true
        );

        if (res.data.success) {
          dispatch(setApplicants(res.data.applicants));
          setSkeletonCount(res?.data?.applicants?.length);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllApplicants();
  }, [debouncedGetData, dispatch, paramsId.id]);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <ApplicantsTable loading={loading} skeletonCount={skeletonCount} />
    </div>
  );
}
