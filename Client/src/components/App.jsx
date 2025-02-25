
import { useState, useEffect } from 'react';   
import { Outlet } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import NavBar from './NavBar';
import Header from './Header';

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
  
  
  function deleteToy(toyId) {
    fetch(`http://localhost:5002/toys/${toyId}`, {method: 'DELETE'})
    .then(response => {
      if (response.ok) {
        setToys(toys.filter(toy => toy.id !== toyId));
      } else {
        console.error('Error deleting toy:', response.statusText);
      }
    })
    .catch(error => console.error('Error deleting toy:', error));
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
      setToys(toys => toys.map(toy => toy.temp ? newToyData : toy)); // Replace the temp toy with the new toy data
    })
    .catch(error => console.log('Error', error));
  }
  
  function handleAgeChange(event){
    setSelectedAge(event.target.value)
  }
  
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value)
  }
  
  function updateSearchText(event) {
    setSearchText(event.target.value);
  }
  
  const ageCategories = {
    "all": "All Ages By Month",
    "0-2 months": "0-2 months",
    "3-4 months": "3-4 months",
    "5-6 months": "5-6 months",
    "7-8 months": "7-8 months",
    "9-10 months": "9-10 months",
    "11-12 months": "11-12 months",
    "13-15 months": "13-15 months",
    "16-18 months": "16-18 months",
    "19-21 months": "19-21 months",
    "22-24 months": "22-24 months"
  };
  
  const nameCategories = {
    // "all": "All Categories",
    1:  "Sensory + Cognitive",
    2: "Cognitive + Emotional",
    3: "Sensory Exploration + Motor Skills",
    4: "Cognitive + Emotional + Motor Dev.", 
    5: "Sensory",
    6: "Cognitive + Physical",
    7: "Motor Skills: Gross + Fine",
    8: "Cognitive Development", 
    9: "Social + Emotional",
    10: "Cognitive Development + Problem Solving Skills"
  };
  
  const ageToCategoryMap = {
    "0-2 months": 5,
    "3-4 months": 9,
    "5-6 months": 3,
    "7-8 months": 10,
    "9-10 months": 7,
    "11-12 months": 8,
    "13-15 months": 6,
    "16-18 months": 2,
    "19-21 months": 1,
    "22-24 months": 4
  };

  const ageToCategoriesMap = {
    "0-2 months": {category: "Sensory", category_id: 9},
    "3-4 months": {category: "Social + Emotional", category_id: 5},
    "5-6 months": {category: "Sensory Exploration + Motor Skills", category_id: 3},
    "7-8 months": {category: "Cognitive Development + Problem Solving Skills", category_id: 10},
    "9-10 months": {category: "Motor Skills: Gross + Fine", category_id: 7},
    "11-12 months": {category: "Cognitive Development", category_id: 8},
    "13-15 months": {category: "Cognitive + Physical", category_id: 6},
    "16-18 months": {category: "Cognitive + Emotional", category_id: 2},
    "19-21 months": {category: "Sensory + Cognitive", category_id: 1},
    "22-24 months": {category: "Cognitive + Emotional + Motor Dev.", category_id: 4}
};
  
  const getToyCategoryByAge = (age) => {
    return ageToCategoryMap[age]
  };
  
  const filteredToysByAge = selectedAge === "all" ? toys : toys.filter(toy => toy.age === selectedAge);   
  const filteredToysByCategory = selectedCategory === "all" ? filteredToysByAge : filteredToysByAge.filter(toy => toy.category_id === getToyCategoryByAge(selectedAge));
  const filteredToys = filteredToysByCategory.filter(toy => {
    // console.log('TOY NAME:', toy.name, 'AGE:', toy.age, 'TOY CATEGORY_ID:', toy.category_id);
    return toy.name.toUpperCase().includes(searchText.toUpperCase());
  });

  // CONTACT 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');


  
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Outlet context={
        {
          // toys: filteredToys, 
          searchText: searchText, 
          selectedAge: selectedAge,
          addNewToy: addNewToy, 
          deleteToy: deleteToy, 
          updateSearchText: updateSearchText, 
          handleAgeChange: handleAgeChange, 
          handleCategoryChange: handleCategoryChange,
          selectedCategory: selectedCategory,
          ageCategories: ageCategories,
          nameCategories: nameCategories,
          ageToCategoryMap: ageToCategoryMap,
          ageToCategoriesMap: ageToCategoriesMap,
          filteredToys: filteredToys,
          message: message,
          setMessage: setMessage,
          formData: formData,
          setFormData: setFormData,
          contacts: contacts,
          setContacts: setContacts,
          toys:toys,
        }
      } 
      /> 
      
    </div>
  );
}

export default App;