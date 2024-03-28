const apiUrl = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      user: null,
      favorites: [],
    },
    actions: {
      addFavorites: async (fav) => {
        try {
          const response = await fetch(apiUrl + "/favorites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipe_name: fav,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add favorite");
          }

          const data = await response.json();
          console.log(data);

          setStore({ favorites: [...getStore().favorites, fav] });
        } catch (error) {
          console.error("Error adding favorite:", error);
        }
      },

      removeFavorites: async (fav) => {
        try {
          const response = await fetch(apiUrl + "/favorites", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipe_name: fav,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to remove favorite");
          }

          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error removing favorite:", error);
        }
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      signUp: async (form, callback) => {
        try {
          const response = await fetch(apiUrl + "/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
              age: form.age,
              height: form.height,
              weight: form.weight,
              activity_level: form.activity,
            }),
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
        fetch(apiUrl + "/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        })
          .then(async (resp) => {
            if (!resp.ok) {
              alert("Wrong email or password");
              return false;
            }

            const data = await resp.json();
            sessionStorage.setItem("token", data.token);
            setStore({ token: data.token });

            console.log(getStore().token);
          })
          .catch((error) => {
            console.error("Login error:", error);
          });
      },

      logout: (navigate) => {
        setStore({ user: null });
        sessionStorage.removeItem("token");
        setStore({ token: null });
        navigate("/");
      },

      authenticateUser: () => {
        return new Promise((resolve, reject) => {
          fetch(apiUrl + "/api/private", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + getStore().token,
            },
          })
            .then((resp) => {
              if (!resp.ok) {
                throw new Error("Authentication failed");
              }
              return resp.json();
            })
            .then((data) => {
              setStore({ user: data });
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },

      tokenFromStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != null && token != undefined) {
          setStore({ token: token });
        }
      },
    },
  };
};

export default getState;
