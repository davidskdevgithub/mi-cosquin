"use client";

import { useState } from "react";
import { Button, Input } from "@/ui";

interface JoinRoomFormProps {
  onJoin: (code: string) => void;
  isJoining: boolean;
  /** Código precargado (ej: desde URL o QR) */
  initialCode?: string;
}

export const JoinRoomForm = ({
  onJoin,
  isJoining,
  initialCode = "",
}: JoinRoomFormProps) => {
  const [code, setCode] = useState(initialCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 4) return;
    onJoin(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="text"
        size="sm"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Código de sala..."
        maxLength={6}
      />
      <Button
        size="sm"
        intent="secondary"
        type="submit"
        disabled={code.trim().length < 4 || isJoining}
      >
        {isJoining ? "Uniéndose..." : "Unirse a sala"}
      </Button>
    </form>
  );
};
