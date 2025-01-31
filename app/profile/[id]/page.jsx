"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const { id } = useParams();

  const [userLists, setUserLists] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null); //reset error state before fetching
      if (status === "authenticated" && session?.user?.id) {
        try {
          const listResponse = await fetch(`/api/users/${id}/lists`);
          if (!listResponse.ok) throw new Error("Failed to fetch lists");
          const listData = await listResponse.json();

          const userResponse = await fetch(`/api/users/${id}`);
          if (!userResponse.ok) throw new Error("Failed to fetch user");
          const userData = await userResponse.json();

          setUserLists(listData);
          setUser(userData);
        } catch (error) {
          setError({
            errorMsg: "Something went wrong",
            errorPrompt: "Please try again later",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    getData();
  }, [status]);

  return (
    <Profile
      session={session}
      id={id}
      userLists={userLists}
      profilePic={user.image}
      userName={user.username}
      profileId={id}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default UserProfile;
