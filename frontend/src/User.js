import { useLogin } from "./LoginContext";
import { useReduce } from "./Reducer-context";

export default function User() {
  const { logout } = useLogin();
  const { dispatch } = useReduce();
  return (
    <>
      user
      <button
        onClick={() => {
          logout();
          dispatch({ type: "RESET" });
        }}
      >
        logout
      </button>
    </>
  );
}
