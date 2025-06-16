import { Skeleton } from "../ui/skeleton";

export default function JobSkeleton() {
  return (
    <div className="flex flex-col space-y-3 border border-gray-100 rounded-md shadow-sm p-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <Skeleton className="h-8 w-16" />
    </div>
  );
}
