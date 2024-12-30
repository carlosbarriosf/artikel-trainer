"use client";

import List from '@components/List';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'


const LIST_INITIAL_STATE = {
  name : '',
  words: []
}

const CreateList = () => {

  const {data: session} = useSession()


  const [list, setList] = useState(LIST_INITIAL_STATE)
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
      const res = await fetch('/api/list/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          list
        })
      })
      const data = await res.json()
      console.log(data)
      if (res.status === 201) {
        handleMessage(data.message, 'bg-green-600')
        setList(LIST_INITIAL_STATE)
      } else if (res.status === 403) {
        handleMessage(data.message, 'bg-amber-500')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    }
  
  return (
    <section>
      <h1 className='text-center text-cyan-800 text-xl sm:text-2xl mb-4 font-bold'>Create a new list of nouns!</h1>
      <h2 className='text-center mb-4 font-semibold text-indigo-500'>{list?.name || 'Your list name'}</h2>
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
        isLoading={isLoading}
      />
    </section>
  )
}

export default CreateList