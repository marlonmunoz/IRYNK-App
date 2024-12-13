
import { useState, useEffect } from 'react';   
import { Outlet } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import NavBar from './NavBar'
import Header from './Header';
import Toy from './Toy';

function App() {  
  const [searchText, setSearchText] = useState("");  
  const [selectedAge, setSelectedAge] = useState("all");
  const [toys, setToys] = useState([]); 
  
  useEffect(() => {             
    fetch("http://localhost:5001/toys")  
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setToys(data);
    })
    .catch(error => console.error('Error fetching toys:', error)); 
  }, []);
  
  const filteredToysByAge = selectedAge === "all" ? toys : toys.filter(toy => toy.age === selectedAge);   
  const filteredToys = filteredToysByAge.filter(toy => {
  return toy.name.toUpperCase().includes(searchText.toUpperCase());

  });
  
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
      {/* <NavBar />
      <Header />
      <label><strong> SEARCH: </strong></label>
      <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="By Name ..." />
      <input type="text" value={selectedAge} onChange={e => setSearchText(e.target.value)} placeholder="By Age ..." />
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
      </ul> */}
      <NavBar />
      <Header />
      <label><strong> SEARCH: </strong></label>
      <input type="text" value={searchText} onChange={updateSearchText} placeholder="By Name ..." />
      <label><strong> SEARCH: </strong></label>
      <select value={selectedAge} onChange={handleAgeChange}>
        <option value="all">All Ages By Month</option>
        <option value="0-2 months">0-2</option>
        <option value="3-4 months">3-4</option>
        <option value="5-6 months">5-6</option>
        <option value="7-8 months">7-8</option>
        <option value="9-10 months">9-10</option>
        <option value="11-12 months">11-12</option>
        <option value="13-15 months">13-15</option>
        <option value="16-18 months">16-18</option>
        <option value="19-21 months">19-21</option>
        <option value="22-24 months">22-24</option>
      </select>
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