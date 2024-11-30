import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, Ellipsis } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CompaniesTable() {
  const { companies, searchCompany } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompany) {
          return true;
        }

        return company.name.toLowerCase().includes(searchCompany.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompany]);

  return (
    <div className="my-10">
      <Table>
        <TableCaption>A list all of companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <p>No companies found</p>
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company, index) => (
              <TableRow key={`${company?._id}-${index}`}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo}></AvatarImage>
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit flex items-center gap-3 justify-center p-0">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          navigate(`/recruiter/companies/${company?._id}`)
                        }
                      >
                        <Edit2 />
                        <span>Edit</span>
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
