import React from 'react'

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
      </section>
      <section>
        {/* here go the top rated lists */}

      </section>
    </>
  )
}

export default Home