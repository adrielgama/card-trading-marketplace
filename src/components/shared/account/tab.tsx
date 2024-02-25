import React from 'react'

interface TabProps {
  isActive: boolean
  label: string
  onClick: () => void
}

export const Tab: React.FC<TabProps> = ({ isActive, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex h-full w-full cursor-pointer items-center justify-center px-4 font-bold ${
        isActive
          ? 'border-b-4 border-in-green-100 text-in-green-100'
          : 'text-in-green-900 hover:bg-slate-200'
      }`}
    >
      {label}
    </div>
  )
}
