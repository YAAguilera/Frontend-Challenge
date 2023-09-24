import React from "react";
import {FaMagnifyingGlass} from 'react-icons/fa6'

const SearchBar = ({ searchTerm, onSearch, placeHolder }) => {
  return (
    <div className="relative xxl:w-[30em] xl:w-[25em] lg:w-[25em] md:w-[20em] sm:w-[15em] flex items-center justify-center">
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center ">
        <FaMagnifyingGlass/>
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={onSearch}
        placeholder={placeHolder}
        className="pl-8 pr-2 py-1 w-full rounded-full outline-none h-[3em]"
        
      />
    </div>
  );
};

export default SearchBar;