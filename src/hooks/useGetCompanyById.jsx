import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompany } from "@/redux/companySlice";

export function useGetCompanyById(companyId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_COMPANY_API_END_POINT
          }/get-company/${companyId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, [companyId, dispatch]);
}
