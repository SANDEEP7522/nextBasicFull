"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log("login success", response.data);
      toast.success("Login successful");
      router.push("/");
    } catch (error: any) {
      console.log("login error", error);
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="shadow w-full  max-w-sm bg-gray-300  rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label htmlFor="email">
              <p className="font-medium text-gray-200">Email</p>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="original-box-shadow"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">
              <p className="font-medium text-gray-200">Password</p>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="original-box-shadow"
              placeholder="  * * * * * * * * * *"
              required
            />
          </div>
          <button type="submit" className="original-button ml-7">
            Login
          </button>
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-700 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
