import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createFrun = (frunData) => API.post("/frun", frunData);
export const getFruns = () => API.get("/frun");
export const getFrun = (id) => API.get(`/frun/${id}`);
export const deleteFrun = (id) => API.delete(`/frun/${id}`);
export const updateFrun = (updatedFrunData, id) =>
  API.patch(`/frun/${id}`, updatedFrunData);
export const getFrunsByUser = (userId) => API.get(`/frun/userFruns/${userId}`);

export const getFrunsBySearch = (searchQuery) => API.get(`/frun/search?searchQuery=${searchQuery}`)
export const getTagFruns = (tag) => API.get(`/frun/tag/${tag}`);