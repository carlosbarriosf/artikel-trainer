import React, { useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Link from "next/link";
import ListCard from "@components/ListCard";
import Image from "next/image";
import LoadingCard from "./LoadingCard";
import ListErrorCard from "./ListErrorCard";
import { BiSolidError } from "react-icons/bi";
import { FaFileCircleQuestion } from "react-icons/fa6";

const Profile = ({
  session = undefined,
  id,
  userLists,
  profilePic,
  userName,
  profileId,
  isLoading,
  error,
}) => {
  const [createListHover, setCreateListHover] = useState(false);
  return (
    <section className="flex flex-col sm:flex-row">
      {error === null ? (
        <>
          <div className="hidden sm:flex min-w-32 flex-col gap-3 justify-center items-center p-2 sm:self-start">
            {isLoading ? (
              <>
                <div className="w-12 h-12 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-24 h-3 bg-gray-400 animate-pulse rounded-md"></div>
              </>
            ) : (
              <>
                <Image
                  src={profilePic}
                  alt={`${userName}'s profile picture`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <p>{userName}</p>
              </>
            )}
            {session?.user.id === profileId && isLoading === false && (
              <>
                <Link href="/create-list">
                  <button
                    className="btn bg-cyan-700 transition-all w-24 h-8 flex justify-center items-center"
                    onMouseEnter={() => {
                      setCreateListHover(true);
                    }}
                    onMouseLeave={() => {
                      setCreateListHover(false);
                    }}
                  >
                    {createListHover ? (
                      <MdOutlineLibraryAdd size={20} />
                    ) : (
                      "New List"
                    )}
                  </button>
                </Link>
                <Link
                  href={`/profile/${profileId}/likes`}
                  className="btn bg-red-600 hover:bg-red-500 transition-all w-24 h-8 flex justify-center items-center"
                >
                  Likes
                </Link>
              </>
            )}
          </div>
          <div className="w-full max-w-screen-lg mx-auto">
            {/* <h1 className='text-center text-xl sm:text-2xl text-cyan-600 mb-4'>{session?.user.id === id ? 'My' : userName}</h1> */}
            {isLoading ? (
              <div className="w-32 mx-auto bg-gray-300 h-7 animate-pulse mb-4 rounded-md"></div>
            ) : (
              <h1 className="text-center text-xl sm:text-2xl text-cyan-600 mb-4">
                {session?.user.id === id ? "My" : userName} lists
              </h1>
            )}
            <div
              className={`${isLoading === false && userLists.length === 0 ? "flex" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2"}`}
            >
              {isLoading ? (
                [...Array(9)].map((_, index) => <LoadingCard key={index} />)
              ) : userLists.length === 0 ? (
                <ListErrorCard
                  errorMsg="You have no lists yet"
                  errorPrompt="Try creating a new one!"
                  icon={<FaFileCircleQuestion size={50} />}
                />
              ) : (
                userLists.map((entry) => (
                  <div
                    key={entry._id}
                    className="border bg-white shadow-lg p-2 rounded-md text-sm w-full max-w-72 flex flex-col gap-2"
                  >
                    <ListCard entry={entry} session={session} />
                  </div>
                ))
              )}
            </div>
            <div className="w-full flex justify-center mt-4 sm:hidden">
              <Link
                href={`/profile/${profileId}/likes`}
                className="btn bg-red-600 hover:bg-red-500 transition-all w-24 h-8 flex justify-center items-center"
              >
                Likes
              </Link>
            </div>
          </div>
        </>
      ) : (
        <ListErrorCard
          errorMsg={error.errorMsg}
          errorPrompt={error.errorPrompt}
          icon={<BiSolidError size={50} />}
        />
      )}
    </section>
  );
};

export default Profile;
