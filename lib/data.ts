import { Activity } from '@/types'
import directoryData from '@/data/directory.json'

export function getAllActivities(): Activity[] {
  return directoryData as Activity[]
}

export function getActivityById(id: string): Activity | undefined {
  return getAllActivities().find(activity => activity.id === id)
}

export function getActivitiesByCategory(category: Activity['category']): Activity[] {
  return getAllActivities().filter(activity => activity.category === category)
}

export function filterActivities(
  activities: Activity[],
  filters: { winterMode?: boolean; sundayOnly?: boolean }
): Activity[] {
  let filtered = [...activities]

  if (filters.sundayOnly) {
    filtered = filtered.filter(activity => activity.sunday_open)
  }

  if (filters.winterMode) {
    filtered = filtered.filter(activity => activity.seasonality.winter_accessible)
  }

  return filtered
}

export function getCategoryDisplayName(category: Activity['category']): string {
  const names: Record<Activity['category'], string> = {
    nature: 'Nature & Outdoors',
    culture: 'Culture & Museums',
    entertainment: 'Entertainment',
    culinary: 'Culinary & Dining',
  }
  return names[category]
}
