import { Link, useLocation } from "react-router-dom";

const disabledFooter = ["sign-in", "sign-up", "profile", "recruiter"];

export default function Footer() {
  const { pathname } = useLocation();

  if (disabledFooter.includes(pathname.split("/")[1])) {
    return null;
  }

  return (
    <div className="w-full border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full justify-between px-5 md:px-0 py-10">
          <div className="max-w-96 mb-7">
            <img src="/logo-job.png" alt="logo" className="w-28 h-auto" />
            <p className="mt-3 text-sm text-slate-500">
              We help you to find your
              <br /> dream jobs.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-base md:text-lg font-medium md:mb-2">
              About Seeker
            </h2>
            <div className="text-slate-500 text-sm md:text-base">
              <Link to="/" className="hover:text-primary">
                Beranda
              </Link>
            </div>
            <div className="text-slate-500 text-sm md:text-base">
              <Link to="/all-jobs" className="hover:text-primary">
                Daftar Lowongan
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-medium mb-2 mt-5 md:mt-0">
              Call Us
            </h2>
            <div className="text-slate-500 text-sm md:text-base">
              Jl. Menteng Raya No.62, RT.3/RW.9, Kb. Sirih, Kec. Menteng, Kota
              Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10340
            </div>
          </div>
        </div>

        <p className="text-center mb-4 text-slate-500 text-sm md:text-base">
          Copyright 2025 • All rights reserved • Seeker
        </p>
      </div>
    </div>
  );
}
