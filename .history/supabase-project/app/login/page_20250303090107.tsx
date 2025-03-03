"use client";

import { useState, useEffect } from "react";
import { loginAdmin, loginGuest } from "../actions";
import { useRouter } from "next/navigation";
import { Button, TextField, Divider, Typography } from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient(); // Supabase client di client-side

  async function handleAdminLogin(event: React.FormEvent) {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1000);
  }

  async function handleGuestLogin() {
    const guestEmail = "guest@email.com";
    const guestPassword = "123456";

    const { data, error } = await supabase.auth.signInWithPassword({
      email: guestEmail,
      password: guestPassword,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setTimeout(() => {
      if (window.location.pathname !== "/") {
        router.push("/");
      }
    }, 1000);
    router.refresh();
  }

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      // Jika session ada, redirect ke halaman utama
      if (data.session) {
        router.push("/");
      }
    }
    checkSession();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-xl w-80">
        <h2 className="text-xl font-bold text-center mb-8">Selamat Datang!</h2>

        {/* Login Admin */}
        <form onSubmit={handleAdminLogin} className="space-y-3">
          <div className="flex items-center space-x-2">
            <EmailOutlined className="text-gray-500 mr-1" />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <LockOutlined className="text-gray-500 mr-1" />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" variant="outlined" fullWidth>
            Masuk
          </Button>
        </form>

        {/* Garis pemisah */}
        <Divider className="my-4">
          <Typography className="text-gray-500">atau</Typography>
        </Divider>

        {/* Login Guest */}
        <Button onClick={handleGuestLogin} variant="contained" fullWidth>
          Masuk sebagai Tamu
        </Button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}
