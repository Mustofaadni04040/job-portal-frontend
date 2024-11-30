import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name?.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_JOB_API_END_POINT}/post-job`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/recruiter/jobs");
        toast({
          title: "Success post new job",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed update profile",
        description: error.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto my-10">
      <h1 className="text-2xl font-medium">Post New Job</h1>

      <form onSubmit={handleSubmit} className="my-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="my-3">
            <Label>Role Job</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Description Job</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Requirements Needed</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Salary</Label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Experience Needed</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Position</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="my-3">
            <Label>Company Name</Label>
            <Select onValueChange={handleChangeSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company, index) => (
                    <SelectItem
                      value={company?.name?.toLowerCase()}
                      key={`${company?._id}-${index}`}
                    >
                      {company?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 mt-2">
          <Button variant="outline" onClick={() => navigate("/recruiter/jobs")}>
            Cancel
          </Button>
          {companies.length === 0 ? (
            <p className="text-red-500 text-sm">
              Please register a company first. Before post a new job
            </p>
          ) : (
            <Button
              type="submit"
              className={`bg-primary hover:bg-[#e7407d] ${
                loading && "cursor-not-allowed opacity-50"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 /> Please Wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
