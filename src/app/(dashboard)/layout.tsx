"use client"; // Add this directive at the top

import Sidebar from "@/app/component/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={true} />
      <main className="flex-1 p-14">{children}</main>
    </div>
  );
}
