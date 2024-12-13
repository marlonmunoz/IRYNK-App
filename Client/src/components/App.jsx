
import { useState, useEffect } from 'react';   
import NavBar from './NavBar';
import Header from './Header';
import { Outlet } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import SearchBar from './SearchBar';
import Toy from './Toy';

function App() {  
  const [toys, setToys] = useState([]); 
  const [searchText, setSearchText] = useState("");  
  const [selectedAge, setSelectedAge] = useState("all");
  const filteredToysByAge = selectedAge === "all" ? toys : toys.filter(toy => toy.age === selectedAge);   

  // useEffect(() => {             
  //   fetch("http://localhost:5001/toys")  
  //     .then(response => response.json())
  //     .then(data => setToys(data)); 
  // }, []);

  useEffect(() => {             
    fetch("http://localhost:5001/toys")  
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log('Fetched toys:', data);
        setToys(data);
      })
      .catch(error => console.error('Error fetching toys:', error)); 
  }, []);
  
  const filteredToys = filteredToysByAge.filter(toy => {
  return toy.name.toUpperCase().includes(searchText.toUpperCase());

  });
  // console.log('Filtered toys:', filteredToys);
  
  function updateSearchText(event) {
    setSearchText(event.target.value);
  }
  function deleteToy(toyId) {
    setToys(toys.filter(toy => toy.id !== toyId));
  }

  function addNewToy(newToy) {
    const tempToy = { ...newToy, id: uuidv4(), temp: true }; // Add a unique ID and temp flag
    setToys([...toys, tempToy]); // Temporarily add the new toy to the state

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    };
    fetch("http://localhost:5001/toys", configObj)
      .then(response => response.json())
      .then(newToyData => {
        setToys([...toys, newToyData]); // Add the new toy to the state
      })
      .catch(error => console.log('Error', error));
  }

  function handleAgeChange(event){
    setSelectedAge(event.target.value)
  }



  return (
    <div className="App">
      <NavBar />
      <Header />
      <label><strong> SEARCH: </strong></label>
      <input type="text" value={searchText} onChange={updateSearchText} placeholder="Search toys..." />
      <ul>
        {filteredToys.map(toy => {
          // Validate toy properties
          if (!toy.id || !toy.name || !toy.age) {
            console.error('Toy is missing required properties:', toy);
            return null;
          }
          return (
            <li key={toy.id}>
              <Toy toy={toy} deleteToy={() => deleteToy(toy.id)} />
            </li>
          );
        })}
      </ul>
      <Outlet context={{toys: filteredToys, addNewToy: addNewToy, deleteToy: deleteToy, updateSearchText: updateSearchText, searchText: searchText, handleAgeChange: handleAgeChange, selectedAge: selectedAge}} /> 
      
    </div>
  );
}

export default App;