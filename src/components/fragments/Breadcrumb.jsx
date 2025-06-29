import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function Breadcrumbs({ textThird, textSecond, urlSecond }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link
            to="/all-jobs"
            className="font-normal text-xs md:text-base hover:text-black"
          >
            Semua Lowongan
          </Link>
        </BreadcrumbItem>
        {!textThird && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-xs md:text-base">
                {textSecond}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        {textThird && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to={urlSecond || "#"}
                  className="font-normal text-xs md:text-base"
                >
                  {textSecond}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {textThird && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-xs md:text-base">
                {textThird}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

Breadcrumbs.propTypes = {
  textThird: PropTypes.string,
  textSecond: PropTypes.string,
  urlSecond: PropTypes.string,
};
