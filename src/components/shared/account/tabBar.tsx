import React from 'react'

import { Tab } from '.'

interface TabBarProps {
  activeTab: string
  onTabClick: (tabName: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="relative z-20 flex h-16 w-full flex-row bg-white text-center">
      <Tab
        isActive={activeTab === 'minhaConta'}
        label="Conta"
        onClick={() => onTabClick('minhaConta')}
      />
      <Tab
        isActive={activeTab === 'minhasCartas'}
        label="Minhas cartas"
        onClick={() => onTabClick('minhasCartas')}
      />
    </div>
  )
}
