import { useOutletContext } from "react-router-dom";
import Toy from "./Toy";
import { useState, useEffect } from "react";

function ToyList({}) {
  const { toys, deleteToy, searchText, updateSearchText, handleAgeChange, selectedAge, handleCategoryChange, ageCategories, nameCategories, ageToCategoryMap, selectedCategory } = useOutletContext();
  const [filteringToys, setFilteringToys] = useState([])

  useEffect(() => {
    let filtered = toys;

    if (selectedCategory !== 'all') {
        filtered = filtered.filter(toy => toy.category_id === parseInt(selectedCategory));
    }

    if (searchText) {
        filtered = filtered.filter(toy => toy.name.toLowerCase().includes(searchText.toLowerCase()));
    }

    setFilteringToys(filtered);
  }, [selectedCategory, searchText, toys]);
    
    
  const toyComponents = filteringToys.length > 0 ? filteringToys.map(toy => {
    return <Toy key={toy.id} toy={toy} deleteToy={() => deleteToy(toy.id)} nameCategories={nameCategories} ageToCategoryMap={ageToCategoryMap} />
  }) : <p>No toys available for the selected category.</p>;
  
  return (
      <div>
          <label id="my_bars" htmlFor="s_bar"><h3 className="h3Form" style={{color: 'white'}}>SEARCH:</h3></label>
          <input className="search-bars" id='s_bar' type="text" value={searchText} onChange={updateSearchText} placeholder="By Name ..." />
          <br />
          <br />
          <label id="my_bars" htmlFor="age_select"><strong>AGE:</strong></label>
            <select className="search-bars" id="age_select" value={selectedAge} onChange={handleAgeChange}>
              {Object.entries(ageCategories).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          <br />
          <br />
          <label id="my_bars" htmlFor="category_select"><strong> CATEGORY:</strong></label>
            <select className="search-bars" id="category_select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
              {Object.entries(nameCategories).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          <div className="toy-list">
            {toyComponents}
          </div>
      </div>
  );
}




export default ToyList;