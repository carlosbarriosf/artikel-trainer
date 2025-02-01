"use client";
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { Suspense, useEffect, useState } from "react";
import ListPage from "@components/ListPage";

const DiscoverLists = () => {
  const [lists, setLists] = useState([]);
  const { data: session } = useSession();

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [selectValue, setSelectValue] = useState("");

  const [pagination, setPagination] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState(null);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectValue(value);

    router.push(`/discover-lists?q=${searchValue}&page=1&sort=${value}`);
  };

  const handlePageChange = (page) => {
    const query = {
      q: searchValue || "",
      page: page > 1 ? page : 1,
      sort: selectValue,
    };
    router.push(`/discover-lists?${new URLSearchParams(query).toString()}`);
  };

  useEffect(() => {
    if (!searchParams) return;
    const getLists = async () => {
      setIsLoading(true);
      try {
        // throw new Error("Forced error");
        const currentQuery = Object.fromEntries(searchParams.entries());
        const searchQuery = currentQuery.q || "";
        const page = currentQuery.page || 1;
        setSearchValue(searchQuery);
        const res = await fetch(
          `/api/list?q=${searchQuery}&page=${page}&sort=${selectValue}`
        );
        if (!res.ok) throw new Error("Failed to fetch lists");
        const data = await res.json();
        // console.log(data);
        setLists(data.lists);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Failed to fetch lists:", error);
        setError({
          errorMsg: "Something went wrong",
          errorPrompt: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getLists();
  }, [searchParams, selectValue]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {searchParams && (
        <ListPage
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          handleSelectChange={handleSelectChange}
          handlePageChange={handlePageChange}
          lists={lists}
          isLoading={isLoading}
          pagination={pagination}
          session={session}
          title={`Find new lists to play!`}
          error={error}
        />
      )}
    </Suspense>
  );
};

export default DiscoverLists;
