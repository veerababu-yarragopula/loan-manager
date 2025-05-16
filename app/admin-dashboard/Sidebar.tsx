import Link from "next/link";
import { Users, Banknote, Settings } from "lucide-react";

const menuItems = [
  { name: "Borrowers", icon: Users, link: "#" },
  { name: "Loans", icon: Banknote, link: "#" },
  { name: "Settings", icon: Settings, link: "#" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-green-900 text-white h-screen p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">John Doe</h2>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map(({ name, icon: Icon, link }) => (
            <li key={name}>
              <Link
                href={link}
                className="flex items-center space-x-3 p-2 hover:bg-green-700 rounded"
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
