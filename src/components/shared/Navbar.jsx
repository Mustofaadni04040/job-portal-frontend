import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { setGetArchived, setSavedJobs } from "@/redux/jobSlice";
import useMobile from "@/hooks/useMobile";
import { PopoverProfile } from "../PopoverProfile";
import { NavUrl } from "@/utils/navUrl";
import DrawerProfile from "../fragments/DrawerProfile";
import { persister } from "@/main";

const disabledNavbar = ["sign-in", "sign-up"];
export default function Navbar() {
  const { pathname } = useLocation();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMobile();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USER_API_END_POINT}/logout`,
        { withCredentials: true }
      );

      if (res.data.success) {
        Cookies.remove("user");
        dispatch(setUser(null));
        dispatch(setSavedJobs([]));
        persister.purge();
        navigate("/");
        dispatch(setGetArchived([]));
        toast({
          title: "Success logout",
          description: "You have successfully logged out",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to logout",
        description: "An error occurred. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  if (disabledNavbar.includes(pathname.split("/")[1])) {
    return null;
  }

  return (
    <div
      className={`sticky left-0 top-0 w-full z-[49] bg-white ${
        isSticky ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 mx-auto h-16 text-[#373C45] md:max-w-7xl">
        <img src="/logo-job.png" alt="logo" className="w-28 h-auto" />

        {isMobile ? (
          <DrawerProfile handleLogout={handleLogout} />
        ) : (
          <div className="flex items-center gap-20">
            <ul className="flex items-center gap-10">
              {(user && user?.role === "job-seeker") || user === null ? (
                NavUrl.map((item, index) => (
                  <a key={index} href={item.url}>
                    <li
                      className={`${pathname === item.url && "text-primary"}`}
                    >
                      {item.title}
                    </li>
                  </a>
                ))
              ) : (
                <>
                  <a href="/recruiter/companies">
                    <li
                      className={`${
                        pathname === "/recruiter/companies" && "text-primary"
                      }`}
                    >
                      Companies
                    </li>
                  </a>
                  <a href="/recruiter/jobs">
                    <li
                      className={`${
                        pathname === "/recruiter/jobs" && "text-primary"
                      }`}
                    >
                      Jobs
                    </li>
                  </a>
                </>
              )}
            </ul>

            {user ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage
                      alt="avatar"
                      src={
                        user?.profile?.profilePhoto
                          ? user?.profile?.profilePhoto
                          : "https://github.com/shadcn.png"
                      }
                      className="w-8 h-8 rounded-full"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverProfile
                  open={open}
                  setOpen={setOpen}
                  handleLogout={handleLogout}
                />
              </Popover>
            ) : (
              <div className="flex gap-5">
                <Link to={"/sign-in"}>
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to={"/sign-up"}>
                  <Button className="bg-gradient-to-r from-primary to-[#e7407d] hover:from-[#e7407d] hover:to-primary text-white">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
