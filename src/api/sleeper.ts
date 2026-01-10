import type { SleeperPlayer } from "./sleeper.types";
const BASE_URL = 'https://api.sleeper.app/v1'

export async function fetchPlayers(): Promise<SleeperPlayer> {
  const res = await fetch(`${BASE_URL}/players/nfl`)
  if (!res.ok) {
    throw new Error('Failed to fetch players')
  }
  return res.json()
}
