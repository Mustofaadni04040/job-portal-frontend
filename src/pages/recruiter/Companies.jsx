import CompaniesTable from "@/components/fragments/recruiter/CompaniesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllCompanies } from "@/hooks/useGetAllCompanies";
import { setSearchCompany } from "@/redux/companySlice";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Companies() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompany(input));
  }, [dispatch, input]);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <Input
          className="w-fit"
          placeholder="Filter by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="flex items-center gap-2 bg-primary hover:bg-[#e7407d]"
          onClick={() => navigate("/recruiter/companies/create")}
        >
          <Plus />
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
}
