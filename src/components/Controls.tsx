import type { PositionFilter } from "./Filters";

export type SortKey = "POS_NAME" | "NAME" | "TEAM";

type Props = {
  position: PositionFilter;
  onChangePosition: (next: PositionFilter) => void;

  hideDrafted: boolean;
  onToggleHideDrafted: () => void;

  search: string;
  onChangeSearch: (next: string) => void;

  sortKey: SortKey;
  onChangeSortKey: (next: SortKey) => void;
};

export function Controls({
  position,
  onChangePosition,
  hideDrafted,
  onToggleHideDrafted,
  search,
  onChangeSearch,
  sortKey,
  onChangeSortKey,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Position */}
      <label className="text-sm text-slate-300">
        Position
        <select
          value={position}
          onChange={(e) => onChangePosition(e.target.value as PositionFilter)}
          className="ml-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="ALL">All</option>
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="TE">TE</option>
          <option value="FLEX">Flex (RB/WR/TE)</option>
        </select>
      </label>

      {/* Search */}
      <label className="text-sm text-slate-300">
        Search
        <input
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="e.g. McCaffrey"
          className="ml-2 w-56 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      {/* Sort */}
      <label className="text-sm text-slate-300">
        Sort
        <select
          value={sortKey}
          onChange={(e) => onChangeSortKey(e.target.value as SortKey)}
          className="ml-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="POS_NAME">Pos → Name</option>
          <option value="NAME">Name</option>
          <option value="TEAM">Team → Name</option>
        </select>
      </label>

      {/* Hide drafted */}
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={hideDrafted}
          onChange={onToggleHideDrafted}
          className="h-4 w-4 accent-emerald-500"
        />
        Hide drafted
      </label>
    </div>
  );
}
