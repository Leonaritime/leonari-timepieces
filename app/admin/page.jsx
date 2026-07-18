"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-sm border border-line/60 bg-panel p-8">
        <h1 className="font-display text-2xl text-parchment">Leonari <span className="text-gold">Admin</span></h1>
        <p className="mt-2 font-body text-sm text-parchment/50">Sign in to manage the collection.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mt-6 w-full rounded-sm border border-line bg-ink px-4 py-3 font-body text-sm text-parchment outline-none focus-visible:border-gold"
        />
        {error && <p className="mt-2 font-body text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-sm bg-gold py-3 font-body text-xs uppercase tracking-widest text-ink transition hover:bg-goldbright disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
