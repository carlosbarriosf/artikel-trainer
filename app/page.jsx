import React from 'react'
import { RiListSettingsLine } from "react-icons/ri";
import { MdOutlineQuiz } from "react-icons/md";
import { TbWorldSearch } from "react-icons/tb";


const Home = () => {
  return (
    <>
      <section>
        <h1 className='text-center text-2xl text-indigo-500  my-3'>Artikel Trainer</h1>
        <div className='p-2 text-sm sm:text-base flex flex-col justify-center gap-6 items-center'>
          <p className='text-center max-w-md'>Tired of not being able to do german grammar correctly because you 
            keep forgetting the gender of the nouns?
          </p>
          <p className='text-center max-w-md'>Here you can create lists of the nouns you have trouble with and practice them in a
            funny and effective way!
          </p>
        </div>
        <div className='w-full flex justify-center my-2'>
          <button
            className='btn bg-cyan-700 hover:bg-cyan-600 transition-all'
            // onClick={() => {
            //   //if user is not logged in, then log in

            //   //else if user is logged in, redirect to create lists
            // }}
          >
            Try it out
          </button>
        </div>
        <div id='featuresOverview' className='flex flex-col items-center my-8'>
          <h1 className='mb-4 text-center text-lg font-bold text-indigo-500'>Unlock Your Learning Potential</h1>

          <div className='flex flex-col sm:grid grid-cols-3 gap-4 text-sm sm:text-base max-w-screen-lg'>
            <div className='rounded-md bg-gray-300 p-2 flex flex-col gap-4'>
              <div className='flex justify-center gap-4'>
                <div className='flex justify-center items-center'>
                  <RiListSettingsLine size={18}/>
                </div>
                <p className='font-bold'>
                  Customizable Lists
                </p>
              </div>
              <p>Create and organize your own lists of German nouns, tailored to your needs. Focus on the words that challenge you the most and track your progress as you improve.</p>
            </div>

            <div className='rounded-md bg-gray-300 p-2 flex flex-col gap-4'>
              <div className='flex justify-center gap-4'>
                <div className='flex justify-center items-center'>
                  <MdOutlineQuiz size={18} />
                </div>
                <p className='font-bold'>
                  Quiz Mode
                </p>
              </div>
              <p>Practice noun genders with interactive, quiz-style challenges designed to make learning engaging and effective. Improve your recall with every round.</p>
            </div>

            <div className='rounded-md bg-gray-300 p-2 flex flex-col gap-4'>
              <div className='flex justify-center gap-4'>
                <div className='flex justify-center items-center'>
                <TbWorldSearch size={18}/>
                </div>
                <p className='font-bold'>
                  Explore and Play Community Lists
                </p>
              </div>
              <p>Browse lists created by other users, discover new nouns, and practice with shared content. Like your favorites and challenge yourself with community-created quizzes.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home