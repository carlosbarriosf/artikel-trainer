"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import CookiesPolicyModal from "./CookiesPolicyModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* footer component */}
      <footer className="w-full py-4 flex flex-col gap-1 footer mt-8">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link
              href="https://www.linkedin.com/in/carlosbarriosf/"
              target="_blank"
            >
              <FaLinkedin size={16} />
            </Link>
            <Link href="https://github.com/carlosbarriosf" target="_blank">
              <FaGithub size={16} />
            </Link>
          </div>
          <div>
            <Image
              src="/artikel-trainer-logo.png"
              width={24}
              height={24}
              alt="Logo"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="mailto:carlosbarriosdev@gmail.com" target="_blank">
              <IoMdMail size={16} />
            </Link>
            <Link
              href="mailto:carlosbarriosdev@gmail.com"
              target="_blank"
              className=" lg:text-xs"
            >
              Send feedback or report an issue
            </Link>
          </div>
          <div>
            <button
              className="cursor-pointer lg:text-xs"
              onClick={() => setIsModalOpen(true)}
            >
              Cookies Policy
            </button>
          </div>
        </div>
        <div className="text-center lg:text-xs">
          <p>Built with Next.js, Mongoose, and love for the German language.</p>
          <p>© 2024 Carlos Barrios. All rights reserved.</p>
        </div>
      </footer>

      {/* cookies modal */}
      <CookiesPolicyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Footer;
