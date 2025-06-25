import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouterCustom from "./router";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const res = axios.get(`${import.meta.env.VITE_API_URL}/user/getAllUser`);
    return res;
  };
  return (
    <BrowserRouter>
      <RouterCustom></RouterCustom>
    </BrowserRouter>
  );
}

export default App;
