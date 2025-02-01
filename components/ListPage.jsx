import ListCard from "@components/ListCard";
import LoadingCard from "@components/LoadingCard";
import PaginationControls from "@components/PaginationControls";
import Image from "next/image";
import Link from "next/link";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";

import React from "react";
import ListErrorCard from "./ListErrorCard";

const ListPage = ({
  searchValue,
  setSearchValue,
  selectValue,
  handleSelectChange = () => {},
  handlePageChange = () => {},
  lists,
  isLoading,
  pagination,
  session,
  title,
  error,
}) => {
  if (error)
    return (
      <ListErrorCard
        errorMsg={error.errorMsg}
        errorPrompt={error.errorPrompt}
        icon={<BiSolidError size={50} />}
      />
    );

  return (
    <section className=" relative flex flex-col">
      <h1 className="text-center text-base sm:text-xl font-semibold text-indigo-500 my-4">
        {title}
      </h1>
      <div className="searchContainer">
        <form
          className="searchBar"
          onSubmit={(e) => {
            e.preventDefault();
            handlePageChange();
          }}
        >
          <input
            className="px-2 py-1 text-sm rounded-md border-indigo-400 border outline-none"
            type="text"
            placeholder="Search by title..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </form>
        <div className="filter text-sm">
          <select
            value={selectValue}
            onChange={handleSelectChange}
            className="px-2 py-1 rounded-md border-indigo-400 border"
          >
            <option value="">Sort by</option>
            <option value="title-asc">Title (A - Z)</option>
            <option value="title-desc">Title (Z - A)</option>
            <option value="likes-desc">Most liked</option>
            <option value="likes-asc">Least liked</option>
          </select>
        </div>
      </div>
      <div
        className={`${isLoading === false && lists.length === 0 ? "flex" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2"} relative`}
      >
        {isLoading ? (
          [...Array(9)].map((_, index) => <LoadingCard key={index} />)
        ) : lists.length === 0 ? (
          <ListErrorCard
            errorMsg="Oops! We couldn’t find anything."
            errorPrompt="Try another search!"
            icon={<FaFileCircleQuestion size={50} />}
          />
        ) : (
          lists.map((entry) => (
            <div
              key={entry._id}
              className="border bg-white shadow-lg p-2 rounded-md text-sm w-full max-w-72 flex flex-col gap-2"
            >
              <ListCard entry={entry} session={session} />
              <div className="flex items-center mt-2">
                <Link href={`/profile/${entry.creator._id}`}>
                  <Image
                    className="rounded-full mr-2"
                    src={entry.creator.image}
                    width={24}
                    height={24}
                    alt={`${entry.creator.username} profile picture`}
                  />
                </Link>
                <p>{entry.creator.username}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {lists.length !== 0 && lists.length > pagination.limit && (
        <PaginationControls
          currentPage={pagination.currentPage}
          onPageChange={handlePageChange}
          totalPages={pagination.totalPages}
        />
      )}
    </section>
  );
};

export default ListPage;
