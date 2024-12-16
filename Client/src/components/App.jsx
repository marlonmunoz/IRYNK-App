
import { useState, useEffect } from 'react';   
import { Outlet } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import NavBar from './NavBar';
import Header from './Header';
import Toy from './Toy';

function App() {  
  const [searchText, setSearchText] = useState("");  
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [toys, setToys] = useState([]); 
  
  useEffect(() => {             
    fetch("http://localhost:5002/toys")  
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
    fetch("http://localhost:5002/toys", configObj)
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
      <Outlet context={{toys: filteredToys, addNewToy: addNewToy, deleteToy: deleteToy, updateSearchText: updateSearchText, searchText: searchText, handleAgeChange: handleAgeChange, selectedAge: selectedAge}} /> 
      
    </div>
  );
}

export default App;