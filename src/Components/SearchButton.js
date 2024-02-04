import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightLong,
  faLeftLong,
  faSearch,
  faXmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

function SearchButton() {
  return (
    <form className="flex items-center w-full space-x-3 px-5 mb-5">
      <FontAwesomeIcon icon={faLeftLong} size="lg" inverse />
      <FontAwesomeIcon icon={faRightLong} size="lg" inverse />
      <FontAwesomeIcon icon={faXmark} size="lg" />
      <FontAwesomeIcon icon={faHome} size="lg" inverse />

      <input
        className="w-full rounded-md border px-4"
        type="text"
        placeholder="Search..."
        aria-label="Search"
      />

      <button
        type="submit"
        className=" rounded-s-3xl rounded-3xl bg-white pr-5 py-1 pl-1"
      >
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
    </form>
  );
}

export default SearchButton;
