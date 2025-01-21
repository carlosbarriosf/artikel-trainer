"use client";

import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'


const NavBar = () => {

    const { data: session, status } = useSession()
    const [toggleMenu, setToggleMenu] = useState(false)
    const [providers, setProviders] = useState(null)
    const menuRef = useRef(null)

    console.log("Session status:", status);
    console.log("Session data:", session);

    useEffect(() => {
        const setUpProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        }

        setUpProviders()
    }, [])


    useEffect(() => {
        const handleClickOutsideMenu = (e) => {
            if (toggleMenu && menuRef.current && !menuRef.current.contains(e.target)) {
                setToggleMenu(false)
            }
        }

        document.addEventListener('click', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('click', handleClickOutsideMenu)
        }

    }, [toggleMenu])

    

    

  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 relative text-base sm:text-lg'>
        <div>
            <Link href='/'>
                <Image src='/artikel-trainer-logo.png' 
                width={37}
                height={37}
                alt='Logo'
                />
            </Link>
        </div>
        <div className='flex gap-3 items-center '>
            {session?.user && status === 'authenticated' ? 
                <>
                    <Link href='/discover-lists' className='hidden sm:block hover:text-gray-500 transition-all'>Discover Lists</Link>
                    <div 
                        className='cursor-pointer flex gap-4 items-center'
                        onClick={() => {
                            setToggleMenu(currentValue => !currentValue)
                        }}
                    >
                        {/* <Link href='/myprofile' className='hidden sm:block'>My profile</Link> */}
                        <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            alt='Profile picture'
                            className='rounded-full border-black border'
                        />
                    </div>
                </>

                : status === 'loading' ?
                <div className='w-16 h-8 animate-pulse bg-gray-400 rounded-md'></div>
                :
                <>
                    {providers &&
                        Object.values(providers).map(provider => (
                            <button 
                                type='button'
                                className='bg-indigo-500 btn hover:bg-indigo-400 transition-all'
                                key={provider.name}
                                onClick={() => {
                                    signIn(provider.id)
                                }}
                            >
                                Sign In
                            </button>
                        ))    
                    }
                </>
                
            }
        </div>
        {toggleMenu && session?.user && (
            <div ref={menuRef} className={`appear absolute z-10 top-16 right-4 sm:top-20 sm:right-6 border flex flex-col items-center gap-4 p-2 rounded-lg min-w-32 bg-white shadow-md`}>
                <Link 
                    href={`/profile/${session?.user.id}`} 
                    className=' hover:text-gray-500 transition-all'
                    onClick={() => setToggleMenu(false)}
                >
                    My Profile
                </Link>
                <Link 
                    href='/create-list' 
                    className=' hover:text-gray-500 transition-all'
                    onClick={() => setToggleMenu(false)}
                >
                    Create List
                </Link>
                <Link 
                    href='/discover-lists' 
                    className='block sm:hidden hover:text-gray-500 transition-all'
                    onClick={() => setToggleMenu(false)}
                >
                    Discover Lists
                </Link>
                <button 
                    className='btn bg-indigo-500 w-4/5 hover:bg-indigo-400 transition-all'
                    onClick={signOut}
                >
                    Sign out
                </button>
            </div>
        )}
    </nav>
  )
}

export default NavBar