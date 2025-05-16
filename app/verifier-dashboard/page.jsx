"use client";

import Sidebar from "./Sidebar";
import Loans from "./Loans";
import Stats from "@/app/components/Stats";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Stats />
        <Loans />
      </div>
    </div>
  );
}
