"use client";

import { useState } from "react";
import { loginAdmin, loginGuest } from "@/actions";
import { useRouter } from "next/navigation";
import { Button, TextField, Divider } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

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
        <h2 className="text-xl font-bold text-center mb-4">Masuk ke MediTrack</h2>

        {/* Login Admin */}
        <form onSubmit={handleAdminLogin} className="space-y-3">
          <div className="flex items-center space-x-2">
            <Email className="text-gray-500" />
            <TextField
              label="Email"
  
