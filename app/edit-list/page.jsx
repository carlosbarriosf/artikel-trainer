"use client";
export const dynamic = "force-dynamic";

import List from '@components/List'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

const EditList = () => {

    const searchParams = useSearchParams();
    const router = useRouter()
    const listId = searchParams.get('id')

    useEffect(() => {
        const getList = async () => {
            const res = await fetch(`/api/list/${listId}`)
            const data = await res.json()
            console.log(data.list)
            setList(data.list)
        }
        getList()
    }, [])
    
    
    const [list, setList] = useState()
    const [values, setValues] = useState({
        noun: '',
        article: '',
        plural: ''
    })
    const [formStatus, setFormStatus] = useState({
        noun: '',
        article: '',
        plural: true
    })
    const [message, setMessage] = useState('')
    const [messageClassName, setMessageClassName] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    //handlers

    const handleDeleteNounBtn = (item) => {
        const filteredWords = list.words.filter(word => word.noun !== item.noun)
        console.log(item.noun)
        console.log(filteredWords)
        setList(prevList => ({
            ...prevList,
            words: filteredWords
        }))
    }

    const handleMessage = (msg, bgColor) => {
        setMessage(msg);
        setMessageClassName(`${bgColor} appear`);
        setTimeout(() => {
        setMessageClassName(`${bgColor} disappear`)
        }, 2700);
        setTimeout(() => {
        setMessage('')
        }, 3000);
    }

    const handleSaveList = async () => {
      if (list.name === '') {
        handleMessage('The list must have a name', 'bg-amber-500')
        return
      } 
      if (list.words.length < 20 || list.words.length > 40) {
        handleMessage('The list must contain between 20 and 40 nouns', 'bg-amber-500')
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`/api/list/${listId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            list: list
          })
        })
        if(res.ok) {
          handleMessage('List updated!', 'bg-green-600')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    const handleDeleteList = async () => {
      const confirmation = confirm('This action is irreversible. Are you sure you want to procceed?')
      if(!confirmation) return

      setIsLoading(true)

      try {
        const res = await fetch(`/api/list/${listId}`, {
          method: 'DELETE'
        })
        if(res.ok) {
          handleMessage('List deleted successfully', 'bg-green-600')
          setTimeout(() => {
            router.push('/')
          }, 1200);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {searchParams && (<section>
      <h1 className='text-center text-cyan-800 text-xl sm:text-2xl mb-4 font-bold'>Edit your list!</h1>
      {list &&
        <h2 className='text-center mb-4 font-semibold text-indigo-500'>{list.name}</h2>
      }  
        {list && 
          <List 
            list={list}
            handleDeleteNounBtn={handleDeleteNounBtn}
            setList={setList}
            setValues={setValues}
            values={values}
            message={message}
            messageClassName={messageClassName}
            handleMessage={handleMessage}
            handleSaveList={handleSaveList}
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            edit={true}
            handleDeleteList={handleDeleteList}
            isLoading={isLoading}
          />
        }
      </section>)}
    </Suspense>
  )
}

export default EditList