import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="sticky top-0 z-0 bg-[#0a0a0a]">
     <div className="relative flex items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 pl-12 my-4 rounded-full border bg-gray-800   border-gray-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <button
        name="search-button"
        className="absolute left-4 flex items-center justify-center p-2 rounded-full "
      >
        <FaSearch  />
        </button>
    </div>
    </div>
  )
}

export default Search;