import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Bookmark, LogOut, User2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setToken, setUser } from "@/redux/authSlice";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const NavUrl = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "Lowongan",
    url: "/all-jobs",
  },
];

const disabledNavbar = ["sign-in", "sign-up"];

const HandleOpenPopover = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useSelector((store) => store.auth);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USER_API_END_POINT}/logout`,
        { withCredentials: true }
      );

      if (res.data.success) {
        Cookies.remove("user");
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate("/");
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

  if (open) {
    return (
      <PopoverContent className="absolute right-0 bg-white z-50 w-80 space-y-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md pt-3 pl-3 pb-3">
        <div className="flex gap-5">
          <Avatar>
            <AvatarImage
              alt="avatar"
              src={
                user?.profile?.profilePhoto
                  ? user?.profile?.profilePhoto
                  : "https://github.com/shadcn.png"
              }
              className="min-w-8 h-8 rounded-full"
            />
          </Avatar>
          <div>
            <h4 className="font-medium">{user?.fullname}</h4>
            <p className="text-sm text-muted-foreground">
              {user?.profile?.bio}
            </p>
          </div>
        </div>

        <div className="flex flex-col text-gray-600">
          {user && user?.role === "job-seeker" && (
            <>
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <User2 />
                <Button variant="link" onClick={() => setOpen(!open)}>
                  <Link to={"/profile"}>View Profile</Link>
                </Button>
              </div>
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <Bookmark />
                <Button variant="link" onClick={() => setOpen(!open)}>
                  <Link to={""}>Bookmark</Link>
                </Button>
              </div>
            </>
          )}
          <div className="flex w-fit items-center gap-2 cursor-pointer">
            <LogOut />
            <Button variant="link" onClick={() => setOpen(!open)}>
              <Link onClick={handleLogout}>Sign out</Link>
            </Button>
          </div>
        </div>
      </PopoverContent>
    );
  } else {
    return null;
  }
};

HandleOpenPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default function Navbar() {
  const { pathname } = useLocation();
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  console.log(user);

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
      className={`sticky left-0 top-0 w-full z-[999] bg-white ${
        isSticky ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 text-[#373C45]">
        <img src="/logo-job.png" alt="logo" className="w-28 h-auto" />

        <div className="flex items-center gap-20">
          <ul className="flex items-center gap-10">
            {(user && user?.role === "job-seeker") || user === null ? (
              NavUrl.map((item, index) => (
                <a key={index} href={item.url}>
                  <li className={`${pathname === item.url && "text-primary"}`}>
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
              <HandleOpenPopover open={open} setOpen={setOpen} />
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
      </div>
    </div>
  );
}
