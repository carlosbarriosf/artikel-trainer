"use client";

import ListCard from '@components/ListCard';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const DiscoverLists = () => {

  const [lists, setLists] = useState([])
  const { data: session} = useSession();

  const [searchValue, setSearchValue] = useState('')
  const [debouncedSeachValue, setDebouncedSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [selectValue, setSelectValue] = useState('')
  const [sortedLists, setSortedLists] = useState(lists)

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectValue(value);

    const sorted = [...lists].sort((a, b) => {
        if (value === 'title-asc') {
            return a.list.name.localeCompare(b.list.name);
        }
        if (value === 'title-desc') {
            return b.list.name.localeCompare(a.list.name);
        }
        if (value === 'likes-asc') {
            return b.likedBy.length - a.likedBy.length;
        }
        if (value === 'likes-desc') {
            return a.likedBy.length - b.likedBy.length;
        }
        return 0; // No sorting
    });
    setSortedLists(sorted);
};


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, 300);
    return () => clearTimeout(timer)
  }, [searchValue])

  useEffect(() => {
    const getLists = async () => {
      setIsLoading(true)
      try {
        console.log(debouncedSeachValue)
        const res = await fetch(
            debouncedSeachValue
            ? `/api/list?q=${debouncedSeachValue}`
            : '/api/list');
        const data = await res.json();
        console.log(data)
        setLists(data)
        setSortedLists(data)
      } catch (error) {
        console.error('Failed to fetch lists:', error);
      } finally {
        setIsLoading(false)
      }
    }
    getLists()
  }, [debouncedSeachValue])

  return (
    <section>
      <h1 className='text-center text-base sm:text-xl font-semibold text-indigo-500 my-4'>Find new lists to play!</h1>
      <div className='flex gap-4 justify-center my-4 px-2'>
        <div className="searchBar">
          <input 
            className='px-2 py-1 text-sm rounded-md border-indigo-400 border outline-none' 
            type="text" 
            placeholder='Search by title...'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div className="filter text-sm">
          <select value={selectValue} onChange={handleSelectChange} className='px-2 py-1 rounded-md border-indigo-400 border'>
            <option value="">Sort by</option>
            <option value="title-asc">Title (A - Z)</option>
            <option value="title-desc">Title (Z - A)</option>
            <option value="likes-asc">Most liked</option>
            <option value="likes-desc">Least liked</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2'>
            {sortedLists.length > 0 && 
              sortedLists.map(entry => (
                <div key={entry._id} className='border bg-white shadow-lg p-2 rounded-md text-sm w-full max-w-72 flex flex-col gap-2'>
                  <ListCard 
                    entry={entry} 
                    session={session}
                />
                <div className='flex items-center mt-2'>
                  <Link href={`/profile/${entry.creator._id}`}>
                    <Image 
                      className='rounded-full mr-2' 
                      src={entry.creator.image} 
                      width={24} 
                      height={24}
                      alt={`${entry.creator.username} profile picture`}
                      />
                  </Link>
                  <p>
                    {entry.creator.username}
                  </p>
                </div>
                </div>
              ))
            }
          </div>
    </section>
  )
}

export default DiscoverLists