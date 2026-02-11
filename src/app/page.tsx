import { LineupPage } from "@/features/lineup";
import { OfflineBadge } from "@/features/pwa";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
        <h1 className="text-xl font-bold text-primary">Cosquin Rock 2026</h1>
        <OfflineBadge />
      </header>

      <main className="p-2">
        <LineupPage />
      </main>
    </div>
  );
}
