import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Macrotracker = () => {
	const { store, actions } = useContext(Context);
	const [query, setQuery] = useState();
	const [nutrition, setNutrition] = useState()


	async function handleApiCall() {
		let response = await fetch('https://api.calorieninjas.com/v1/nutrition?query=' + query, {
			method: 'GET',
			headers: { 'X-Api-Key': 'OE6QCELAPANx8gXvPS3SMQ==tfP3w09EJuTZ6Ahg' },
			contentType: 'application/json',
		})
		let data = await response.json();
		setNutrition(data.items[0])
	}

	return (
		<div style={{ minHeight: "50dvh", border: "2px solid black", borderRadius: "12.5%", background: "beige"}}>
			<div>Macro Tracker: Enter food here</div>
			<input type="text" onChange={(e) => setQuery(e.target.value)} />
			<button className="btn btn-primary" onClick={() => handleApiCall()}>Search</button>
			{nutrition ? <div>
				<ul>Name: {nutrition.name}</ul>
				<ul>Calories: {nutrition.calories}</ul>
				<ul>Serving size: {nutrition.serving_size_g}</ul>
				<ul>Sugar: {nutrition.sugar_g}</ul>
				<ul>Fiber {nutrition.fiber_g}</ul>
				<ul>Protein {nutrition.protein_g}</ul>
                <ul>Carbohydrates: {nutrition.carbohydrates_total_g}</ul>
                <ul>Fat: {nutrition.fat_total_g}</ul>
				<ul>Cholesterol: {nutrition.cholesterol_mg}</ul>
				<ul>Saturated Fat: {nutrition.fat_saturated_g}</ul>
				<ul>Sodium: {nutrition.sodium_mg}</ul>
			</div> : ''}
		</div >
	);
};