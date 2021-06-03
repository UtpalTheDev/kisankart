import { useLogin } from "./LoginContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  let { setLogin, isUserLogIn, LoginWithCredentials } = useLogin();
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

  function LoginHandler() {
    LoginWithCredentials(email, password);
  }
  return (
    <>
      login
      <form
        onSubmit={(e) => {
          e.preventDefault();
          LoginHandler();
        }}
      >
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
        <button type="submit">Login</button>
      </form>
    </>
  );
}
