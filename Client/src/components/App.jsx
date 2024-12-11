
import { useState, useEffect } from 'react';   
import NavBar from './NavBar';
import Header from './Header';
import { Outlet } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';

function App() {  
  const [toys, setToys] = useState([]); 
  const [searchText, setSearchText] = useState("");  
  const [selectedAge, setSelectedAge] = useState("all");

  useEffect(() => {             
    fetch(encodeURI("http://localhost:5001/toys"))  
      .then(response => response.json())
      .then(data => setToys(data)); 
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
    const url = encodeURI("http://localhost:5001/toys")
    fetch(url, configObj)
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
      
      <Outlet context={{toys: filteredToys, addNewToy: addNewToy, deleteToy: deleteToy, updateSearchText: updateSearchText, searchText: searchText, handleAgeChange: handleAgeChange, selectedAge: selectedAge}} /> 
    </div>
  );
}

export default App;