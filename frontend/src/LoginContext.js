import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logincontext = createContext();
function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    console.log("chala");
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}
function setupAuthExceptionHandler(logoutUser, navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        console.log("here");
        logoutUser();
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
}

export function LoginProvider({ children }) {
  const [isUserLogIn, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const { isUserLoggedIn, token } =
      JSON.parse(localStorage?.getItem("login")) || {};

    isUserLoggedIn && token && loginUser({ token });
    setupAuthExceptionHandler(logout, navigate);
  }, []);
  console.log("isuserlogin", isUserLogIn);
  async function LoginWithCredentials(email, password) {
    try {
      let response = await axios.post(
        "https://ecomm-demo-1.utpalpati.repl.co/login",
        { user: { email, password } }
      );
      console.log(response);
      if (response.status === 200) {
        loginUser(response.data);
      }
    } catch (error) {
      console.log("loginwithcredentials error");
    }
  }
  function loginUser({ token }) {
    console.log("token", token);
    setToken(token);
    setupAuthHeaderForServiceCalls(token);
    setLogin(true);
    localStorage?.setItem(
      "login",
      JSON.stringify({ isUserLoggedIn: true, token })
    );
  }
  function logout() {
    localStorage?.removeItem("login");
    setLogin(false);
    setToken(null);
    setupAuthHeaderForServiceCalls(null);
  }
  return (
    <Logincontext.Provider
      value={{ isUserLogIn, setLogin, logout, token, LoginWithCredentials }}
    >
      {children}
    </Logincontext.Provider>
  );
}

export function useLogin() {
  return useContext(Logincontext);
}
