import { useLogin } from "./LoginContext";

export default function User() {
  const { logout } = useLogin();
  return (
    <>
      user
      <button onClick={() => logout()}>logout</button>
    </>
  );
}
