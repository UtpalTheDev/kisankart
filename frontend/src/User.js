import axios from "axios";
import { useEffect } from "react";
import { useLogin } from "./LoginContext";
import { useReduce } from "./Reducer-context";

export default function User() {
  const { logout, isUserLogIn } = useLogin();
  const { dispatch, user } = useReduce();

  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          "https://kisankartbackend.herokuapp.com/user"
        );
        dispatch({ type: "USER", payload: response.data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="user">
      <div className="user-data">
        <div>Name: {user.name}</div>
        <div>EmailId: {user.email}</div>
      </div>

      <button
        className="user-logout primary-button"
        onClick={() => {
          logout();
          dispatch({ type: "RESET" });
        }}
      >
        logout
      </button>
    </div>
  );
}
