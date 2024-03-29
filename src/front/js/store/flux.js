const apiUrl = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: null,
            user: null,
            favorites: []
        },
        actions: {
            addFavorites: (fav) => {
                setStore({ favorites: [...getStore().favorites, fav] });
            },
            removeFavorites: (fav) => {
                setStore({
                    favorites: [...getStore().favorites.filter((item) => item !== fav)]
                });
            },
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            signUp: async (form, callback) => {
                const url = apiUrl + "/api/signup";
                try {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: form.email,
                            password: form.password,
                            age: form.age,
                            height: form.height,
                            weight: form.weight,
                            activity_level: form.activity
                        })
                    });
                    if (!response.ok) {
                        const errorBody = await response.json();
                        throw new Error(errorBody.message || "Signup failed");
                    }
                    await response.json();
                    if (callback) callback();
                } catch (error) {
                    console.error("Signup error:", error);
                    throw error;
                }
            },
            login: (form) => {
                const store = getStore();
                const url = apiUrl + "/api/token";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: form.email,
                        password: form.password
                    })
                })
                .then(async (resp) => {
                    if (!resp.ok) {
                        alert("Wrong email or password");
                        return false;
                    }
                    const data = await resp.json();
                    sessionStorage.setItem("token", data.token);
                    setStore({ token: data.token });
                    console.log(store.token);
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            logout: (navigate) => {
                setStore({ user: null });
                sessionStorage.removeItem("token");
                setStore({ token: null });
                navigate("/");
            },
            authenticateUser: () => {
                const store = getStore();
                const apiUrl = process.env.BACKEND_URL + "/api/private";
                fetch(apiUrl + "/api/private", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + store.token
                    }
                })
                .then((resp) => {
                    if (!resp.ok) {
                        navigate("/login");
                        alert("Please login to continue");
                    }
                    return resp.json();
                })
                .then((data) => {
                    setStore({ user: data });
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            tokenFromStore: () => {
                let store = getStore();
                const token = sessionStorage.getItem("token");
                if (token && token !== null && token !== undefined) setStore({ token: token });
            }
        }
    };
};

export default getState;
