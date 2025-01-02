import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className='w-full py-4 flex flex-col gap-1'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Link href='https://www.linkedin.com/in/carlosbarriosf/'>
            <FaLinkedin size={16}/>
          </Link>
          <Link href='https://github.com/carlosbarriosf'>
            <FaGithub size={16}/>
          </Link>
        </div>
        <div>
          <Image src='/artikel-trainer-logo.png'
            width={24}
            height={24}
            alt='Logo'
          />
        </div>
      </div>
      <div className='flex items-center text-xs gap-2'>
        <Link href='mailto:carlosbarriosdev@gmail.com' target='_blank'>
          <IoMdMail size={16}/>
        </Link>
        <p>Send feedback or report an issue</p>
      </div>
      <div  className='text-center text-xs'>
      <p>Built with Next.js, Mongoose, and love for the German language.</p>
      <p>© 2024 Carlos Barrios. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer