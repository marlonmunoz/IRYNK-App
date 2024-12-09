import { useOutletContext } from "react-router-dom";

function SearchBar() {
    const { searchText, updateSearchText, handleAgeChange, selectedAge } = useOutletContext();
  return (
    <>
    <div>
        <label>Select By Age : </label>
        <select className="search-by-age" onChange={handleAgeChange} value={selectedAge}>
          <option value="all">All Toys</option>
          <option value="0-2 months">0-2 months</option>
          <option value="3-4 months">3-4 months</option>
          <option value="5-6 months">5-6 months</option>
          <option value="7-8 months">7-8 months</option>
          <option value="9-10 months">9-10 months</option>
          <option value="11-12 months">11-12 months</option>
          <option value="13-15 months">13-15 months</option>
          <option value="16-18 months">16-18 months</option>
        </select>
      </div>
      <br></br>
    <div className="searchbar">
      <label htmlFor="search">Search By Name : </label>
      <input
        type="text"
        id="search"
        value={searchText}
        onChange={updateSearchText}
        placeholder="Search Toys..."
      />
    </div>
    </>
    
    
  );
}

export default SearchBar;