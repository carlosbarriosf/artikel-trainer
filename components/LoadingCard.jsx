import React from 'react'

const LoadingCard = () => {
  return (
    <div className='border bg-white shadow-lg p-2 rounded-md text-sm w-full max-w-72 flex flex-col gap-2 h-72'>
        <div className='w-full bg-gray-300 h-8 animate-pulse'></div>
        <div className='flex flex-col gap-3 h-full justify-center'>
            {[...Array(7)].map((_, index) => (
                <div key={index} className='w-full bg-gray-300 h-3 animate-pulse'></div>
            ))}
        </div>
    </div>
  )
}

export default LoadingCard