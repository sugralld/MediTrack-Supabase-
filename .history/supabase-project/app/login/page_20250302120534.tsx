"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase_client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login Error:", error.message);
      alert("Gagal login: " + error.message);
    } else {
      // Refresh session agar middleware mengenali status login
      await supabase.auth.refreshSession();
      alert("Login berhasil!");
      router.refresh();
      router.push("/"); // Redirect ke home setelah login
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
