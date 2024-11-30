import Search from "@/components/elements/Search";

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto my-14">
      <div className="text-center">
        <h1 className="text-[42px] font-bold">
          Find Your <span className="text-primary">Dream Jobs</span> Today
        </h1>
        <p className="text-md text-slate-500">
          Jobs in all of sectors are waiting for you.
        </p>
      </div>

      <Search />
    </div>
  );
}
