import React, { useState } from 'react'
import { MdOutlineLibraryAdd } from "react-icons/md";
import Link from 'next/link';
import ListCard from '@components/ListCard';
import Image from 'next/image';

const Profile = ({
    session = undefined,
    userLists,
    profilePic,
    userName
}) => {

  const [createListHover, setCreateListHover] = useState(false)


  return (
    <section className='flex flex-col sm:flex-row'>
      <div className='hidden sm:flex min-w-32 flex-col gap-3 justify-center items-center p-2 sm:self-start'>
          <Image
            src={profilePic}
            alt={`${userName}'s profile picture`}
            width={50}
            height={50}
            className='rounded-full'
          />
          <p>{userName}</p>
          {session &&
            <Link href='/create-list'>
                <button 
                className='btn bg-cyan-700 transition-all w-24 h-8 flex justify-center items-center'
                onMouseEnter={() => {
                    setCreateListHover(true)
                }}
                onMouseLeave={() => {
                    setCreateListHover(false)
                }}
                >
                {createListHover ? <MdOutlineLibraryAdd size={20}/> : 'New List'}
                </button>
            </Link>
          }
      </div>
      <div className='w-full max-w-screen-lg mx-auto'>
          <h1 className='text-center text-xl sm:text-2xl text-cyan-600 mb-4'>{session ? 'My' : userName} lists</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2'>
            {userLists.length > 0 && 
              userLists.map(entry => (
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
    </section>
  )
}

export default Profile