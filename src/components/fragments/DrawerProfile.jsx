import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AlignRight } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { NavUrl } from "@/utils/navUrl";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function DrawerProfile({ handleLogout }) {
  const { user } = useSelector((store) => store.auth);
  const { pathname } = useLocation();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <AlignRight className="cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="text-left pl-5 pt-12">
          {user ? (
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  alt="avatar"
                  src={
                    user?.profile?.profilePhoto
                      ? user?.profile?.profilePhoto
                      : "https://github.com/shadcn.png"
                  }
                  className="w-10 h-10 rounded-full"
                />
              </Avatar>
              {user?.role === "job-seeker" && (
                <div className="flex flex-col gap-1">
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                  <DrawerClose className="text-left" asChild>
                    <Link to={"/profile"} className="text-primary text-xs mt-3">
                      Lihat halaman profil
                    </Link>
                  </DrawerClose>
                </div>
              )}
            </div>
          ) : null}
        </DrawerTitle>
        <DrawerDescription className="flex flex-col pl-5 py-5 gap-2">
          {(user && user?.role === "job-seeker") || user === null ? (
            NavUrl.map((item, index) => (
              <DrawerClose asChild key={index} className="text-left">
                <a
                  key={index}
                  href={item.url}
                  className={`${pathname === item.url && "text-primary"}`}
                >
                  {item.title}
                </a>
              </DrawerClose>
            ))
          ) : (
            <>
              <DrawerClose asChild className="text-left">
                <a
                  href="/recruiter/companies"
                  className={`${
                    pathname === "/recruiter/companies" && "text-primary"
                  }`}
                >
                  Companies
                </a>
              </DrawerClose>
              <DrawerClose asChild className="text-left">
                <a
                  href="/recruiter/jobs"
                  className={`${
                    pathname === "/recruiter/jobs" && "text-primary"
                  }`}
                >
                  Jobs
                </a>
              </DrawerClose>
            </>
          )}
        </DrawerDescription>

        <DrawerFooter>
          {user ? (
            <DrawerClose asChild>
              <Button variant="secondary" onClick={handleLogout}>
                Sign out
              </Button>
            </DrawerClose>
          ) : (
            <div className="flex gap-5 flex-col">
              <DrawerClose asChild>
                <Link to={"/sign-in"}>
                  <Button variant="ghost" className="w-full">
                    Sign in
                  </Button>
                </Link>
              </DrawerClose>

              <DrawerClose asChild>
                <Link to={"/sign-up"}>
                  <Button className="w-full bg-gradient-to-r from-primary to-[#e7407d] hover:from-[#e7407d] hover:to-primary text-white">
                    Sign up
                  </Button>
                </Link>
              </DrawerClose>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

DrawerProfile.propTypes = {
  handleLogout: PropTypes.func,
};
