import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600 mr-20 h-fit"
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-start items-center sm:w-1/4 w-full">
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500  outline-none text-base text-white p-4"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;
