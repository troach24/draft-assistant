export interface SleeperPlayer {
  player_id: string
  sport: 'nfl'

  // Identity
  first_name: string
  last_name: string
  full_name: string
  hashtag: string

  // Team / status
  team: string
  team_abbr: string
  position: string
  fantasy_positions: string[]
  status: string
  active: boolean
  number: number
  years_exp: number

  // Physical
  height: string
  weight: string
  age: number

  // Biographical
  birth_date: string
  birth_city: string
  birth_state: string
  birth_country: string
  college: string
  high_school: string

  // Injury / practice
  injury_status: string
  injury_body_part: string
  injury_notes: string
  injury_start_date: string
  practice_participation: string
  practice_description: string

  // Depth chart
  depth_chart_position: string
  depth_chart_order: number
  team_changed_at: number

  // IDs (external providers)
  espn_id: number
  yahoo_id: number
  rotowire_id: number
  rotoworld_id: number
  fantasy_data_id: number
  stats_id: number
  sportradar_id: string
  pandascore_id: number
  opta_id: string
  oddsjam_id: string
  kalshi_id: string
  swish_id: string
  gsis_id: string

  // Search helpers
  search_first_name: string
  search_last_name: string
  search_full_name: string
  search_rank: number

  // Misc
  player_shard: string
  competitions: unknown[]
  news_updated: number

  metadata: {
    channel_id?: string
  }
}
