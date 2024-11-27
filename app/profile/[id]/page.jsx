"use client";

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = () => {

  const { id } = useParams()

  const [userLists, setUserLists] = useState([])
  const [user, setUser] = useState({})

  const { data: session } = useSession()


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
    fetchLists();
    fetchUser();
  }, [])

  return (
    <Profile 
      session={session}
      userLists={userLists}
      profilePic={user.image}
      userName={user.username}
      profileId={id}
    />
  )
}

export default UserProfile