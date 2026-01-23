'use client'

import { useParams } from 'next/navigation'
import { getAllActivities, getCategoryDisplayName, filterActivities } from '@/lib/data'
import { useFilters } from '@/components/FilterProvider'
import ActivityCard from '@/components/ActivityCard'
import { Activity } from '@/types'

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as Activity['category']
  const { filters } = useFilters()
  
  const allActivities = getAllActivities()
  const categoryActivities = allActivities.filter(a => a.category === category)
  const filteredActivities = filterActivities(categoryActivities, filters)

  if (!['nature', 'culture', 'entertainment', 'culinary'].includes(category)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <p className="text-gray-600">The category you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {getCategoryDisplayName(category)}
        </h1>
        <p className="text-gray-600">
          {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
        </p>
      </div>

      {filters.winterMode && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
          <p className="text-blue-700">
            <strong>Winter Mode Active:</strong> Showing only winter-accessible activities
          </p>
        </div>
      )}

      {filters.sundayOnly && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded">
          <p className="text-green-700">
            <strong>Sunday Filter Active:</strong> Showing only activities open on Sundays
          </p>
        </div>
      )}

      {filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            No activities found matching your filters.
          </p>
          <p className="text-gray-400">
            Try adjusting your Winter Mode or Sunday Filter settings.
          </p>
        </div>
      )}
    </div>
  )
}
