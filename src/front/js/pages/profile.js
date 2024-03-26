import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.user) {
            actions.authenticateUser()
                .then(() => {
                    // If authentication is successful and user is retrieved,
                    // you can optionally perform additional actions here.
                })
                .catch(() => {
                    // If authentication fails, redirect to home.
                    // navigate("/");
                });
        }
    }, [actions, navigate, store.user]);

    return (
        <div className="container text-center">
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
        </div>
    );
};

export default Private;