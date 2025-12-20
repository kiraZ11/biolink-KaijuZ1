import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 mesh-bg text-slate-800">

            {/* Container Mimic */}
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative z-10 h-[800px]">

                {/* Header Skeleton */}
                <div className="bg-gray-100 p-8 pb-32 text-center h-[300px] flex flex-col items-center justify-center relative">
                    <Skeleton className="w-28 h-28 rounded-full mb-4 bg-gray-300" />
                    <Skeleton className="h-8 w-48 bg-gray-300 mb-2" />
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                </div>

                {/* Links Skeleton */}
                <div className="bg-white px-6 -mt-10 relative z-20 space-y-4 pt-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-2xl bg-gray-100" />
                    ))}
                </div>

            </div>
        </main>
    );
}
