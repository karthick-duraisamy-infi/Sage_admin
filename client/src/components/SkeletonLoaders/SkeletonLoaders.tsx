
interface TableSkeletonProps {
  columns: number;   // 4 or 6 or any
  rows?: number;     // default 5
}

const StatCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm rounded-2xl border bg-white p-5 shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-12 w-12 rounded-xl bg-gray-200" />
      </div>

      <div className="mt-6 h-8 w-16 rounded bg-gray-200" />

      <div className="mt-4 flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-gray-200" />
        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
}

const TableSkeleton =({
  columns,
  rows = 5,
}: TableSkeletonProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full border-collapse">
        {/* Header Skeleton */}
        <thead className="bg-gray-100">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-4">
                <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
              </th>
            ))}
            {/* Actions column */}
            <th className="px-4 py-4 w-10">
              <div className="h-4 w-4 rounded bg-gray-200 animate-pulse ml-auto" />
            </th>
          </tr>
        </thead>

        {/* Body Skeleton */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-5">
                  <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                </td>
              ))}

              {/* Actions column */}
              <td className="px-4 py-5">
                <div className="h-4 w-4 rounded bg-gray-200 animate-pulse ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


const SimpleStatCardSkeleton =()=> {
  return (
    <div className="w-full max-w-sm rounded-2xl border bg-white p-5 shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between">
        {/* Title */}
        <div className="h-4 w-28 rounded bg-gray-200" />

        {/* Icon box */}
        <div className="h-12 w-12 rounded-xl bg-blue-100" />
      </div>

      {/* Value */}
      <div className="mt-6 h-8 w-12 rounded bg-gray-200" />
    </div>
  );
}


export { StatCardSkeleton , TableSkeleton, SimpleStatCardSkeleton}