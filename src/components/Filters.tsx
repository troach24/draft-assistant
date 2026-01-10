import type { Position } from '../models/player'

export type PositionFilter = 'ALL' | 'FLEX' | Position

type Props = {
  position: PositionFilter
  onChangePosition: (next: PositionFilter) => void
}

const OPTIONS: { value: PositionFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'QB', label: 'QB' },
  { value: 'RB', label: 'RB' },
  { value: 'WR', label: 'WR' },
  { value: 'TE', label: 'TE' },
  { value: 'FLEX', label: 'Flex (RB/WR/TE)' },
]

export function Filters({ position, onChangePosition }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="text-sm text-slate-300">
        Position
        <select
          value={position}
          onChange={(e) => onChangePosition(e.target.value as PositionFilter)}
          className="ml-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
