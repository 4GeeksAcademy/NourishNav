import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/macroTracker.css";

function MacroTracker() {
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  });
  const [totalCalories, setTotalCalories] = useState(0);

  const addFood = (meal) => {
    const foodInput = document.getElementById(`${meal}-food`);
    const caloriesInput = document.getElementById(`${meal}-calories`);

    const foodItem = foodInput.value.trim();
    const calories = parseInt(caloriesInput.value);

    if (foodItem !== "" && !isNaN(calories)) {
      const newMeal = [...meals[meal], { foodItem, calories }];
      setMeals({ ...meals, [meal]: newMeal });

      setTotalCalories(totalCalories + calories);

      // Clear input fields after adding
      foodInput.value = "";
      caloriesInput.value = "";
    } else {
      alert("Please enter valid values for food item and calories.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Macro Tracking</h2>

      {Object.keys(meals).map((meal, index) => (
        <div className="meal-container" key={index}>
          <div className="meal-name">
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </div>
          <div className="food-item">
            <input
              type="text"
              id={`${meal}-food`}
              className="form-control"
              placeholder="Enter food item"
            />
            <input
              type="number"
              id={`${meal}-calories`}
              className="form-control"
              placeholder="Calories"
            />
            <button className="btn btn-primary" onClick={() => addFood(meal)}>
              Add
            </button>
          </div>
          <ul className="list-group mt-2">
            {meals[meal].map((item, index) => (
              <li className="list-group-item" key={index}>
                {item.foodItem} - {item.calories} calories
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-4">
        Total Calories: <span id="total-calories">{totalCalories}</span>
      </div>
    </div>
  );
}

export default MacroTracker;
