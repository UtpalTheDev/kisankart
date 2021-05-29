import { useLogin } from "./LoginContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  let { setLogin, isUserLogIn } = useLogin();
  let navigate = useNavigate();
  let { state } = useLocation();
  console.log("form", state);
  if (isUserLogIn) {
    navigate(state?.from ? "/wishlist" : "/", { replace: true });
  }
  return (
    <>
      login
      <button
        onClick={() => {
          setLogin(true);
        }}
      >
        here
      </button>
    </>
  );
}
