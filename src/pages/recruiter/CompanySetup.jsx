import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useGetCompanyById } from "@/hooks/useGetCompanyById";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanySetup() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { company } = useSelector((store) => store.company);

  const handleChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    // const file = e.target.files?.[0]
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/recruiter/companies");
        toast({
          title: "Success",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to sign in",
        description: error.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: company.name || "",
      description: company.description || "",
      website: company.website || "",
      location: company.location || "",
      file: company.file || null,
    });
  }, [company]);

  return (
    <div className="max-w-3xl mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl">Register New Company</h1>

        <div className="my-5">
          <div className="mb-3">
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <Label>Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleChangeFile}
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/recruiter/companies")}
          >
            <ArrowLeft /> Back
          </Button>
          <Button
            type="submit"
            className={`bg-primary hover:bg-[#e7407d] ${
              loading && "cursor-not-allowed opacity-50"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
