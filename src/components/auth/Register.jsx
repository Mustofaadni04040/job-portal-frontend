import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

export default function Register() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    file: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    // formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/sign-in");
        toast({
          title: "Success",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to sign up",
        description: error.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl h-screen mx-auto text-[#373C45]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-200 rounded-md p-4 mx-5 my-10"
      >
        <div className="w-full flex justify-center mb-5">
          <img src="./logo-job.png" alt="job-logo" className="w-40" />
        </div>
        <h1 className="font-bold text-xl text-slate-600 mb-5">Daftar</h1>
        <div className="my-4">
          <Label className="flex flex-col gap-2">
            Nama Lengkap
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={handleChangeInput}
              placeholder="Enter your fullname"
              required
            />
          </Label>
        </div>
        <div className="my-4">
          <Label className="flex flex-col gap-2">
            Email
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={handleChangeInput}
              placeholder="Enter your email"
              required
            />
          </Label>
        </div>
        <div className="my-4">
          <Label className="flex flex-col gap-2">
            Nomor Telepon
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={handleChangeInput}
              placeholder="Enter your phone number"
              required
            />
          </Label>
        </div>
        <div className="my-4">
          <Label className="flex flex-col gap-2">
            Password
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={handleChangeInput}
              placeholder="Enter your password"
              required
            />
          </Label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="flex items-center gap-2">
              Profile
              <Input
                accept="image/*"
                type="file"
                onChange={handleChangeFile}
                className="cursor-pointer"
                required
              />
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-5 mb-3 bg-primary shadow-md hover:bg-[#e7407d] disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Daftar"
          )}
        </Button>
        <p className="text-sm text-center">
          Sudah punya akun?,{" "}
          <span className="text-primary">
            <Link to={"/sign-in"}>Masuk</Link>
          </span>{" "}
          disini
        </p>
      </form>
    </div>
  );
}
