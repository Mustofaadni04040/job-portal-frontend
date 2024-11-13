import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavUrl = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Jobs",
    url: "/all-jobs",
  },
  {
    title: "Browse",
    url: "/browse",
  },
];

const disabledNavbar = ["sign-in", "sign-up"];

export default function Navbar() {
  const { pathname } = useLocation();

  if (disabledNavbar.includes(pathname.split("/")[1])) {
    return null;
  }

  const user = false;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 text-[#373C45]">
        <img src="./logo-job.png" alt="logo" className="w-28 h-auto" />

        <div className="flex items-center gap-20">
          <ul className="flex items-center gap-10">
            {NavUrl.map((item, index) => (
              <Link key={index} to={item.url}>
                <li className={`${pathname === item.url && "text-primary"}`}>
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>

          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="w-8 h-8 rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 space-y-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md pt-3 pl-3 pb-3">
                <div className="flex gap-5">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="w-8 h-8 rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Mustofa Adny</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant="link">Sign out</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-5">
              <Link to={"/sign-in"}>
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to={"/sign-up"}>
                <Button className="bg-primary shadow-md hover:bg-[#e7407d]">
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
