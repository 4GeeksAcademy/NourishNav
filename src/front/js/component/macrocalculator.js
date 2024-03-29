import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Macrocalculator = () => {
    const { store, actions } = useContext(Context);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    
    const fetchData = async () => {
        const url = 'https://fitness-calculator.p.rapidapi.com/macrocalculator?age=25&gender=male&height=180&weight=70&activitylevel=5&goal=extremelose';
        const options = {
            method: 'GET',
            headers: {
		'X-RapidAPI-Key': 'a1b0c2e066mshd837a4a5335ce94p17fdbajsne294abb41532',
		'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setResult(data); 
        } catch (error) {
            setError(error); 
        }
    };

    
    useEffect(() => {
        fetchData();
    }, []); 


    return (
        <div>
            {result && (
            <div>
                <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
            )}
            {error && (
            <div>
                <p>Error: {error.message}</p>
            </div>
            )}

//         <div style={{ minHeight: "50dvh", border: "2px solid black", borderRadius: "12.5%", background: "beige"}}>
//         <div>Macro Calculator</div>
//         <input type="text" onChange={(e) => setQuery(e.target.value)} />
//         <button className="btn btn-primary" onClick={() => handleApiCall()}>Search</button>
        </div> : 
		</div >
//     );
// };

export default Macrocalculator;
