"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin" | "verifier">("user");
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "admin") {
        router.replace("/adminDashboard");
      } else if (session.user.role === "verifier") {
        router.replace("/verifierDashboard");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [status, router, session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful!", "success");

      if (role === "admin") router.push("/adminDashboard");
      else if (role === "verifier") router.push("/verifierDashboard");
      else router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          {role === "admin"
            ? "Admin Login"
            : role === "verifier"
            ? "Verifier Login"
            : "User Login"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <div className="flex flex-col gap-1">
            {role !== "admin" && (
              <button
                type="button"
                onClick={() => setRole("admin")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Sign In as Admin
              </button>
            )}
            {role !== "verifier" && (
              <button
                type="button"
                onClick={() => setRole("verifier")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Sign In as Verifier
              </button>
            )}
            {role !== "user" && (
              <button
                type="button"
                onClick={() => setRole("user")}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Sign in as User
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
