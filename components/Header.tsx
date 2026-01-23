'use client'

import Link from 'next/link'
import { useFilters } from './FilterProvider'

export default function Header() {
  const { filters, setWinterMode, setSundayOnly } = useFilters()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
            Things To Do in Provo
          </Link>
          
          <nav className="flex flex-wrap gap-4 items-center">
            <Link href="/nature" className="text-gray-700 hover:text-blue-600 font-medium">
              Nature
            </Link>
            <Link href="/culture" className="text-gray-700 hover:text-blue-600 font-medium">
              Culture
            </Link>
            <Link href="/entertainment" className="text-gray-700 hover:text-blue-600 font-medium">
              Entertainment
            </Link>
            <Link href="/culinary" className="text-gray-700 hover:text-blue-600 font-medium">
              Culinary
            </Link>
            
            <div className="flex gap-4 items-center border-l pl-4 ml-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.winterMode}
                  onChange={(e) => setWinterMode(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Winter Mode</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sundayOnly}
                  onChange={(e) => setSundayOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Sunday Open</span>
              </label>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
