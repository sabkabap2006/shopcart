"use client";

import React, { useState, useEffect } from "react";
import { searchBlogs } from "../lib/searchBlogs";

interface Blog {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
  };
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Blog[]>([]); // <-- typed here

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      searchBlogs(query).then(setResults);
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="max-w-md mx-auto p-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-black rounded-xl shadow-lg">
      <input
        type="text"
        placeholder="🔍 Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          px-5
          py-3
          text-white
          bg-gradient-to-r
          from-purple-700
          via-indigo-800
          to-black
          rounded-full
          focus:outline-none
          focus:ring-4
          focus:ring-purple-500
          placeholder:text-purple-300
          transition
          duration-300
          ease-in-out
          shadow-lg
          hover:shadow-purple-600
        "
      />
      <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
        {results.length === 0 && query && (
          <li className="text-purple-300 italic">No results found</li>
        )}
        {results.map((blog) => (
          <li
            key={blog._id}
            className="
              bg-gradient-to-r
              from-indigo-700
              to-purple-700
              rounded-lg
              p-3
              cursor-pointer
              text-white
              hover:scale-105
              hover:bg-purple-600
              transition-transform
              duration-200
              shadow-md
              shadow-purple-800
            "
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
