// app/reports/loading.tsx

export default function Loading() {
  return (
    <div className="grid lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto p-4 text-center">
      {/* Skeleton for the main title */}
      <div className="col-span-2 h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse" />

      {/* Skeleton for the main content */}
      <div className="space-y-4 col-span-2">
        {/* Skeleton for the UFO Report title */}
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />

        {/* Skeleton for the UFO Report date */}
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-3" />

        {/* Skeleton for the UFO Report summary */}
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Skeleton for Craft Details */}
      <div className="text-center border-solid border-black border-2 rounded-xl shadow-custom p-4 space-y-4">
        <h1 className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />{" "}
        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />{" "}
        {/* Craft shape skeleton */}
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />{" "}
        {/* Craft size skeleton */}
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />{" "}
        {/* Craft color skeleton */}
      </div>

      {/* Skeleton for Report Details */}
      <div className="text-center border-solid border-black border-2 rounded-xl shadow-custom p-4 space-y-4">
        <h1 className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />{" "}
        {/* Report Details title skeleton */}
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />{" "}
        {/* Report location skeleton */}
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />{" "}
        {/* Report details skeleton */}
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />{" "}
        {/* Submission date skeleton */}
      </div>
    </div>
  );
}
