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
			addFavorites: (fav) => {
				setStore({ favorites: [...getStore().favorites, fav] });
			},
			removeFavorites: (fav) => {
				setStore({
					favorites: [...getStore().favorites.filter((item) => item !== fav)],
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
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"email": form.email,
							"password": form.password,
							"age": form.age,
							"height": form.height,
							"weight": form.weight,
							"activity_level": form.activity
						})
					});
					if (!response.ok) {
						// Convert non-OK HTTP responses into errors
						const errorBody = await response.json();
						throw new Error(errorBody.message || 'Signup failed');
					}
					await response.json(); // Assuming you might use this for something
					if (callback) callback(); // Call the callback if signup is successful
				} catch (error) {
					console.error('Signup error:', error);
					throw error; // Rethrow the error so it can be caught and handled in the component
				}
			},

			login: (form) => {
				const store = getStore();
				const url = apiUrl + "/api/token";
				fetch(url, {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": form.email,
						"password": form.password
					})
				})


					.then(async resp => {
						console.log(resp.ok); // will be true if the response is successfull
						console.log(resp.status); // the status code = 200 or code = 400 etc.
						if (!resp.ok) {
							alert("Wrong email or password");
							return false;
						}
						//console.log(resp.text()); // will try return the exact result as string
						const data = await resp.json();
						sessionStorage.setItem("token", data.token);
						setStore({ token: data.token });

						console.log(store.token);
					})
					.catch(error => {
						//error handling
						console.log(error);
					})
			},

			logout: (navigate) => {
				setStore({ user: null });
				sessionStorage.removeItem("token");
				setStore({ token: null });
				navigate("/");
			},

			authenticateUser: () => {
				const store = getStore();
				const apiUrl = process.env.BACKEND_URL + "/api/private"
				fetch(apiUrl + "/api/private", {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token
					}
				})
					.then(resp => {
						console.log(resp.ok); // will be true if the response is successfull
						console.log(resp.status); // the status code = 200 or code = 400 etc.
						if (!resp.ok) {
							navigate("/login");
							alert("Please login to continue");

						}

						//console.log(resp.text()); // will try return the exact result as string
						return resp.json();
					})
					.then(data => {
						setStore({ user: data });

					})
					.catch(error => {
						//error handling
						console.log(error);
					})


				// return new Promise((resolve, reject) => {
				// 	fetch(apiUrl + "/api/private", {

				// 	})
				// 		.then(resp => {
				// 			if (!resp.ok) {
				// 				throw new Error("Authentication failed");
				// 			}
				// 			return resp.json();
				// 		})
				// 		.then(data => {
				// 			setStore({ user: data });
				// 			resolve(data);
				// 			navigate('/profile');
				// 		})
				// 		.catch(error => {
				// 			reject(error);
				// 		});
				// });
			},

			tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
				if (token && token != null && token != undefined) setStore({ token: token });
			},

		}
	};
};

export default getState;