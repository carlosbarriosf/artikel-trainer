"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

const Play = () => {
  const { id } = useParams();
  const [listObject, setListObject] = useState();
  const [shuffledWordArray, setShuffledWordArray] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [articleClassName, setArticleClassName] = useState("");
  const [pluralClassName, setPluralClassName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState({
    article: "",
    plural: "",
  });
  const [values, setValues] = useState({
    article: "",
    plural: "",
  });
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0,
    half: 0,
  });
  const [checkingAnswer, setCheckingAnswer] = useState(false);

  const inputRef = useRef(null);

  const fetchList = async () => {
    const res = await fetch(`/api/list/${id}`);
    const data = await res.json();
    console.log(data);

    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const shuffledArray = shuffleArray(data.list.words);

    setListObject(data);
    setShuffledWordArray(shuffledArray);
  };
  useEffect(() => {
    fetchList();
  }, [id]);

  //handlers

  const handleAnswer = () => {
    console.log(currentWord);
    console.log(shuffledWordArray.length - 1);

    setCheckingAnswer(true);

    if (
      values.article.toLowerCase() ===
      shuffledWordArray[currentWord].article.toLowerCase()
    ) {
      setArticleClassName("bg-green-600 text-white");
    } else {
      setArticleClassName("bg-red-500 text-white");
      // setValues((currentValues) => ({
      //   ...currentValues,
      //   article: `${currentValues.article}`,
      // }));
      setCorrectAnswer((currentValue) => ({
        ...currentValue,
        article: shuffledWordArray[currentWord].article.toLowerCase(),
      }));
    }

    if (
      values.plural.toLowerCase() ===
      shuffledWordArray[currentWord].plural.toLowerCase()
    ) {
      setPluralClassName("bg-green-600 text-white");
    } else {
      setPluralClassName("bg-red-500 text-white");
      setCorrectAnswer((currentValue) => ({
        ...currentValue,
        plural: shuffledWordArray[currentWord].plural.toLowerCase(),
      }));
    }

    if (
      values.article === shuffledWordArray[currentWord].article &&
      values.plural === shuffledWordArray[currentWord].plural
    ) {
      setScore((prevScore) => ({
        ...prevScore,
        correct: prevScore.correct + 1,
      }));
    } else if (
      values.article !== shuffledWordArray[currentWord].article &&
      values.plural !== shuffledWordArray[currentWord].plural
    ) {
      setScore((prevScore) => ({ ...prevScore, wrong: prevScore.wrong + 1 }));
    } else {
      setScore((prevScore) => ({ ...prevScore, half: prevScore.half + 1 }));
    }

    if (currentWord < shuffledWordArray.length - 1) {
      setTimeout(() => {
        setCheckingAnswer(false);
        setCurrentWord((currentValue) => currentValue + 1);
        setArticleClassName("");
        setPluralClassName("");
        setValues({
          article: "",
          plural: "",
        });
        setCorrectAnswer({
          article: "",
          plural: "",
        });
      }, 1500);
    } else {
      setTimeout(() => {
        setGameEnded(true);
      }, 1500);
    }
  };

  return (
    <section className="h-5/6 flex flex-col justify-center">
      {listObject && (
        <>
          <h1 className="text-center text-indigo-500 font-bold">
            {listObject.list.name}
          </h1>
          <div className="gameBoard">
            {!gameStarted ? (
              <button
                className="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 text-white bg-indigo-500 py-2 px-4 animate-pulse rounded-md"
                onClick={() => setGameStarted(true)}
              >
                Play!
              </button>
            ) : gameEnded ? (
              <div className="h-full">
                <h2 className="text-center text-indigo-500 font-bold py-4">
                  Your Results!
                </h2>
                <div className="text-sm sm:text-base flex flex-col justify-center gap-4 mt-8 px-2 text-indigo-600">
                  <p>
                    Correct answers:{" "}
                    <span className="text-green-600 text-md font-bold">
                      {score.correct}
                    </span>
                  </p>
                  <p>
                    Partially correct answers:{" "}
                    <span className="text-amber-500 text-md font-bold">
                      {score.half}
                    </span>
                  </p>
                  <p>
                    Wrong answers:{" "}
                    <span className="text-red-500 text-md font-bold">
                      {score.wrong}
                    </span>
                  </p>
                </div>
                <div className="flex w-full gap-4 mt-6 justify-center">
                  <Link
                    href="/discover-lists"
                    className="btn bg-cyan-600 hover:bg-cyan-500 transition-all"
                  >
                    Try other lists!
                  </Link>
                  <Link
                    href="/myprofile"
                    className="btn bg-cyan-600 hover:bg-cyan-500 transition-all"
                  >
                    My Profile
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center h-full gap-4">
                <h2 className="text-center text-indigo-600 font-bold py-2 text-xl">
                  {shuffledWordArray[currentWord].noun}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAnswer();
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  <div className="flex justify-between items-center py-2 px-6">
                    <label
                      htmlFor="article"
                      className="capitalize text-indigo-500"
                    >
                      article
                    </label>
                    <div className="flex flex-col w-2/3">
                      <input
                        ref={inputRef}
                        autoComplete="off"
                        readOnly={checkingAnswer}
                        type="text"
                        name="article"
                        id="article"
                        required={true}
                        className={`w-full text-sm px-2 py-1 transition-all ${articleClassName}`}
                        value={values.article.toLowerCase()}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            article: e.target.value,
                          });
                        }}
                      />
                      {correctAnswer.article && (
                        <p className="h-4 text-sm text-red-600">
                          Answer: {correctAnswer.article}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 px-6">
                    <label
                      htmlFor="plural"
                      className="capitalize text-indigo-500"
                    >
                      plural
                    </label>
                    <div className="flex flex-col w-2/3">
                      <input
                        type="text"
                        autoComplete="off"
                        readOnly={checkingAnswer}
                        name="plural"
                        id="plural"
                        className={`w-full text-sm px-2 py-1 transition-all ${pluralClassName}`}
                        value={values.plural}
                        onChange={(e) => {
                          setValues({
                            ...values,
                            plural: e.target.value,
                          });
                        }}
                      />
                      {correctAnswer.plural && (
                        <p className="h-4 text-sm text-red-600 capitalize">
                          Answer: {correctAnswer.plural}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-center mt-4">
                    <button
                      type="submit"
                      className="text-white bg-indigo-500 py-1 px-2 rounded-md hover:bg-indigo-400 transition-all"
                    >
                      Answer
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          {!gameEnded && (
            <div className="flex w-full justify-center gap-8 text-base">
              <div className="flex items-center justify-center gap-1">
                <FaCheckCircle size={20} color="#16a34a" />{" "}
                <span>{score.correct}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <IoIosWarning size={23} color="#f59e0b" />{" "}
                <span>{score.half}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <TiDelete size={28} color="#dc2626" />{" "}
                <span>{score.wrong}</span>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Play;
