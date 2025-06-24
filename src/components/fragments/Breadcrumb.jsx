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
          <Link href="/dashboard">Home</Link>
        </BreadcrumbItem>
        {!textThird && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{textSecond}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        {textThird && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={urlSecond || "#"}>{textSecond}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {textThird && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage>{textThird}</BreadcrumbPage>
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
