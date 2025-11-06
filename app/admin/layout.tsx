"use client";
import { Package, LayoutDashboard, Users, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

type AdminPage = "overview" | "customers" | "bookings";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathName = usePathname();

  const menuItems = [
    {
      id: "overview" as AdminPage,
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/overview",
    },
    {
      id: "customers" as AdminPage,
      label: "Customers",
      icon: Users,
      href: "/admin/customers",
    },
    {
      id: "bookings" as AdminPage,
      label: "Bookings",
      icon: Package,
      href: "/admin/all-bookings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-72 bg-gray-900 h-screen max-h-screen sticky top-0 ">
          <div className="p-8">
            <Link href="/" className="flex items-center gap-3 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-lime-500 blur-xl opacity-50"></div>
                <div className="relative h-12 w-12 bg-gradient-to-br from-lime-400 to-lime-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  REXMARINE
                </h2>
                <p className="text-xs text-gray-400 tracking-wide">
                  ADMIN PANEL
                </p>
              </div>
            </Link>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      pathName === item.href
                        ? "bg-lime-600 text-white shadow-lg shadow-lime-600/30"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Admin User
                </div>
                <div className="text-xs text-gray-400">
                  admin@freighttrack.com
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
