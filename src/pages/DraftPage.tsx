import { useState } from "react";
import { usePlayers } from "../hooks/usePlayers";
import { PlayerTable } from "../components/PlayerTable";
// import type { Player } from "../models/Player";

export function DraftPage() {
  const { players, loading, error } = usePlayers();

  const [draftedIds, setDraftedIds] = useState<Set<string>>(() => new Set());

  const onToggleDrafted = (id: string) => {
    setDraftedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const draftedCount = draftedIds.size;

  if (loading) return <div className="p-6">Loading players…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Draft Assistant</h1>
              <p className="mt-1 text-sm text-slate-400">
                {players.length} loaded • {draftedCount} drafted
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setDraftedIds(new Set())}
                className="rounded-lg border border-slate-800 bg-slate-900/30 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900/60"
              >
                Reset drafted
              </button>
            </div>
          </div>
        </div>

        <PlayerTable
          players={players}
          draftedIds={draftedIds}
          onToggleDrafted={onToggleDrafted}
        />
      </div>
    </div>
  );
}
