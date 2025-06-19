import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TableSkeleton from "../TableSkeleton";

export default function JobsTable({ loading, skeletonCount }) {
  const { allRecruiterJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  return (
    <div className="my-10">
      <Table>
        <TableCaption>A list all of jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allRecruiterJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <p>No jobs found</p>
              </TableCell>
            </TableRow>
          ) : loading ? (
            Array.from({ length: skeletonCount }).map((_, index) => (
              <TableRow key={index}>
                <TableSkeleton key={index} columnsCount={4} />
              </TableRow>
            ))
          ) : (
            allRecruiterJobs?.map((job, index) => (
              <TableRow key={`${job?._id}-${index}`}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit flex flex-col p-0">
                      {/* <Button
                        variant="outline"
                        className="rounded-bl-none rounded-br-none"
                        onClick={() =>
                          navigate(`/recruiter/companies/${job?._id}`)
                        }
                      >
                        <Edit2 />
                        <span>Edit</span>
                      </Button> */}
                      <Button
                        variant="outline"
                        className="rounded-tl-none rounded-tr-none"
                        onClick={() =>
                          navigate(`/recruiter/jobs/${job?._id}/applicants`)
                        }
                      >
                        <Eye />
                        <span>View Applicants</span>
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

JobsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  skeletonCount: PropTypes.number.isRequired,
};
