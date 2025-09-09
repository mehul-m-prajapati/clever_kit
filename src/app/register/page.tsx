'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'

function RegisterPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
        const resp = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        const data = await resp.json();

        if (!resp.ok) {
            throw new Error(data.error || "Registration failed");
        }
        toast.success('Registration Successful');
        router.push("/login");
    }
    catch (error: any) {
        console.error(error);
        toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='text-xl'>Register</h1>

        <form onSubmit={handleSumit}>
            <input
                className="block p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
                focus:border-gray-600 text-white"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="block p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
                focus:border-gray-600 text-white"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="p-2 border border-gray-300
                rounded-lg mb-4 cursor-pointer hover:bg-gray-800
                focus:outline-none focus:border-gray-600" type="submit">
                Register
            </button>
        </form>

        <div>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage
