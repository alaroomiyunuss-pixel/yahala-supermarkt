"use client";

import { useState } from "react";
import { seedDatabase } from "./actions";

export default function SeedButton({
  label,
  successMsg,
  busyMsg,
}: {
  label: string;
  successMsg: string;
  busyMsg: string;
}) {
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSeed() {
    setStatus("busy");
    try {
      const res = await seedDatabase();
      setMsg(res.message);
      setStatus("done");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Unknown error");
      setStatus("error");
    }
  }

  return (
    <div>
      <button
        onClick={handleSeed}
        disabled={status === "busy" || status === "done"}
        className="rounded-lg bg-brand-gold text-brand-black px-5 py-2.5 font-bold hover:bg-brand-goldDark disabled:opacity-60 transition"
      >
        {status === "busy" ? busyMsg : label}
      </button>
      {status === "done" && (
        <p className="mt-2 text-sm font-semibold text-green-700">{successMsg}</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm font-semibold text-red-600">{msg}</p>
      )}
      {status === "done" && (
        <p className="mt-1 text-xs text-black/50">{msg}</p>
      )}
    </div>
  );
}
