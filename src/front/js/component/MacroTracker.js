import React, { useState, useEffect } from "react";
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
  const [eatenCalories, setEatenCalories] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const totalCaloriesAllowed = 2000; // Total calories allowed per day
  const [circlePosition, setCirclePosition] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const localDate = today.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    return localDate;
  });
  const [showModal, setShowModal] = useState(false);
  const [mealTypeToAdd, setMealTypeToAdd] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');

  // Update circle position when eaten calories change
  useEffect(() => {
    const calculateCirclePosition = () => {
      const percentConsumed = (eatenCalories / totalCaloriesAllowed) * 100;
      setCirclePosition(percentConsumed);
    };

    calculateCirclePosition();
  }, [eatenCalories]);

  const addFood = () => {
    const newFoodItem = {
      id: Date.now(), // Unique ID for each food item
      foodItem,
      calories: parseInt(calories),
      protein: parseInt(protein),
      fat: parseInt(fat),
      carbohydrates: parseInt(carbohydrates),
    };

    // Update the meals state based on the meal type to add the food item
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealTypeToAdd]: [...prevMeals[mealTypeToAdd], newFoodItem]
    }));

    // Update total macros and eaten calories
    setTotalMacros(prevTotalMacros => ({
      calories: prevTotalMacros.calories + parseInt(calories),
      protein: prevTotalMacros.protein + parseInt(protein),
      fat: prevTotalMacros.fat + parseInt(fat),
      carbohydrates: prevTotalMacros.carbohydrates + parseInt(carbohydrates),
    }));
    setEatenCalories(prevEatenCalories => prevEatenCalories + parseInt(calories));

    // Reset form fields and hide modal
    setFoodItem('');
    setCalories('');
    setProtein('');
    setFat('');
    setCarbohydrates('');
    setShowModal(false);
  };

  const deleteFood = (mealType, id, macros) => {
    // Filter out the food item with the specified ID from the meals state
    const updatedMeals = {
      ...meals,
      [mealType]: meals[mealType].filter(item => item.id !== id)
    };
    setMeals(updatedMeals);

    // Update total macros and eaten calories after deleting the food item
    setTotalMacros(prevTotalMacros => ({
      calories: prevTotalMacros.calories - macros.calories,
      protein: prevTotalMacros.protein - macros.protein,
      fat: prevTotalMacros.fat - macros.fat,
      carbohydrates: prevTotalMacros.carbohydrates - macros.carbohydrates,
    }));
    setEatenCalories(prevEatenCalories => prevEatenCalories - macros.calories);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAddMeal = (mealType) => {
    setMealTypeToAdd(mealType);
    setShowModal(true);
  };

  return (
    <div className="container" style={{background: '#eeeeee'}}>
      <h2 style={{color: '#72BB53'}}>Macro Tracking</h2>
      <div className="calories-container">
        <div className="eaten-calories">{eatenCalories} EATEN</div>
        <div className="circle">
          <span id="total-calories" style={{color: '#72BB53'}}>{totalCaloriesAllowed}</span>
        </div>
        <div className="burned-calories">{caloriesBurned} BURNED</div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="date-picker-container">
            <label htmlFor="date-picker" style={{color: '#72BB53'}}>Select Date: </label>
            <input
              type="date"
              id="date-picker"
              className="form-control"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>

      {Object.keys(meals).map((mealType, index) => (
        <div className="meal-container" key={index}>
          <div className="meal-name" style={{color: '#EE6E57'}}>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</div>
          <button className="btn btn-primary" style={{backgroundColor: '#EE6E57', borderColor: '#EE6E57'}} onClick={() => handleAddMeal(mealType)}>Add {mealType}</button>
          <ul className="list-group mt-2">
            {meals[mealType].map((item, mealIndex) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={mealIndex}>
                <span>
                  {item.foodItem} - {item.calories} calories, {item.protein}g protein, {item.fat}g fat, {item.carbohydrates}g carbs
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteFood(mealType, item.id, { calories: item.calories, protein: item.protein, fat: item.fat, carbohydrates: item.carbohydrates })}
                  style={{backgroundColor: '#EE6E57', borderColor: '#EE6E57'}}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Modal for adding meal details */}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{backgroundColor: '#f9f9f9'}}>
            <div className="modal-header" style={{backgroundColor: '#EE6E57', color: '#fff'}}>
              <h5 className="modal-title">Add {mealTypeToAdd} Meal</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="food-item">Food Item:</label>
                <input type="text" id="food-item" className="form-control" value={foodItem} onChange={(e) => setFoodItem(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="calories">Calories:</label>
                <input type="number" id="calories" className="form-control" value={calories} onChange={(e) => setCalories(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="protein">Protein (g):</label>
                <input type="number" id="protein" className="form-control" value={protein} onChange={(e) => setProtein(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="fat">Fat (g):</label>
                <input type="number" id="fat" className="form-control" value={fat} onChange={(e) => setFat(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="carbohydrates">Carbohydrates (g):</label>
                <input type="number" id="carbohydrates" className="form-control" value={carbohydrates} onChange={(e) => setCarbohydrates(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={addFood}>Add Food</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacroTracker;
