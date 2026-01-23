import type { Metadata } from 'next'
import './globals.css'
import { FilterProvider } from '@/components/FilterProvider'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Things To Do in Provo, Utah',
  description: 'Discover the best activities, attractions, restaurants, and entertainment in Provo, Utah. Your complete guide to exploring Provo.',
  keywords: 'Provo Utah, things to do, activities, attractions, restaurants, entertainment, hiking, museums',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FilterProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; {new Date().getFullYear()} Things To Do in Provo, Utah. All rights reserved.</p>
            </div>
          </footer>
        </FilterProvider>
      </body>
    </html>
  )
}
