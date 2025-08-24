import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-[#FF6A00] bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>

      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#FF6A00" />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
}
