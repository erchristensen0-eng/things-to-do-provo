import { MetadataRoute } from 'next'
import { getAllActivities } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourusername.github.io/ThingsToDoP' // Update with your GitHub Pages URL
  
  const activities = getAllActivities()
  
  const activityUrls = activities.map(activity => ({
    url: `${baseUrl}/${activity.category}/${activity.id}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryUrls = [
    { category: 'nature', priority: 0.9 },
    { category: 'culture', priority: 0.9 },
    { category: 'entertainment', priority: 0.9 },
    { category: 'culinary', priority: 0.9 },
  ].map(({ category, priority }) => ({
    url: `${baseUrl}/${category}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...categoryUrls,
    ...activityUrls,
  ]
}
