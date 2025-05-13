import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverClose } from "@radix-ui/react-popover";
import { ToastAction } from "@radix-ui/react-toast";
import axios from "axios";
import { Check, Ellipsis, X } from "lucide-react";
import { useSelector } from "react-redux";

const actionStatus = ["accepted", "rejected"];

export default function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const { toast } = useToast();

  const handleStatus = async (status, _id) => {
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_APPLICATION_API_END_POINT
        }/status/${_id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast({
          title: "Success update status applicant",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed update status applicant",
        description: error.response.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list all of applicants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <p>No applicants</p>
              </TableCell>
            </TableRow>
          ) : (
            applicants?.applications?.map((applicant, index) => (
              <TableRow key={`${applicant._id}-${index}`}>
                <TableCell>{applicant?.applicant?.fullname}</TableCell>
                <TableCell>{applicant?.applicant?.email}</TableCell>
                <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {applicant?.applicant?.profile?.resume ? (
                    <a
                      target="blank"
                      href={applicant?.applicant?.profile?.resume}
                      className="text-blue-600 underline"
                    >
                      {applicant?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{applicant?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>
                  <div
                    className={`py-1 px-3 flex items-center justify-center rounded-full text-white font-bold ${
                      applicant?.status === "accepted"
                        ? "bg-green-500"
                        : applicant?.status === "rejected"
                        ? "bg-red-500"
                        : applicant?.status === "pending" && "bg-orange-500"
                    }`}
                  >
                    {applicant?.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {applicant?.status === "pending" && (
                    <Popover>
                      <PopoverTrigger>
                        <Ellipsis />
                      </PopoverTrigger>
                      <PopoverContent className="w-fit flex flex-col p-0">
                        {actionStatus.map((status, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className={`${
                              status === "accepted"
                                ? "rounded-bl-none rounded-br-none hover:bg-green-300"
                                : "rounded-tl-none rounded-tr-none hover:bg-red-300"
                            }`}
                            onClick={() => handleStatus(status, applicant._id)}
                          >
                            <PopoverClose className="flex items-center gap-2">
                              {status === "accepted" ? (
                                <Check className="font-bold" />
                              ) : (
                                <X className="font-bold" />
                              )}
                              <span>{status}</span>
                            </PopoverClose>
                          </Button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
