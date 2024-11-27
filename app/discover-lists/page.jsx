"use client";

import ListCard from '@components/ListCard';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const DiscoverLists = () => {

  const [lists, setLists] = useState([])
  const { data: session} = useSession();

  const [searchValue, setSearchValue] = useState('')

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
    <section>
      <h1 className='text-center text-base sm:text-xl font-semibold text-indigo-500 my-4'>Find new lists to play!</h1>
      <div className='flex gap-4 justify-center my-4 px-2'>
        <div className="searchBar">
          <input 
            className='px-2 py-1 text-sm rounded-md border-indigo-400 border' 
            type="text" 
            placeholder='Search by title...'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              
            }}
          />
        </div>
        <div className="filter text-sm">
          <select name="" id="" className='px-2 py-1 rounded-md border-indigo-400 border'>
            <option selected disabled value="Filter by">Filter by</option>
            <option value="Likes">Likes</option>
            <option value="Title">Title</option>
          </select>
        </div>
      </div>
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
    </section>
  )
}

export default DiscoverLists