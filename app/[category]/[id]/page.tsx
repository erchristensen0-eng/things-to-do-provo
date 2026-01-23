import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getActivityById, getCategoryDisplayName } from '@/lib/data'
import { Activity } from '@/types'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'

interface PageProps {
  params: {
    category: string
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const activity = getActivityById(params.id)
  
  if (!activity) {
    return {
      title: 'Activity Not Found',
    }
  }

  return {
    title: `${activity.name} | Things To Do in Provo`,
    description: activity.description,
    openGraph: {
      title: activity.name,
      description: activity.description,
      type: 'website',
    },
  }
}

export default function ActivityDetailPage({ params }: PageProps) {
  const activity = getActivityById(params.id)

  if (!activity || activity.category !== params.category) {
    notFound()
  }

  const schema = getJsonLdSchema(activity)

  return (
    <>
      <JsonLd data={schema} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href={`/${activity.category}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to {getCategoryDisplayName(activity.category)}
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  {activity.name}
                </h1>
                {activity.dry && (
                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded">
                    Dry
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {getCategoryDisplayName(activity.category)}
                </span>
                {activity.sunday_open && (
                  <span className="flex items-center gap-1 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Open on Sundays
                  </span>
                )}
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{activity.location}</span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                {activity.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(activity.specs).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500 capitalize mb-1">
                      {key.replace(/_/g, ' ')}
                    </dt>
                    <dd className="text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasonality</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Best Seasons: </span>
                  <span className="text-gray-900 capitalize">
                    {activity.seasonality.best_seasons.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Winter Accessible: </span>
                  <span className={activity.seasonality.winter_accessible ? 'text-green-600' : 'text-red-600'}>
                    {activity.seasonality.winter_accessible ? 'Yes' : 'No'}
                  </span>
                </div>
                {activity.seasonality.winter_notes && (
                  <div className="mt-2 p-3 bg-white rounded border-l-4 border-blue-500">
                    <span className="font-medium text-gray-700">Winter Notes: </span>
                    <span className="text-gray-900">{activity.seasonality.winter_notes}</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}

function getJsonLdSchema(activity: Activity) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': activity.category === 'culinary' ? 'Restaurant' : 
             activity.category === 'culture' ? 'Museum' : 
             'TouristAttraction',
    name: activity.name,
    description: activity.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Provo',
      addressRegion: 'UT',
      addressCountry: 'US',
    },
  }

  if (activity.category === 'culinary') {
    return {
      ...baseSchema,
      '@type': 'Restaurant',
      servesCuisine: 'Various',
      priceRange: activity.specs.price_range || '$$',
    }
  }

  if (activity.category === 'culture') {
    return {
      ...baseSchema,
      '@type': 'Museum',
      openingHours: activity.specs.hours || 'See website',
    }
  }

  return {
    ...baseSchema,
    '@type': 'TouristAttraction',
  }
}
