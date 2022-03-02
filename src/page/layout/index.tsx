import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

function HookLocation() {
  const location = useLocation();
  useEffect(() => {
    console.log("location", location);
  }, [location]);
}

function Layout() {
  const [num, setNum] = useState("1");
  const navigate = useNavigate();
  function onHashChange() {
    console.log("onHashChange", onHashChange);
  }

  /**
   * 监听 history 变化
   * @returns
   */
  function onHistoryChange() {
    // 解析 location
    const { pathname, search } = window.location;

    // 根据页面不同执行不同内容
    switch (pathname) {
      case "/home":
        document.body.innerHTML = `Hello ${search.replace(/^\?/, "")}`;
        return;
      default:
        document.body.innerHTML = `Hello World`;
        return;
    }
  }

  // window.addEventListener("hashchange", onHashChange);
  window.addEventListener("popstate", onHistoryChange);

  /**
   * 页面跳转
   * @returns
   */
  function pushState(target: string) {
    // (state, title[, url])
    window.history.pushState(null, "", target);
    onHistoryChange();
  }

  // 3 秒后路由跳转
  // setTimeout(() => {
  //   pushState("/home?name=HZFEStudio");
  // }, 3000);

  // 6 秒后返回
  // setTimeout(() => {
  //   window.history.back();
  // }, 6000);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/react-query#" + num);
          setNum(num + 1);
        }}
      >
        测试
      </button>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Home</Link>
        <Link to="/react-query#1">react-query</Link>
        <Link to="/unit-test#2">unit-test</Link>
        <Link to="/webpack#3">webpack</Link>
        <Link to="/XMLHttpRequest#4">XMLHttpRequest</Link>
        <Link to="/404">no-match</Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
