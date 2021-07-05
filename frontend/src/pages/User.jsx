import axios from "axios";
import { useEffect } from "react";
import { useLogin } from "../Reducer-context/LoginContext";
import { useReduce } from "../Reducer-context/Reducer-context";

export function User() {
  const { logout } = useLogin();
  const { dispatch, user } = useReduce();

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: "LOAD", payload: true });
        let response = await axios.get(
          "https://kisankartbackend.herokuapp.com/user"
        );
        dispatch({ type: "USER", payload: response.data });
        dispatch({ type: "LOAD", payload: false });
      } catch (error) {}
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
