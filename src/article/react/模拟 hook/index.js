import "./styles.css";
import React from "./react";

const h = React.createElement;

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("HZFE");

  React.useEffect(() => {
    console.log("msg in effect");
  }, [text]);

  return h("div", {}, [
    h("h2", {}, count),
    h("button", { onClick: () => setCount(count + 1) }, "Add"),
    h("button", { onClick: () => setCount(count - 1) }, "Sub"),
    h("div", {}, [
      h("input", { value: text, onInput: (e) => setText(e.target.value) }),
      h("p", {}, text),
    ]),
  ]);
}

React.render(h(Component), document.getElementById("app"));
