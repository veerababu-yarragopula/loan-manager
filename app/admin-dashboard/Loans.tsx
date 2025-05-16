"use client";

import { useEffect, useState } from "react";

export default function Loans() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLoans() {
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
  }, []);

  const approveLoan = async (loanId: string) => {
    try {
      const response = await fetch(`/api/loans/approve/${loanId}`, {
        method: "PUT",
      });

      const result = await response.json();
      if (result.success) {
        setLoans((prevLoans) =>
          prevLoans.map((loan) =>
            loan._id === loanId ? { ...loan, status: "approved" } : loan
          )
        );
      } else {
        console.error("Error verifying loan:", result.error);
      }
    } catch (error) {
      console.error("Failed to verify loan:", error);
    }
  };

  const verifyLoan = async (loanId: string) => {
    try {
      const response = await fetch(`/api/loans/verify/${loanId}`, {
        method: "PUT",
      });

      const result = await response.json();
      if (result.success) {
        setLoans((prevLoans) =>
          prevLoans.map((loan) =>
            loan._id === loanId ? { ...loan, status: "verified" } : loan
          )
        );
      } else {
        console.error("Error verifying loan:", result.error);
      }
    } catch (error) {
      console.error("Failed to verify loan:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Loans</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading loans...</p>
      ) : loans.length === 0 ? (
        <p className="text-center text-gray-600">No loans found.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">User Details</th>
              <th className="p-2 text-left">Customer Name</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(({ _id, fullName, reason, appliedDate, status }) => (
              <tr key={_id} className="border-b">
                <td className="p-2">{reason}</td>
                <td className="p-2">{fullName}</td>
                <td className="p-2">
                  {new Date(appliedDate).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      status === "pending" ? "bg-yellow-500" : "bg-green-500"
                    } text-white`}
                  >
                    {status}
                  </span>
                </td>
                <td className="p-2">
                  {status === "verified" && (
                    <button
                      onClick={() => approveLoan(_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Approve
                    </button>
                  )}
                  {status === "pending" && (
                    <button
                      onClick={() => verifyLoan(_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
