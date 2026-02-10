import { EVENTS_DAY_1, LineupContainer } from "@/features/lineup";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <header className="px-4 py-3 border-b border-neutral-700">
        <h1 className="text-xl font-bold text-primary">Cosquin Rock 2025</h1>
      </header>

      <main className="p-2">
        <LineupContainer events={EVENTS_DAY_1} />
      </main>
    </div>
  );
}
