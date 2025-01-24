"use client";

import React, { useRef, useState } from 'react'
import InputField from './InputField';

const regexp = {
  word: /^[A-Za-zäÄüÜöÖß]{2,30}$/,
  article: /\b(der|das|die)\b/i,
  listName: /^[A-Za-z 0-9/*|°'.,äÄüÜöÖß]{2,40}$/
}

const testRegExp = (exp, value) => {
  const newRegExp = new RegExp(exp);
  return newRegExp.test(value)
}

const List = ({ list,
   handleDeleteNounBtn, 
   setList, 
   setValues, 
   values, 
   message,
   messageClassName, 
   handleMessage, 
   handleSaveList,
   formStatus,
   setFormStatus,
   edit = false,
   handleDeleteList = () => {},
   submittingForm
  }) => {

    const [isInfoHovered, setIsInfoHovered] = useState({
      noun: false,
      article: false,
      plural: false
    })

    const inputRef = useRef(null)


    const handleBlur = (field, value, regex) => {
      const isValid = testRegExp(regex, value);
      if(field === 'plural' && value === '') {
        setFormStatus(prevState => ({
          ...prevState,
          plural: true
        }))
      } else {
        setFormStatus(prevState => ({
          ...prevState,
          [field]: isValid
        }))
      }
    }


  return (
    <>
      {list.words.length > 0 && <div className='nouns-container'>
        { (
          list.words.map(item => (
            <div 
              className='w-full flex justify-between items-center gap-2 bg-white border border-indigo-500 rounded-full px-2'
              key={item.noun}
            >
              <p>{item.article} {item.noun}</p>
              <button
                className=''
                onClick={() => {
                    handleDeleteNounBtn(item)
                }}
              >
                &times;
              </button>
            </div>
          ))
        )}
        
      </div>}
      <div >
        <div className='flex justify-center items-center gap-4 text-base w-full px-2'>
          <label htmlFor="name">List Name</label>
          <div className='w-3/4 max-w-md relative'>
            <input 
              className='w-full rounded-md p-2 text-sm text-indigo-500 italic border border-indigo-400 bg-white' 
              type="text" 
              name='name' 
              maxLength={40}
              value={list.name}
              onChange={(e) => setList({...list, name: e.target.value})}
              />
            <p className={`hidden text-red-500 absolute text-xs mt-1`}></p>
          </div>
        </div>
        <form 
          className='flex flex-col justify-center items-center gap-6 my-8 '
          onSubmit={(e) => {
            e.preventDefault()
            if (list.words.length >= 40) {
              handleMessage('The list is full!', 'bg-amber-500')
              return
            } else if (list.words.some(word => word.noun === values.noun)) {
              handleMessage('The noun is already in the list', 'bg-amber-500')
              return
            } 
            if (formStatus.noun && formStatus.article && formStatus.plural) {
              setList(prevList => ({
                ...prevList,
                words: [...prevList.words, values]
              }))
              setValues({
                noun: '',
                article: '',
                plural: ''
              })
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }
          }}
        >
          <InputField 
            name='noun'
            value={values.noun}
            required={true}
            ref={inputRef}
            placeholder='Balkon'
            minLength={2}
            maxLength={30}
            onChange={(e) => setValues({...values, noun: e.target.value})}
            onBlur={() => handleBlur('noun', values.noun, regexp.word)}
            formStatus={formStatus}
            setIsInfoHovered={setIsInfoHovered}
            isInfoHovered={isInfoHovered}
            infoText='This field must contain from 2 to 30 alphabetic characters without spaces'
          />
          <InputField 
            name='article'
            value={values.article}
            required={true}
            placeholder='das'
            minLength={3}
            maxLength={3}
            onChange={(e) => setValues({...values, article: e.target.value.toLowerCase()})}
            onBlur={() => handleBlur('article', values.article, regexp.article)}
            formStatus={formStatus}
            setIsInfoHovered={setIsInfoHovered}
            isInfoHovered={isInfoHovered}
            infoText="This field must contain a word that's either 'der', 'die' or 'das'"
          />
          <InputField 
            name='plural'
            value={values.plural}
            placeholder='Autos'
            minLength={2}
            maxLength={30}
            onChange={(e) => setValues({...values, plural: e.target.value})}
            onBlur={() => {handleBlur('plural', values.plural, regexp.word)}}
            formStatus={formStatus}
            setIsInfoHovered={setIsInfoHovered}
            isInfoHovered={isInfoHovered}
            infoText='This field must contain from 2 to 30 alphabetic characters without spaces'
          />
          <div className='w-full flex justify-center mt-4'>
            <button 
              type='submit' 
              className='btn bg-indigo-500 hover:bg-indigo-400 transition-all'
            >
              Add noun
            </button>
          </div>
        </form>
      </div>
      {message && (
        <div className={`${messageClassName} absolute bottom-8 right-4 text-white rounded-lg p-2 text-sm sm:text-base`}>{message}</div>
      )}
      <div className='flex justify-center gap-4'>
        <button 
          className='btn bg-cyan-700 hover:bg-cyan-600 transition-all min-w-16 flex justify-center'
          disabled={submittingForm}
          onClick={() => {
            handleSaveList()
          }}
        >
          {submittingForm ? <div className='spinner'></div> : 'Save List'}
        </button>
        {edit && 
          <button
            className='btn bg-red-600 hover:bg-red-500 transition-all block'
            onClick={handleDeleteList}
            disabled={submittingForm}
          >
            Delete List
          </button>
        }
      </div>
    </>
  )
}

export default List