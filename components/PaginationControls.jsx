import React from 'react'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";


const PaginationControls = ({currentPage, totalPages, onPageChange}) => {
  return (
        <div className='h-full flex flex-col justify-end'>
            <div className='flex justify-center gap-4 py-4 w-full mt-2'>
                <button className='cursor-pointer bg-indigo-400 text-gray-200 w-6 h-6 text-xs rounded-md flex justify-center items-center font-semibold'
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <IoMdArrowRoundBack />
                </button>
                <button className='bg-indigo-400 text-gray-200 w-6 h-6 text-xs rounded-md flex justify-center items-center font-semibold'>{currentPage}</button>
                <button className='cursor-pointer bg-indigo-400 text-gray-200 w-6 h-6 text-xs rounded-md flex justify-center items-center font-semibold'
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        onPageChange(currentPage + 1)
                        console.log(currentPage, totalPages)
                    }}
                >
                    <IoMdArrowRoundForward />
                </button>
            </div>
        </div>
  )
}

export default PaginationControls