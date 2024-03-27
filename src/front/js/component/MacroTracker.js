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
  const [totalMacros, setTotalMacros] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });
  // Step 1: Add State for Selected Date
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const localDate = today.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    return localDate;
  });

  const addFood = (meal) => {
    const foodInput = document.getElementById(`${meal}-food`);
    const caloriesInput = document.getElementById(`${meal}-calories`);
    const proteinInput = document.getElementById(`${meal}-protein`);
    const fatInput = document.getElementById(`${meal}-fat`);
    const carbohydratesInput = document.getElementById(`${meal}-carbohydrates`);

    const foodItem = foodInput.value.trim();
    const calories = parseInt(caloriesInput.value);
    const protein = parseInt(proteinInput.value);
    const fat = parseInt(fatInput.value);
    const carbohydrates = parseInt(carbohydratesInput.value);

    if (foodItem !== "" && !isNaN(calories) && !isNaN(protein) && !isNaN(fat) && !isNaN(carbohydrates)) {
      const newMeal = [...meals[meal], { id: Date.now(), foodItem, calories, protein, fat, carbohydrates }];
      setMeals({ ...meals, [meal]: newMeal });

      setTotalMacros({
        calories: totalMacros.calories + calories,
        protein: totalMacros.protein + protein,
        fat: totalMacros.fat + fat,
        carbohydrates: totalMacros.carbohydrates + carbohydrates,
      });

      // Clear input fields after adding
      foodInput.value = "";
      caloriesInput.value = "";
      proteinInput.value = "";
      fatInput.value = "";
      carbohydratesInput.value = "";
    } else {
      alert("Please enter valid values for all fields.");
    }
  };

  const deleteFood = (meal, id, macros) => {
    const updatedMeals = meals[meal].filter((item) => item.id !== id);
    setMeals({ ...meals, [meal]: updatedMeals });

    setTotalMacros({
      calories: totalMacros.calories - macros.calories,
      protein: totalMacros.protein - macros.protein,
      fat: totalMacros.fat - macros.fat,
      carbohydrates: totalMacros.carbohydrates - macros.carbohydrates,
    });
  };

  return (
    <div className="container">
      <h2>Macro Tracking</h2>
      {/* Step 2: Modify the UI to Include Date Picker */}
      <div className="date-picker-container">
        <label htmlFor="date-picker">Select Date: </label>
        <input
          type="date"
          id="date-picker"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Meal Sections */}
      {Object.keys(meals).map((meal, index) => (
        <div className="meal-container" key={index}>
          {meal === "breakfast" && (
            <div className="date-display">
              Tracking for: <strong>{selectedDate}</strong>
            </div>
          )}
          <div className="meal-name">{meal.charAt(0).toUpperCase() + meal.slice(1)}</div>
          <div className="food-item">
            <input type="text" id={`${meal}-food`} className="form-control" placeholder="Enter food item" />
            <input type="number" id={`${meal}-calories`} className="form-control" placeholder="Calories" />
            <input type="number" id={`${meal}-protein`} className="form-control" placeholder="Protein (g)" />
            <input type="number" id={`${meal}-fat`} className="form-control" placeholder="Fat (g)" />
            <input type="number" id={`${meal}-carbohydrates`} className="form-control" placeholder="Carbohydrates (g)" />
            <button className="btn btn-primary" onClick={() => addFood(meal)}>Add</button>
          </div>
          <ul className="list-group mt-2">
            {meals[meal].map((item, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                <span>
                  {item.foodItem} - {item.calories} calories, {item.protein}g protein, {item.fat}g fat, {item.carbohydrates}g carbs
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteFood(meal, item.id, { calories: item.calories, protein: item.protein, fat: item.fat, carbohydrates: item.carbohydrates })}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-4">
        Total Calories: {totalMacros.calories}, Protein: {totalMacros.protein}g, Fat: {totalMacros.fat}g, Carbohydrates: {totalMacros.carbohydrates}g
      </div>
    </div>
  );
}

export default MacroTracker;
