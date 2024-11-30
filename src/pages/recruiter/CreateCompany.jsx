import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { setCompany } from "@/redux/companySlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setCompany(res.data.company));
        toast({
          title: "Success",
          description: res.data.message,
        });
        const companyId = res?.data?.company?._id;
        navigate(`/recruiter/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to sign in",
        description: error.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p>What is your company name?. You can change it later</p>
      </div>

      <Label>Company Name</Label>
      <Input
        type="text"
        className="my-2"
        placeholder="Company Name"
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <div className="flex items-center gap-3 justify-end my-5">
        <Button
          variant="outline"
          onClick={() => navigate("/recruiter/companies")}
        >
          Cancel
        </Button>
        <Button
          className="bg-primary hover:bg-[#e7407d]"
          onClick={registerNewCompany}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
