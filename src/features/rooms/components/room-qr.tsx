"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Text } from "@/ui";
import { buildJoinUrl } from "../rooms.helpers";

interface RoomQRProps {
  code: string;
}

export const RoomQR = ({ code }: RoomQRProps) => {
  const [copied, setCopied] = useState(false);
  const joinUrl = buildJoinUrl(code);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: no clipboard API disponible
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-3 rounded-base">
        <QRCodeSVG value={joinUrl} size={160} level="M" />
      </div>

      <button
        type="button"
        onClick={handleCopyCode}
        className="flex items-center gap-2 px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 rounded-base transition-colors cursor-pointer"
      >
        <Text variant="label" as="span">
          <span className="font-mono text-primary tracking-widest text-lg">
            {code}
          </span>
        </Text>
        <span className="text-xs text-neutral-400">
          {copied ? "✓ Copiado" : "Copiar"}
        </span>
      </button>
    </div>
  );
};
