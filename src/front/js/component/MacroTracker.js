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
      const newMeal = [...meals[meal], { id: Date.now(), foodItem, calories }];
      setMeals({ ...meals, [meal]: newMeal });

      setTotalCalories(totalCalories + calories);

      // Clear input fields after adding
      foodInput.value = "";
      caloriesInput.value = "";
    } else {
      alert("Please enter valid values for food item and calories.");
    }
  };

  const deleteFood = (meal, id, calories) => {
    const updatedMeals = meals[meal].filter((item) => item.id !== id);
    setMeals({ ...meals, [meal]: updatedMeals });
    setTotalCalories(totalCalories - calories);
  };

  return (
    <div className="container">
      <h2>Macro Tracking</h2>

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
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={index}
              >
                <span>
                  {item.foodItem} - {item.calories} calories
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteFood(meal, item.id, item.calories)}
                >
                  Delete
                </button>
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
