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
  const [editing, setEditing] = useState({ isEditing: false, meal: null, id: null });

  const addOrUpdateFood = (meal) => {
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
      if (editing.isEditing) {
        // Update existing food item
        const updatedMeals = meals[meal].map((item) => 
          item.id === editing.id ? { ...item, foodItem, calories, protein, fat, carbohydrates } : item
        );
        setMeals({ ...meals, [meal]: updatedMeals });
        setEditing({ isEditing: false, meal: null, id: null });
      } else {
        // Add new food item
        const newMeal = [...meals[meal], { id: Date.now(), foodItem, calories, protein, fat, carbohydrates }];
        setMeals({ ...meals, [meal]: newMeal });
      }

      // Update total macros
      const operation = editing.isEditing ? 0 : 1; // 1 for add, 0 for update (since update is just a replace, no need to recalculate totals here)
      setTotalMacros({
        calories: totalMacros.calories + (calories * operation),
        protein: totalMacros.protein + (protein * operation),
        fat: totalMacros.fat + (fat * operation),
        carbohydrates: totalMacros.carbohydrates + (carbohydrates * operation),
      });

      // Clear input fields
      [foodInput, caloriesInput, proteinInput, fatInput, carbohydratesInput].forEach(input => input.value = "");
    } else {
      alert("Please enter valid values for all fields.");
    }
  };

  const deleteFood = (meal, id, macros) => {
    const updatedMeals = meals[meal].filter((item) => item.id !== id);
    setMeals({ ...meals, [meal]: updatedMeals });

    // Update total macros
    setTotalMacros({
      calories: totalMacros.calories - macros.calories,
      protein: totalMacros.protein - macros.protein,
      fat: totalMacros.fat - macros.fat,
      carbohydrates: totalMacros.carbohydrates - macros.carbohydrates,
    });
  };

  const startEdit = (meal, item) => {
    setEditing({ isEditing: true, meal, id: item.id });
    document.getElementById(`${meal}-food`).value = item.foodItem;
    document.getElementById(`${meal}-calories`).value = item.calories;
    document.getElementById(`${meal}-protein`).value = item.protein;
    document.getElementById(`${meal}-fat`).value = item.fat;
    document.getElementById(`${meal}-carbohydrates`).value = item.carbohydrates;
  };

  return (
    <div className="container">
      <h2>Macro Tracking</h2>

      {Object.keys(meals).map((meal, index) => (
        <div className="meal-container" key={index}>
          <div className="meal-name">{meal.charAt(0).toUpperCase() + meal.slice(1)}</div>
          <div className="food-item">
            {/* Input Fields */}
            <input type="text" id={`${meal}-food`} className="form-control" placeholder="Enter food item" />
            <input type="number" id={`${meal}-calories`} className="form-control" placeholder="Calories" />
            <input type="number" id={`${meal}-protein`} className="form-control" placeholder="Protein (g)" />
            <input type="number" id={`${meal}-fat`} className="form-control" placeholder="Fat (g)" />
            <input type="number" id={`${meal}-carbohydrates`} className="form-control" placeholder="Carbohydrates (g)" />
            <button className="btn btn-primary" onClick={() => addOrUpdateFood(meal)}>
              {editing.isEditing && editing.meal === meal ? "Update" : "Add"}
            </button>
          </div>
          <ul className="list-group mt-2">
            {/* Meal Items List */}
            {meals[meal].map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                <span>
                  {item.foodItem} - {item.calories} calories, {item.protein}g protein, {item.fat}g fat, {item.carbohydrates}g carbs
                </span>
                <div>
                  <button className="btn btn-warning btn-sm" onClick={() => startEdit(meal, item)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteFood(meal, item.id, item)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-4">
        Total Macros - Calories: {totalMacros.calories}, Protein: {totalMacros.protein}g, Fat: {totalMacros.fat}g, Carbohydrates: {totalMacros.carbohydrates}g
      </div>
    </div>
  );
}

export default MacroTracker;
