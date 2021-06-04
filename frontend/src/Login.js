import { useLogin } from "./LoginContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  let { isUserLogIn, LoginWithCredentials } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { state } = useLocation();

  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);

  function LoginHandler() {
    LoginWithCredentials(email, password);
  }
  return (
    <div className="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          LoginHandler();
        }}
        className="form"
      >
        <label class="input md">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            class="input-text"
            required
          />
          <span class="placeholder">Email</span>
        </label>
        <label class="input md">
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            class="input-text"
            required
          />
          <span class="placeholder">Password</span>
        </label>
        <button type="submit" class="secondary-button md">
          Login
        </button>
        <button class="secondary-button md">
          <Link to="/signup">Signup</Link>
        </button>
      </form>
    </div>
  );
}
