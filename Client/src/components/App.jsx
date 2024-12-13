
import { useState, useEffect } from 'react';   
import { Outlet } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import NavBar from './NavBar'
import Header from './Header';
import Toy from './Toy';

function App() {  
  const [searchText, setSearchText] = useState("");  
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all")
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
  const filteredToysByCategory = selectedCategory === "all" ? filteredToysByAge : filteredToysByAge.filter(toy => toy.category === selectedCategory);
  const filteredToys = filteredToysByCategory.filter(toy => {
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

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value)
  }


  return (
    <div className="App">
      <NavBar />
      <Header />
      <label id="my_bars"><strong> NAME: </strong></label>
      <input className="search-bars" id='s_bar' type="text" value={searchText} onChange={updateSearchText} placeholder="By Name ..." />

      <label id="my_bars"><strong> AGE: </strong></label>
      <select className="search-bars" value={selectedAge} onChange={handleAgeChange}>
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

      <label id="my_bars"><strong> CATEGORY: </strong></label>
      <select className="search-bars" value={selectedCategory} onChange={handleCategoryChange}>
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