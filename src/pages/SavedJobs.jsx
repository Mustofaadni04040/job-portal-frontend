import Breadcrumbs from "@/components/fragments/Breadcrumb";
import { Button } from "@/components/ui/button";

export default function SavedJobs() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-10">
        <Breadcrumbs textSecond="Lowongan Tersimpan" />
      </div>

      <div className="max-w-5xl mx-auto my-10">
        <div className="flex flex-col items-center">
          <img
            src="/not-found-logo.png"
            alt="not-found-logo"
            className="w-96 h-96"
          />
          <p className="text-center text-xl">
            Belum ada lowongan yang kamu simpan nih!
          </p>
          <Button className="bg-primary hover:bg-[#e7407d] mt-5">
            <a href={`/all-jobs`}>Lihat semua lowongan</a>
          </Button>
        </div>
      </div>
    </>
  );
}
