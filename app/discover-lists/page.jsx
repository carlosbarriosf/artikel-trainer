"use client";

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';


import React, { useEffect, useState } from 'react'
import ListPage from '@components/ListPage';

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
      page: page > 1 ? page: 1,
      sort: selectValue
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
    <ListPage 
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      selectValue={selectValue}
      setSelectValue={setSelectValue}
      handleSelectChange={handleSelectChange}
      handlePageChange={handlePageChange}
      lists={lists}
      isLoading={isLoading}
      pagination={pagination}
      session={session}
      title={`Find new lists to play!`}
    />
  )
}

export default DiscoverLists