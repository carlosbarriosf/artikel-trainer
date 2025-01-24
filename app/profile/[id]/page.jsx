"use client";

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = () => {

  const { id } = useParams()

  const [userLists, setUserLists] = useState([])
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { data: session, status } = useSession()


  const fetchLists = async () => {
    const res = await fetch(`/api/users/${id}/lists`);
    const data = await res.json()

    setUserLists(data)
  }

  const fetchUser = async () => {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json()

    setUser(data)
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      if(status === "authenticated" && session?.user?.id) {
        try {
          await fetchLists();
          await fetchUser();
        } catch (error) {
          console.error('Failed to fetch lists:', error);
        } finally {
          setIsLoading(false)
        }
      }
    }

    getData()
  }, [status])

  return (
    <Profile 
      session={session}
      id={id}
      userLists={userLists}
      profilePic={user.image}
      userName={user.username}
      profileId={id}
      isLoading={isLoading}
    />
  )
}

export default UserProfile