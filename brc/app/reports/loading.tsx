//app/reports/loading.tsx

export default function Loading() {
  return (
    <div className="grid lg:grid-cols-2 lg:gap-4 max-w-4xl mx-auto p-4 text-center">
      {/* Animated loading skeleton for the page title */}
      <div className="col-span-2 h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse" />

      <div className="space-y-4">
        {/* Skeleton for a UFO Report */}
        <div className="border rounded-lg p-4">
          {/* Animated loading skeleton for UFO Report date */}
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
          {/* Animated loading skeleton for UFO Report summary */}
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Skeleton for a UFO Report */}
        <div className="border rounded-lg p-4">
          {/* Animated loading skeleton for UFO Report date */}
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
          {/* Animated loading skeleton for UFO Report summary */}
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Skeleton for a UFO Report */}
        <div className="border rounded-lg p-4">
          {/* Animated loading skeleton for UFO Report date */}
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
          {/* Animated loading skeleton for UFO Report summary */}
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Skeleton for a UFO Report */}
        <div className="border rounded-lg p-4">
          {/* Animated loading skeleton for UFO Report date */}
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
          {/* Animated loading skeleton for UFO Report summary */}
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
