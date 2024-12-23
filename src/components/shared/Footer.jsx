import { Link, useLocation } from "react-router-dom";

const disabledFooter = ["sign-in", "sign-up", "browse", "profile", "recruiter"];

export default function Footer() {
  const { pathname } = useLocation();

  if (disabledFooter.includes(pathname.split("/")[1])) {
    return null;
  }

  return (
    <div className="w-full border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 w-full justify-between py-10">
          <div className="max-w-96 mb-7">
            <img src="/logo-job.png" alt="logo" className="w-28 h-auto" />
            <p className="mt-3 text-sm text-slate-500">
              We help you to find your
              <br /> dream jobs.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">About Seeker</h2>
            <div className="text-slate-500">
              <Link to="#" className="hover:text-primary">
                About Us
              </Link>
            </div>
            <div className="text-slate-500">
              <Link to="#" className="hover:text-primary">
                Blog
              </Link>
            </div>
            <div className="text-slate-500">
              <Link to="#" className="hover:text-primary">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2">Call Us</h2>
            <div className="text-slate-500">
              Jl. Menteng Raya No.62, RT.3/RW.9, Kb. Sirih, Kec. Menteng, Kota
              Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10340
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500 text-center mb-4">
          Copyright 2024 • All rights reserved • Seeker
        </p>
      </div>
    </div>
  );
}
