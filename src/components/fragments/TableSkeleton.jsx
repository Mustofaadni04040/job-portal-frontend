import { TableCell } from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import PropTypes from "prop-types";

export default function TableSkeleton({ columnsCount }) {
  return (
    <>
      {Array.from({ length: columnsCount }).map((_, index) => (
        <TableCell
          key={index}
          className={index + 1 === columnsCount ? "flex justify-end" : ""}
        >
          <Skeleton className="h-4 w-[150px]" />
        </TableCell>
      ))}
    </>
  );
}

TableSkeleton.propTypes = {
  columnsCount: PropTypes.number.isRequired,
};
