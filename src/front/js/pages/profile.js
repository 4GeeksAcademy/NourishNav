import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Macrotracker } from "../component/macrotracker";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [file, setFile] = useState("")

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
    }
    // useEffect(() => {
    //     if (!store.user) {
    //         actions.authenticateUser()
    //             .then((userData) => {
    //                 // If authentication is successful and user is retrieved,
    //                 // you can optionally perform additional actions here.
    //                         console.log("User authenticated:", userData);
    //                         setStore({ user: userData });
    //             })
    //             .catch((error) => {
    //                 // If authentication fails, redirect to home.
    //                 // navigate("/");
    //                     console.error("Authentication failed:", error);
    //             });
    //     }
    // }, [store.user]);

    useEffect(() => {
        updateFunction();
    }, [file])

    const updateFunction = () => {
        console.log("update function ran")
        let response = process.env.BACKEND_URL + "";

        //make the fetch for update profile 
        // you can do in flux and call her using action.whateverYouKnowYourFunction
        // or you can make the request here
        // update means it will be a PUT request 
    }



    return (
        <div className="container text-center">
            <Macrotracker/>
            <h1>Hello!</h1>
            {store.user && (
                <div>
                    <h2>Email: {store.user.email}</h2>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <select>
                        <option>option one</option>
                        <option>option one</option>
                    </select>
                </div>

            )}
            <input type="file" onChange={handleChange} />
            <img src={file} height="300px" width="300px" />
        </div>
    );
};

export default Private;