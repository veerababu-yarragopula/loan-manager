"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ApplyLoanPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const loanData = {
      userId: session?.user?.id,
      fullName: formData.get("fullName"),
      amount: parseFloat(formData.get("amount") as string),
      loanTenure: parseInt(formData.get("loanTenure") as string, 10),
      employmentStatus: formData.get("employmentStatus"),
      employmentAddress: formData.get("employmentAddress"),
      reason: formData.get("reason"),
    };

    const response = await fetch("/api/loans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loanData),
    });

    const result = await response.json();

    if (result.success) {
      router.push("/dashboard");
    } else {
      console.error("Loan application failed:", result.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">APPLY FOR A LOAN</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label className="block mb-2">
            Full name as it appears on bank account
          </label>
          <input
            name="fullName"
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Full name as it appears on bank account"
            // required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block mb-2">How much do you need?</label>
          <input
            name="amount"
            type="number"
            className="w-full p-3 border rounded"
            placeholder="How much do you need?"
            // required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block mb-2">Loan tenure (in months)</label>
          <input
            name="loanTenure"
            type="number"
            className="w-full p-3 border rounded"
            placeholder="Loan tenure (in months)"
            // required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block mb-2">Employment status</label>
          <input
            name="employmentStatus"
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Employment status"
            // required
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-2">Reason for loan</label>
          <textarea
            name="reason"
            className="w-full p-3 border rounded"
            placeholder="Reason for loan"
            // required
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="block mb-2">Employment address</label>
          <input
            name="employmentAddress"
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Employment address"
            // required
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded cursor-pointer"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
