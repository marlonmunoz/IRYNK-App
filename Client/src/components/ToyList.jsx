import { useOutletContext } from "react-router-dom";
import Toy from "./Toy";
import SearchBar from "./SearchBar";

function ToyList({}) {
    const { toys, deleteToy, searchText, updateSearchText, handleAgeChange, selectedAge, handleCategoryChange, selectedCategory } = useOutletContext();

    const toyComponents = toys ? toys.map(toy => {
        return <Toy key={toy.id} toy={toy} deleteToy={() => deleteToy(toy.id)} />
    }) : <p>Loading...</p>;

    return (
        <div>
            <label id="my_bars" htmlFor="s_bar"><strong> SEARCH: </strong></label>
            <br />
            <input className="search-bars" id='s_bar' type="text" value={searchText} onChange={updateSearchText} placeholder="By Name ..." />

            <label id="my_bars" htmlFor="age_select"><strong> <span style={{ visibility: 'hidden' }}>AGE:</span> </strong></label>
            <select className="search-bars" id="age_select" value={selectedAge} onChange={handleAgeChange}>
              <option value="all">All Ages By Month</option>
              <option value="0-2 months">0-2 months</option>
              <option value="3-4 months">3-4 months</option>
              <option value="5-6 months">5-6 months</option>
              <option value="7-8 months">7-8 months</option>
              <option value="9-10 months">9-10 months</option>
              <option value="11-12 months">11-12 months</option>
              <option value="13-15 months">13-15 months</option>
              <option value="16-18 months">16-18 months</option>
              <option value="19-21 months">19-21 months</option>
              <option value="22-24 months">22-24 months</option>
            </select>

            <label id="my_bars" htmlFor="category_select"><strong> <span style={{ visibility: 'hidden' }}>CATEGORY:</span>  </strong></label>
            <select className="search-bars" id="category_select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="all">All Categories</option>
              <option value="Sensory">Sensory</option>
              <option value="Social + Emotional">Social + Emotional</option>
              <option value="Sensory Exploration + Motor Skills">Sensory Exploration + Motor Skills</option>
              <option value="Cognitive Development + Problem Solving Skills">Cognitive Development + Problem Solving Skills</option>
              <option value="Motor Skills: Gross + Fine">Motor Skills: Gross + Fine</option>
              <option value="Cognitive Development">Cognitive Development</option>
              <option value="Cognitive + Physical">Cognitive + Physical</option>
              <option value="Cognitive + Emotion">Cognitive + Emotion</option>
              <option value="Sensory + Cognitive">Sensory + Cognitive</option>
              <option value="Cognitive + Emotional + Motor Dev.">Cognitive + Emotional + Motor Dev.</option>
            </select>
            {toyComponents}
        </div>
        
    );
}



export default ToyList;