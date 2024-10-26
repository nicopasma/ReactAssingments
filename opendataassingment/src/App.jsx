import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <Cocktail />
  );
}

function Cocktail() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        
        const data = await response.json();
        
        setDrinks(data.drinks || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Drinkkilista</h1>
      <div>
        {drinks.map((drink) => (
          <div key={drink.idDrink}>
            <img src={drink.strDrinkThumb} alt={drink.strDrink}/>
            <h2>{drink.strDrink}</h2>
            <p>Category: {drink.strCategory}</p>
            <p>Glass: {drink.strGlass}</p>
            <p>Instructions: {drink.strInstructions}</p>
            <h3>Ingredients</h3>
            <ul>
              {Array.from({ length: 15 }, (_, i) => i + 1)
                .map((i) => ({
                  ingredient: drink[`strIngredient${i}`],
                  measure: drink[`strMeasure${i}`],
                }))
                .filter((item) => item.ingredient)
                .map((item, index) => (
                  <li key={index}>
                    {item.measure ? `${item.measure} ` : ''}{item.ingredient}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;