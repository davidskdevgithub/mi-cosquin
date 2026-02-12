"use client";

import { useState } from "react";
import { Button, Input } from "@/ui";

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
      <Input
        type="text"
        size="sm"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Tu nombre..."
        maxLength={20}
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
