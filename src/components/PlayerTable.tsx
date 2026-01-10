import { useMemo } from 'react';
import type { Player } from '../models/player';

type Props = {
  players: Player[];
  draftedIds: Set<string>;
  onToggleDrafted: (playerId: string) => void;
}

export function PlayerTable({ players, draftedIds, onToggleDrafted }: Props) {
  const rows = useMemo(() => {
    return players.slice(0, 800) // limit API response data
  }, [players]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Players</h2>
          <p className="text-sm text-slate-400">
            Showing {rows.length} of {players.length}
          </p>
        </div>
        <div className="text-xs text-slate-500">
          Click a row to toggle drafted
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-slate-950">
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Pos</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3 text-right">Proj</th>
              <th className="px-4 py-3 text-right">Tier</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {rows.map((p) => {
              const drafted = draftedIds.has(p.id)

              return (
                <tr
                  key={p.id}
                  onClick={() => onToggleDrafted(p.id)}
                  className={[
                    'cursor-pointer select-none',
                    drafted
                      ? 'bg-slate-950/40 text-slate-500'
                      : 'hover:bg-slate-900/40 text-slate-100',
                  ].join(' ')}
                >
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <span className={drafted ? 'line-through' : ''}>
                        {p.name}
                      </span>
                      {drafted && (
                        <span className="rounded-full border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                          Drafted
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.position}</td>
                  <td className="px-4 py-3">{p.team}</td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    {p.projection ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    {p.tier || '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={[
                        'inline-flex items-center rounded-full px-2 py-0.5 text-xs',
                        drafted
                          ? 'bg-slate-800 text-slate-200'
                          : 'bg-emerald-900/40 text-emerald-200',
                      ].join(' ')}
                    >
                      {drafted ? 'Taken' : 'Available'}
                    </span>
                  </td>
                </tr>
              )
            })}

            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-400" colSpan={6}>
                  No players to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
