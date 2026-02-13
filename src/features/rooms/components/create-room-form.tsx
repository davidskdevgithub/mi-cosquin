"use client";

import { useState } from "react";
import { Button, Input } from "@/ui";

interface CreateRoomFormProps {
  onCreate: (name: string) => void;
  isCreating: boolean;
}

export const CreateRoomForm = ({
  onCreate,
  isCreating,
}: CreateRoomFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) return;
    onCreate(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="text"
        size="sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la sala..."
        maxLength={30}
      />
      <Button
        size="sm"
        intent="primary"
        type="submit"
        disabled={name.trim().length < 2 || isCreating}
      >
        {isCreating ? "Creando..." : "Crear sala"}
      </Button>
    </form>
  );
};
