import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import BackgroundImage from '@/assets/bg-2.jpg'
import { Navbar } from '@/components/shared/navbar'
import { Spinner } from '@/components/shared/spinner'
import { useUserContext } from '@/context/UserContext'

import { MyAccountSection } from './myAccount'
import { MyCardsSection } from './myCards'

const MyAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('minhaConta')
  const { fetchUser, fetchUserCards } = useUserContext()

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['my-account'],
    queryFn: fetchUser,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  })

  const {
    data: userCardsData,
    isLoading: isCardsLoading,
    error: cardsError,
  } = useQuery({
    queryKey: ['my-cards'],
    queryFn: fetchUserCards,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 60 * 1000, // 1 hour
  })

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  if (isUserLoading || isCardsLoading) {
    return <Spinner />
  }
  if (userError) {
    return <div>Error: {userError.message}</div>
  }
  if (cardsError) {
    return <div>Error: {cardsError.message}</div>
  }

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-cover bg-right bg-no-repeat"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <Navbar />
      <div className="z-10 lg:container lg:mt-20">
        <div className="relative z-20 flex h-16 w-full flex-row bg-white text-center">
          <div
            onClick={() => handleTabClick('minhaConta')}
            className={`flex h-full w-full cursor-pointer items-center justify-center px-4 font-bold ${
              activeTab === 'minhaConta'
                ? 'border-b-4 border-in-green-100 text-in-green-100'
                : 'text-in-green-900/60 hover:bg-slate-200'
            }`}
          >
            Conta
          </div>
          <div
            onClick={() => handleTabClick('minhasCartas')}
            className={`flex h-full w-full cursor-pointer items-center justify-center px-4 font-bold ${
              activeTab === 'minhasCartas'
                ? 'border-b-4 border-in-green-100 text-in-green-100'
                : 'text-in-green-900 hover:bg-slate-200'
            }`}
          >
            Minhas cartas
          </div>
        </div>
        <div className="my-2 h-screen">
          {activeTab === 'minhaConta' && userData && (
            <div className="bg-in-green-50/80 p-4 backdrop-blur-md">
              <MyAccountSection name={userData.name} email={userData.email} />
            </div>
          )}
          {activeTab === 'minhasCartas' && (
            <div>
              <div className="bg-in-green-50/80 p-4 backdrop-blur-md">
                {userCardsData?.length !== 0 ? (
                  <div className="bg-in-green-50/80 p-4 backdrop-blur-md">
                    <MyCardsSection cards={userCardsData!} />
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col items-center justify-center space-y-4">
                    <button
                      onClick={() => {
                        console.log('Adicionar cartas') // TODO Ajustar a funcionalidade para adicionar novas cartas
                      }}
                      className="rounded-md border border-transparent bg-in-green-300 px-4 py-2 text-base font-medium text-white hover:bg-in-green-100"
                    >
                      Adicionar cartas
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyAccount
