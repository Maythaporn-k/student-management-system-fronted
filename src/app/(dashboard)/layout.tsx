"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex overflow-auto">
      <main className="flex-1 p-14">{children}</main>
    </div>
  );
}
