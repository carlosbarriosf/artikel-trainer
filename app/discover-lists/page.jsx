"use client";

import ListCard from '@components/ListCard';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const DiscoverLists = () => {

  const [lists, setLists] = useState([])
  const { data: session} = useSession();

  useEffect(() => {
    const getLists = async () => {
      const res = await fetch('/api/list');
      const data = await res.json();
      console.log(data)
      setLists(data)
    }
    getLists()
  }, [])

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2'>
            {lists.length > 0 && 
              lists.map(entry => (
                <div key={entry._id} className='border bg-white shadow-lg p-2 rounded-md text-sm w-full max-w-72 flex flex-col gap-2'>
                  <ListCard 
                    entry={entry} 
                    session={session}
                />
                </div>
              ))
            }
          </div>
    </div>
  )
}

export default DiscoverLists