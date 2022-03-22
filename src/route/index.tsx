import { Routes, Route } from "react-router-dom";
import Layout from "../page/layout";
import Home from "../page/home";
import ReactQuery from "../page/react-query";
import UnitTest from "../page/unit-test";
import Webpack from "../page/webpack";
import XMLHttpRequest from "../page/XMLHttpRequest";
import NoMatch from "../page/no-match";
import Timer from "../article/react/hook";

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="react-query" element={<ReactQuery />} />
          <Route path="unit-test" element={<UnitTest />} />
          <Route path="webpack" element={<Webpack />} />

          <Route path="XMLHttpRequest" element={<XMLHttpRequest />} />

          <Route path="timer" element={<Timer />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Index;
