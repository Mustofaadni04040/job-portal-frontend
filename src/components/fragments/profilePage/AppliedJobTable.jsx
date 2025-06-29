import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

export default function AppliedJobTable() {
  const { jobsApplied } = useSelector((store) => store.job);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs md:text-base">Tanggal</TableHead>
            <TableHead className="text-xs md:text-base">Role</TableHead>
            <TableHead className="text-xs md:text-base">Perusahaan</TableHead>
            <TableHead className="text-right text-xs md:text-base">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobsApplied.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <p>You haven&apos;t applied any job yet</p>
              </TableCell>
            </TableRow>
          ) : (
            jobsApplied.map((jobApplied, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-xs md:text-base">
                  {jobApplied?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell>{jobApplied?.job?.title}</TableCell>
                <TableCell className="flex items-center gap-1 text-xs md:text-base">
                  <Avatar>
                    <AvatarImage
                      src={jobApplied?.job?.company?.logo}
                    ></AvatarImage>
                  </Avatar>
                  PT. {jobApplied?.job?.company?.name}
                </TableCell>
                <TableCell className="text-right text-xs md:text-base">
                  <span
                    className={`py-1 px-3 rounded-full text-white font-bold ${
                      jobApplied?.status === "accepted"
                        ? "bg-green-500"
                        : jobApplied?.status === "rejected"
                        ? "bg-red-500"
                        : jobApplied?.status === "pending" && "bg-orange-500"
                    }`}
                  >
                    {jobApplied?.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
