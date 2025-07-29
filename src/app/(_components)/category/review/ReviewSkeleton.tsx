export default function ReviewSkeleton() {
  return (
    <li className="p-[12px] bg-[#fbfbfb] border-w4 rounded-xl animate-pulse">
      <div className="flex items-center justify-between mb-[8px]">
        <div className="h-[14px] w-[80px] bg-g3 rounded-sm" />
        <div className="h-[12px] w-[50px] bg-g3 rounded-sm" />
      </div>

      <div className="space-y-[4px] mb-[6px]">
        <div className="h-[10px] w-full bg-g3 rounded-sm" />
        <div className="h-[10px] w-[95%] bg-g3 rounded-sm" />
        <div className="h-[10px] w-[90%] bg-g3 rounded-sm" />
        <div className="h-[10px] w-[85%] bg-g3 rounded-sm" />
      </div>

      <div className="flex gap-[4px] mt-[8px]">
        <div className="w-[64px] h-[64px] bg-g3 rounded-lg" />
        <div className="w-[64px] h-[64px] bg-g3 rounded-lg" />
        <div className="w-[64px] h-[64px] bg-g3 rounded-lg" />
      </div>
    </li>
  );
}
