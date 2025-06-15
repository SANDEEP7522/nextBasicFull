"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
      toast.success("Signup successful");
    } catch (error: any) {
      console.log("signup error", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="shadow w-full  max-w-sm bg-gray-300  rounded-2xl p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <form className="space-y-5" onSubmit={onSignup}>
          <div className="space-y-2">
            <label htmlFor="username">
              <p className="font-medium text-gray-200">Username</p>
            </label>

            <input
              type="text"
              id="username"
              value={user.username}
              // ...user destructuring username
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="  Enter your username"
              className="original-box-shadow"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email">
              <p className="font-medium text-gray-200">Email</p>
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              // ...user destructuring email
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="  Enter your email"
              className="original-box-shadow"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">
              <p className="font-medium text-gray-200">Password</p>
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              // ...user destructuring password
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="  Password  * * * * * * "
              className="original-box-shadow "
            />
          </div>
          <button
            type="submit"
            onClick={onSignup}
            className="original-button ml-7"
          >
            {buttonDisabled ? "No signup" : "Signup"}
          </button>
          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-700 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
