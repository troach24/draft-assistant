import { useMemo, useState } from "react";
import { usePlayers } from "../hooks/usePlayers";
import { PlayerTable } from "../components/PlayerTable";
import { Controls, type SortKey } from "../components/Controls";
import type { Player } from "../models/player";
import type { PositionFilter } from "../components/Filters";

function matchesPosition(p: Player, filter: PositionFilter) {
  if (filter === "ALL") return true;
  if (filter === "FLEX") return p.position === "RB" || p.position === "WR" || p.position === "TE";
  return p.position === filter;
}

function normalizeSearch(s: string) {
  return s.trim().toLowerCase();
}

function comparePlayers(a: Player, b: Player, sortKey: SortKey) {
  if (sortKey === "NAME") return a.name.localeCompare(b.name);
  if (sortKey === "TEAM") return (a.team ?? "").localeCompare(b.team ?? "") || a.name.localeCompare(b.name);
  // POS_NAME
  return a.position.localeCompare(b.position) || a.name.localeCompare(b.name);
}

export function DraftPage() {
  const { players, loading, error } = usePlayers();

  const [draftedIds, setDraftedIds] = useState<Set<string>>(() => new Set());

  const [position, setPosition] = useState<PositionFilter>("ALL");
  const [hideDrafted, setHideDrafted] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("POS_NAME");

  const onToggleDrafted = (id: string) => {
    setDraftedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredPlayers = useMemo(() => {
    const searchInput = normalizeSearch(search);

    return players
      .filter((p) => matchesPosition(p, position))
      .filter((p) => (hideDrafted ? !draftedIds.has(p.id) : true))
      .filter((p) => (searchInput ? p.name.toLowerCase().includes(searchInput) : true))
      .slice() // avoid mutating original players array
      .sort((a, b) => comparePlayers(a, b, sortKey));
  }, [players, position, hideDrafted, draftedIds, search, sortKey]);

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
                {filteredPlayers.length} shown • {players.length} loaded • {draftedCount} drafted
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

          <Controls
            position={position}
            onChangePosition={setPosition}
            hideDrafted={hideDrafted}
            onToggleHideDrafted={() => setHideDrafted((v) => !v)}
            search={search}
            onChangeSearch={setSearch}
            sortKey={sortKey}
            onChangeSortKey={setSortKey}
          />
        </div>

        <PlayerTable
          players={filteredPlayers}
          draftedIds={draftedIds}
          onToggleDrafted={onToggleDrafted}
        />
      </div>
    </div>
  );
}
