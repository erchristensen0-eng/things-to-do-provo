export interface Activity {
  id: string
  name: string
  category: 'nature' | 'culture' | 'entertainment' | 'culinary'
  description: string
  location: string
  specs: Record<string, string>
  seasonality: {
    best_seasons: string[]
    winter_accessible: boolean
    winter_notes?: string
  }
  sunday_open: boolean
  dry: boolean
}

export interface FilterState {
  winterMode: boolean
  sundayOnly: boolean
}
