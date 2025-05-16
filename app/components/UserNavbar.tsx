"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Bell,
  CreditCard,
  Home,
  MessageCircle,
  User,
  BookOpen,
  DollarSign,
  ChevronDown,
} from "lucide-react";

export default function UserNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-green-800 font-bold text-lg">CREDIT APP</div>
      <div className="flex space-x-6 text-gray-700">
        <NavItem
          href="/dashboard"
          icon={<Home className="w-5 h-5" />}
          label="Home"
          active
        />
        <NavItem
          href="#"
          icon={<DollarSign className="w-5 h-5" />}
          label="Payments"
        />
        <NavItem
          href="#"
          icon={<BookOpen className="w-5 h-5" />}
          label="Budget"
        />
        <NavItem
          href="#"
          icon={<CreditCard className="w-5 h-5" />}
          label="Card"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            4
          </span>
        </div>

        <MessageCircle className="w-5 h-5 text-gray-700 cursor-pointer" />

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 text-gray-700 cursor-pointer"
          >
            <User className="w-5 h-5" />
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1 ${
        active ? "text-green-800 font-semibold" : "text-gray-700"
      } hover:text-green-800`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
