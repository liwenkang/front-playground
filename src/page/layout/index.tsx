import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/home">Home</Link>
        <Link to="/react-query">react-query</Link>
        <Link to="/unit-test">unit-test</Link>
        <Link to="/webpack">webpack</Link>
        <Link to="/XMLHttpRequest">XMLHttpRequest</Link>
        <Link to="/404">no-match</Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
