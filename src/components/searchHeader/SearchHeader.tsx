import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Book } from "../../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchHeader: React.FC<any> = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [dataFilterSearch, setDataFilterSearch] = useState<Book[]>([]);
  const handlechangInputSearch = (e: any) => {
    setSearchText(e.target.value);
    setIsSearching(true);
  };
  console.log("0", dataFilterSearch);
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = () => {
    axios.get("http://localhost:3001/books").then((res) => {
      setBooks(res.data?.data?.result || []);
    });
  };
  useEffect(() => {
    if (searchText.trim() === "") {
      setDataFilterSearch([]);
      setIsSearching(false);
      return;
    }
    const results = books.filter((books: Book) =>
      books.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setDataFilterSearch(results || null);
    if (searchText === "") {
      setDataFilterSearch([]);
    }
  }, [searchText]);
  return (
    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Tìm kiếm sách..."
          className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          onChange={handlechangInputSearch}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <div className="absolute w-full ">
          {isSearching && (
            <div className="absolute z-10 w-full bg-white shadow-md rounded mt-1 max-h-60 overflow-y-auto">
              {searchText != "" && dataFilterSearch.length > 0 ? (
                <ul>
                  {dataFilterSearch.map((data) => (
                    <li
                      onClick={() => {
                        navigate(`/books/${data._id}`);
                        setIsSearching(false);
                        setSearchText("");
                        setDataFilterSearch([]);
                        setIsSearching(false);
                      }}
                      key={data.title}
                      className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 text-black"
                    >
                      {data.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-2 text-gray-500 italic">
                  Không tìm thấy sách nào.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchHeader;
