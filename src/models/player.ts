export type Position = 'QB' | 'RB' | 'WR' | 'TE';

export interface Player {
  id: string
  name: string
  position: Position
  team: string
  projection: number | null
  tier: number
}
