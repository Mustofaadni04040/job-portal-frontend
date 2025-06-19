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
          <Skeleton
            className={`${
              index + 1 === columnsCount ? "w-[50px]" : "w-[150px]"
            } h-4`}
          />
        </TableCell>
      ))}
    </>
  );
}

TableSkeleton.propTypes = {
  columnsCount: PropTypes.number.isRequired,
};
