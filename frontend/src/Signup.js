import { useLogin } from "./LoginContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Signup() {
  let { setLogin, isUserLogIn, LoginWithCredentials } = useLogin();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { state } = useLocation();
  console.log("form", state);

  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);

  async function signupHandler() {
    try {
      let response = await axios.post(
        "https://ecomm-demo-1.utpalpati.repl.co/signup",
        { user: { userName, email, password } }
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("signuphandler error");
    }
  }
  return (
    <>
      signup
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupHandler();
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Signup</button>
      </form>
    </>
  );
}
