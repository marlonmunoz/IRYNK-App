import { useOutletContext } from "react-router-dom";
import Toy from "./Toy";

function ToyList({}) {
    const { toys, deleteToy, searchText, updateSearchText, handleAgeChange, selectedAge, handleCategoryChange, selectedCategory, ageCategories, nameCategories, ageToCategoryMap } = useOutletContext();
    
    const toyComponents = toys ? toys.map(toy => {
        return <Toy key={toy.id} toy={toy} deleteToy={() => deleteToy(toy.id)} nameCategories={nameCategories} ageToCategoryMap={ageToCategoryMap} />
    }) : <p>Loading...</p>;

    
    

    return (
        <div>
            <label id="my_bars" htmlFor="s_bar"><strong> SEARCH: </strong></label>
            <br />
            <input className="search-bars" id='s_bar' type="text" value={searchText} onChange={updateSearchText} placeholder="By Name ..." />

            <label id="my_bars" htmlFor="age_select"><strong>AGE:</strong></label>
            <select className="search-bars" id="age_select" value={selectedAge} onChange={handleAgeChange}>
              {/* <option value="all">All Ages By Month</option> */}
              {Object.entries(ageCategories).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
          
            </select>

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