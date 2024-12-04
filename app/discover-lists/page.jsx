"use client";

import ListCard from '@components/ListCard';
import LoadingCard from '@components/LoadingCard';
import PaginationControls from '@components/PaginationControls';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaFileCircleQuestion } from "react-icons/fa6";

import React, { useEffect, useState } from 'react'

const DiscoverLists = () => {

  const [lists, setLists] = useState([])
  const { data: session} = useSession();

  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [selectValue, setSelectValue] = useState('')

  const [pagination, setPagination] = useState({})
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectValue(value);
    
    router.push(`/discover-lists?q=${searchValue}&page=1&sort=${value}`)
  };
  
  const handlePageChange = (page) => {
    const query = {
      q: searchValue || '',
      page: page > 1 ? page: 1
    };
    router.push(`/discover-lists?${new URLSearchParams(query).toString()}`)
  } 


  useEffect(() => {
    const getLists = async () => {
      setIsLoading(true)
      try {
        const currentQuery = Object.fromEntries(searchParams.entries());
        const searchQuery = currentQuery.q || '';
        const page = currentQuery.page || 1;
        setSearchValue(searchQuery);
        const res = await fetch(`/api/list?q=${searchQuery}&page=${page}&sort=${selectValue}`);
        const data = await res.json();
        console.log(data)
        setLists(data.lists)
        setPagination(data.pagination)
      } catch (error) {
        console.error('Failed to fetch lists:', error);
      } finally {
        setIsLoading(false)
      }
    }
    getLists()
  }, [searchParams, selectValue])

  return (
    <section className=' relative flex flex-col'>
      <h1 className='text-center text-base sm:text-xl font-semibold text-indigo-500 my-4'>Find new lists to play!</h1>
      <div className='flex gap-4 justify-center my-4 px-2'>
        <form
          className="searchBar"
          onSubmit={(e) => {
            e.preventDefault();
            handlePageChange()
          }}
        >
          <input 
            className='px-2 py-1 text-sm rounded-md border-indigo-400 border outline-none' 
            type="text" 
            placeholder='Search by title...'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </form>
        <div className="filter text-sm">
          <select value={selectValue} onChange={handleSelectChange} className='px-2 py-1 rounded-md border-indigo-400 border'>
            <option value="">Sort by</option>
            <option value="title-asc">Title (A - Z)</option>
            <option value="title-desc">Title (Z - A)</option>
            <option value="likes-desc">Most liked</option>
            <option value="likes-asc">Least liked</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2'>
            {isLoading ?
              [...Array(9)].map((_, index) => (
                <LoadingCard key={index} />
              ))
              : lists.length === 0 ?
              <div className='border bg-white shadow-lg p-2 rounded-md text-sm w-full max-w-72 flex flex-col gap-2 h-72 col-start-2'>
                <div className='flex flex-col justify-center h-full gap-6'>
                  <div className='flex w-full justify-center'>
                    <FaFileCircleQuestion size={50}/>
                  </div>
                  <div>
                    <p>Oops! We couldn’t find anything.</p>
                    <p>Try another search!</p>
                  </div>
                </div>
              </div>
              :
              lists.map(entry => (
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
          <PaginationControls
            currentPage={pagination.currentPage}
            onPageChange={handlePageChange}
            totalPages={pagination.totalPages}
          />
    </section>
  )
}

export default DiscoverLists