'use client'

import Link from 'next/link'
import { getAllActivities, getCategoryDisplayName, filterActivities } from '@/lib/data'
import { useFilters } from '@/components/FilterProvider'
import ActivityCard from '@/components/ActivityCard'
import { Activity } from '@/types'

export default function Home() {
  const { filters } = useFilters()
  const allActivities = getAllActivities()
  const filteredActivities = filterActivities(allActivities, filters)

  const categories: Activity['category'][] = ['nature', 'culture', 'entertainment', 'culinary']
  
  const featuredByCategory = categories.map(category => ({
    category,
    activities: filteredActivities
      .filter(a => a.category === category)
      .slice(0, 3)
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Things To Do in Provo, Utah
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the best activities, attractions, restaurants, and entertainment in Provo
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

      <div className="space-y-16">
        {featuredByCategory.map(({ category, activities }) => (
          <section key={category}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {getCategoryDisplayName(category)}
              </h2>
              <Link
                href={`/${category}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All →
              </Link>
            </div>
            
            {activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No activities found matching your filters.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
