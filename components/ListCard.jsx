import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'

const ListCard = ({
    entry,
    session = undefined
}) => {

  const [onListNameHover, setOnListNameHover] = useState(false)
  const router = useRouter();


  return (
    <>
        <div className='relative'>
            <h3 
                className='text-indigo-500 text-center sm:text-lg truncate'
                onMouseEnter={() => setOnListNameHover(true)}
                onMouseLeave={() => setOnListNameHover(false)}
            >
                {entry.list.name}
            </h3>
            {onListNameHover && 
                <p className='absolute bg-gray-600 text-white p-2 appear rounded-md'>{entry.list.name}</p>
            }
        </div>
        <p>{entry.list.words[0].article} <span className='capitalize'>{entry.list.words[0].noun}</span></p>
        <p>{entry.list.words[1].article} <span className='capitalize'>{entry.list.words[1].noun}</span></p>
        <p>{entry.list.words[2].article} <span className='capitalize'>{entry.list.words[2].noun}</span></p>
        <p>{entry.list.words[3].article} <span className='capitalize'>{entry.list.words[3].noun}</span></p>
        <p>...</p>
        <div className='flex justify-center'>
        <Link href={`play/${entry._id}`} className='btn bg-indigo-500 hover:bg-indigo-400 transition-all text-center w-1/3 block '>
            Play
        </Link>
        </div>
        <div className='flex justify-between items-center'>
            <p className='flex justify-end items-center gap-2'>
                <FaHeart className='cursor-pointer text-indigo-500 hover:text-indigo-400 transition-all' /> <span>{entry.likes > 0 && entry.likes}</span>
            </p>
            {
                session.user.id === entry.creator._id &&
                <button 
                    onClick={() => router.push(`/edit-list?id=${entry._id}`)}
                >
                    <FiEdit className='cursor-pointer
                                    text-indigo-500
                                    hover:text-indigo-400 
                                    transition-all'
                    />
                </button>
            }
        </div>
    </>
  )
}

export default ListCard