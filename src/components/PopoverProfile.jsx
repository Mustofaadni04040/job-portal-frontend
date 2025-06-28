import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { LogOut, User2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { PopoverContent } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";

export const PopoverProfile = ({ open, setOpen, handleLogout }) => {
  const { user } = useSelector((store) => store.auth);

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
                  <Link to={"/profile"}>Lihat halaman profil</Link>
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

PopoverProfile.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
