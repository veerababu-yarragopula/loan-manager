import UserNavbar from "@/app/components/UserNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="min-h-screen">
    // {/* <UserNavbar /> */}
    <main className="flex-1 bg-gray-50">{children}</main>
    // </div>
  );
}
