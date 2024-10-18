"use client";

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = () => {

  const { id } = useParams()
  console.log(id)

  const [userLists, setUserLists] = useState([])
  const [user, setUser] = useState({})

  const { data: session } = useSession()


  const fetchLists = async () => {
    const res = await fetch(`/api/users/${id}/lists`);
    const data = await res.json()
    console.log(data)

    setUserLists(data)
  }

  const fetchUser = async () => {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json()
    console.log(data)

    setUser(data)
  }

  useEffect(() => {
    fetchLists();
    fetchUser();
  }, [])

  return (
    <Profile 
      session={session?.user.id === id ? session : undefined}
      userLists={userLists}
      profilePic={user.image}
      userName={user.username}
    />
  )
}

export default UserProfile