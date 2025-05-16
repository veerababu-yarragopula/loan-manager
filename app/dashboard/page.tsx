"use client";

import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === "verifier") {
      router.replace("/verifier-dashboard");
    }
    if (session?.user?.role === "admin") {
      router.replace("/admin-dashboard");
    }
    async function fetchLoans() {
      if (!session?.user?.id) return;

      try {
        const response = await fetch("/api/loans");
        const result = await response.json();

        if (result.success) {
          setLoans(result.loans);
        } else {
          console.error("Error fetching loans:", result.error);
        }
      } catch (error) {
        console.error("Failed to fetch loans:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLoans();
  }, [session?.user?.id]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-green-800 font-semibold text-lg">
          <span className="bg-green-600 p-2 rounded text-white">💰</span>
          <span>DEFICIT</span>
          <span className="text-gray-900 text-xl">₦ 0.0</span>
        </div>
        <Link
          href="/apply-loan"
          className="bg-gray-200 px-4 py-2 rounded-lg text-gray-800"
        >
          Get A Loan
        </Link>
      </div>

      <div className="bg-gray-100 p-2 rounded-lg flex">
        <button className="flex-1 px-4 py-2 bg-green-200 text-green-900 rounded-l-lg">
          Borrow Cash
        </button>
        <button className="flex-1 px-4 py-2 text-gray-700">Transact</button>
        <button className="flex-1 px-4 py-2 text-gray-700 rounded-r-lg">
          Deposit Cash
        </button>
      </div>

      <div className="mt-4 flex items-center bg-gray-100 p-2 rounded-lg">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search for loans"
          className="w-full bg-transparent outline-none px-2"
        />
      </div>

      {loading ? (
        <p className="mt-4 text-center text-gray-600">Loading loans...</p>
      ) : loans.length > 0 ? (
        <LoanTable loans={loans} />
      ) : (
        <p className="mt-4 text-center text-gray-600">No loans found.</p>
      )}
    </div>
  );
}

function LoanTable({ loans }: { loans: any[] }) {
  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold">Applied Loans</h2>
        <div className="flex space-x-4 text-gray-600">
          <Filter className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      <div className="space-y-4">
        {loans.map((loan: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Image
                src="https://i.pravatar.cc/150?img=3"
                alt="User"
                className="rounded-full"
                width={40}
                height={40}
              />
              <div>
                <p className="font-semibold">{loan.fullName}</p>
                <p className="text-sm text-gray-500">
                  Applied on {new Date(loan.appliedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-800">₦ {loan.amount.toLocaleString()}</p>
            <div>
              <p className="text-gray-700">
                {new Date(loan.appliedDate).toDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-white text-sm rounded-full ${
                loan.status === "pending" ? "bg-yellow-400" : "bg-green-500"
              }`}
            >
              {loan.status || "pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
