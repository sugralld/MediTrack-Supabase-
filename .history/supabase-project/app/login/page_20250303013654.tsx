"use client";

import { useState } from "react";
import { loginAdmin, loginGuest } from "../actions";
import { useRouter } from "next/navigation";
import { Button, TextField, Divider, Typography } from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { log } from "console";

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

    lo

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
