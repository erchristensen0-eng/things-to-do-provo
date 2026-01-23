import Link from 'next/link'
import { Activity } from '@/types'

interface ActivityCardProps {
  activity: Activity
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Link 
      href={`/${activity.category}/${activity.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{activity.name}</h3>
          {activity.dry && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              Dry
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{activity.location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {activity.sunday_open && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Open Sunday
            </span>
          )}
          <span className="capitalize">{activity.category}</span>
        </div>
      </div>
    </Link>
  )
}
