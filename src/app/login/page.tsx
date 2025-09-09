"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import {toast} from 'react-hot-toast'

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            toast.error(result?.error);
            console.log(result.error);
        }
        else {
            toast.success('Login successful');
            router.push("/profile");
        }
    }
    catch (error: any) {
        console.log(error.message);
        toast.error('Login failed');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1 className="text-xl">Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          className="block p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
           focus:border-gray-600 text-white"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          className="block p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
           focus:border-gray-600 text-white"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 border border-gray-300
         rounded-lg mb-4 cursor-pointer hover:bg-gray-800
         focus:outline-none focus:border-gray-600" type="submit">Login</button>
      </form>

      <div>
        Don't have an account ? {' '}
        <button className="p-2 border border-gray-300
         rounded-lg mb-4 cursor-pointer bg-amber-950 hover:bg-gray-800
         focus:outline-none focus:border-gray-600" onClick={() => router.push("/register")}>Register</button>
      </div>

    </div>
  )
}

export default LoginPage
