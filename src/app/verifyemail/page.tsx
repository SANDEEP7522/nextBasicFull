"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Verifyemail() {
  const [token, setToken] = useState("");
  const [verifide, setVerifide] = useState(false);
  const [error, setError] = useState(false);
//   const router = useRouter();

  const verifyEmail = async () => {
    try {
      const response = await axios.get("/api/users/verifyemail", {
        params: { token },
      });
      if (response.status === 200) {
        setVerifide(true);
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // it is use for getting the token from the url with help nextjs
    //    const {query} = router
    //    const urlTokenTwo = query.token
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <h2>Verify Email</h2>
      <h3>{token ? `token: ${token}` : "token is not present"}</h3>
      {verifide && (
        <p className="text-2xl font-bold text-green-500">
          Your email has been verified successfully. Please
          <a className="text-blue-500 hover:underline" href="/login">
            login
          </a>
          .
        </p>
      )}
      {error && (
        <p className="text-2xl font-bold text-red-500">
          Your email has not been verified. Please
          <a className="text-blue-500 hover:underline" href="/signup">
            signup
          </a>
          .
        </p>
      )} 
    </div>
  );
}
