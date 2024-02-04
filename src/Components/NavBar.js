import React from "react";
import SearchButton from "./SearchButton";

function NavBar() {
  return (
    <div
      className="border-2 border-black"
      style={{ backgroundColor: "#C1C1C1" }}
    >
      <h6 className="text-sm pb-1 font-bold text-center">Portle</h6>
      <SearchButton />
    </div>
  );
}

export default NavBar;
