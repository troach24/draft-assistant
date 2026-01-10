import { useEffect, useState } from "react";
import { fetchPlayers } from "../api/sleeper";
import type { Player, Position } from "../models/player";
import type { SleeperPlayer } from "../api/sleeper.types";

const ALLOWED_POSITIONS = new Set<Position>(["QB", "RB", "WR", "TE"]);

function toName(p: SleeperPlayer) {
  const full = (p.full_name ?? "").trim();
  if (full) return full;

  const first = (p.first_name ?? "").trim();
  const last = (p.last_name ?? "").trim();
  const combined = `${first} ${last}`.trim();

  return combined || p.player_id;
}

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayers()
      .then((data) => {
        const normalized: Player[] = Object.values(data)
          .filter((p: SleeperPlayer) => {
            const pos = p.position as Position;
            const hasTeam = Boolean(p.team_abbr ?? p.team);
            return Boolean(p.position) && hasTeam && ALLOWED_POSITIONS.has(pos);
          })
          .map((p: SleeperPlayer) => ({
            id: p.player_id,
            name: toName(p),
            position: p.position as Position,
            team: (p.team_abbr ?? p.team) as string,
            projection: null,
            tier: 0,
          }))
          .sort(
            (a, b) =>
              a.position.localeCompare(b.position) || a.name.localeCompare(b.name)
          );

        setPlayers(normalized);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load players");
      })
      .finally(() => setLoading(false));
  }, []);

  return { players, loading, error };
}
