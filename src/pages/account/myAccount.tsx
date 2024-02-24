import React from 'react'

import BackgroundImage from '@/assets/logo.webp'

interface User {
  name: string
  email: string
}

export const MyAccountSection: React.FC<User> = ({ name, email }) => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center space-y-12">
      <div
        className="flex h-40 w-40 items-center justify-center rounded-full border-4 bg-white bg-contain bg-center bg-no-repeat drop-shadow-md"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-in-green-300">{name}</h1>
        <p className="text-sm text-in-green-400/80">{email}</p>
      </div>
    </div>
  )
}
