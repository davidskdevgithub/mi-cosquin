"use client";

import { useState } from "react";
import { Button } from "@/ui";

interface RegisterFormProps {
  onRegister: (username: string) => void;
  isRegistering: boolean;
}

export const RegisterForm = ({
  onRegister,
  isRegistering,
}: RegisterFormProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed.length < 2) return;
    onRegister(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Tu nombre..."
        minLength={2}
        maxLength={20}
        className="px-3 py-1.5 text-sm bg-neutral-800 border border-neutral-600 rounded-md text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-primary w-36"
      />
      <Button
        size="sm"
        intent="primary"
        type="submit"
        disabled={username.trim().length < 2 || isRegistering}
      >
        {isRegistering ? "..." : "Guardar"}
      </Button>
    </form>
  );
};
