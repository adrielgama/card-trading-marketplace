import React, { Suspense, useState } from 'react'

import BackgroundImage from '@/assets/bg-spark.webp'
import { TabBar } from '@/components/shared/account'
import { Navbar } from '@/components/shared/navbar'
import { Spinner } from '@/components/shared/spinner'

const AccountSection = React.lazy(
  () => import('@/components/shared/account/accountSection')
)
const CardsSection = React.lazy(
  () => import('@/components/shared/account/cardsSection')
)

const MyAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('minhaConta')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <>
      <div
        className="relative h-screen w-screen overflow-hidden bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <Navbar />
        <div className="z-10 lg:container lg:mt-20">
          <TabBar activeTab={activeTab} onTabClick={handleTabClick} />
          <div className="my-2 ">
            <Suspense fallback={<Spinner />}>
              {activeTab === 'minhaConta' && <AccountSection />}
              {activeTab === 'minhasCartas' && <CardsSection />}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAccount
