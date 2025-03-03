"use client";

import { useState } from "react";
import { loginAdmin, loginGuest } from "../actions";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAdminLogin(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await loginAdmin(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  }

  async function handleGuestLogin() {
    const result = await loginGuest();
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-xl w-80">
        <h2 className="text-xl font-bold text-center mb-4">Selamat datang!</h2>

        {/* Login Admin */}
        <form onSubmit={handleAdminLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Masuk
          </button>
          <Button >Masuk</Button>
        </form>

        <div className="text-center text-gray-500 my-3">atau</div>

        {/* Login Guest */}
        <button onClick={handleGuestLogin} className="w-full bg-gray-300 text-gray-700 py-2 rounded-md">
          Masuk sebagai Tamu
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}
