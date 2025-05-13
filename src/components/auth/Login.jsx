import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToken, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    // role: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const token = Cookies.get("token");
        Cookies.set("token", token); // simpan token ke cookies
        Cookies.set("user", JSON.stringify(res.data.user));
        dispatch(setToken(token));
        dispatch(setUser(res.data.user));
        navigate("/");
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
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl h-screen mx-auto text-[#373C45]">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <div className="w-full flex justify-center mb-5">
          <img src="./logo-job.png" alt="job-logo" className="w-40" />
        </div>
        <h1 className="font-bold text-xl mb-5">Sign In</h1>
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

        {/* <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-5 my-3">
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="job-seeker"
                className="flex items-center gap-2 flex-row-reverse cursor-pointer"
              >
                Job Seeker
                <Input
                  id="job-seeker"
                  type="radio"
                  name="role"
                  value="job-seeker"
                  checked={input.role === "job-seeker"}
                  onChange={handleChangeInput}
                  className="cursor-pointer w-3 h-3"
                  required
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="recruiter"
                className="flex items-center gap-2 flex-row-reverse cursor-pointer"
              >
                Recruiter
                <Input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleChangeInput}
                  className="cursor-pointer w-3 h-3"
                  required
                />
              </Label>
            </div>
          </RadioGroup>
        </div> */}

        <Button
          type="submit"
          className="w-full mt-5 mb-3 bg-primary shadow-md hover:bg-[#e7407d] disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
        <p className="text-sm text-center">
          Tidak punya akun?,{" "}
          <span className="text-primary">
            <Link to={"/sign-up"}>Sign up</Link>
          </span>{" "}
          disini
        </p>
      </form>
    </div>
  );
}
