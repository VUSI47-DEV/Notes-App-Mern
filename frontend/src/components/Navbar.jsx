import { useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState();
  // const [searchQuery,setSearchQuery] = useState();
  // const [searchQuery,setSearchQuery] = useState();

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {};
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
        <SearchBar
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          value={searchQuery}
          onclearSearch={clearSearch}
          handleSearch={handleSearch}
        />
        <ProfileInfo onLogout={onLogout} />
      </div>
    </>
  );
};

export default Navbar;
