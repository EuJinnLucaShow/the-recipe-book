import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <h1>
        <Link to={"/"}>The Recipe Book</Link>
      </h1>
      <Outlet />
    </>
  );
}
