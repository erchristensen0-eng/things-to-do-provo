'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { FilterState } from '@/types'

interface FilterContextType {
  filters: FilterState
  setWinterMode: (enabled: boolean) => void
  setSundayOnly: (enabled: boolean) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    winterMode: false,
    sundayOnly: false,
  })

  const setWinterMode = (enabled: boolean) => {
    setFilters(prev => ({ ...prev, winterMode: enabled }))
  }

  const setSundayOnly = (enabled: boolean) => {
    setFilters(prev => ({ ...prev, sundayOnly: enabled }))
  }

  return (
    <FilterContext.Provider value={{ filters, setWinterMode, setSundayOnly }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
