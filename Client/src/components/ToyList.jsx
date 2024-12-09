import { useOutletContext } from "react-router-dom";
import Toy from "./Toy";
import SearchBar from "./SearchBar";

function ToyList({}) {
    const { toys, deleteToy, searchText, updateSearchText } = useOutletContext();

    const toyComponents = toys ? toys.map(toy => {
        return <Toy key={toy.id} toy={toy} deleteToy={() => deleteToy(toy.id)} />
    }) : <p>Loading...</p>;

    return (
        <div>
            <SearchBar updateSearchText={updateSearchText} searchText={searchText}/>
            {toyComponents}
        </div>
    );
}



export default ToyList;