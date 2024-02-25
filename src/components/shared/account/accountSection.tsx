import React from 'react'

import { toast } from 'sonner'

import { useUserData } from '@/hooks/useUserData'
import { MyAccountSection } from '@/pages/account/myAccount'

import { Spinner } from '../spinner'

const AccountSection: React.FC = () => {
  const { data: userData, isLoading, error } = useUserData()

  if (isLoading) return <Spinner />
  if (error) return toast(`Error: ${error.message}}`)

  return (
    <div className="flex h-[75vh] justify-center bg-in-green-50/80 p-4 backdrop-blur-md">
      <MyAccountSection name={userData?.name} email={userData?.email} />
    </div>
  )
}

export default AccountSection
