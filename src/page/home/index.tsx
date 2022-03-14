import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // @ts-ignore
    window.document.querySelector("#child").addEventListener(
      "click",
      (e) => {
        console.log("child click");
      },
      {
        capture: false,
        once: true,
      }
    );
    // @ts-ignore
    window.document.querySelector("#parent").addEventListener(
      "click",
      (e) => {
        console.log("parent click");
      },
      {
        capture: false,
        once: true,
      }
    );
    // @ts-ignore
    window.document.querySelector("#grandParent").addEventListener(
      "click",
      (e) => {
        console.log("grandParent click");
      },
      {
        capture: false,
        once: true,
      }
    );
  }, []);

  return (
    <div
      id="grandParent"
      style={{ backgroundColor: "red", width: "300px", height: "200px" }}
    >
      <div
        id="parent"
        style={{ backgroundColor: "blue", width: "300px", height: "100px" }}
      >
        <div
          id="child"
          style={{ backgroundColor: "orange", width: "300px", height: "50px" }}
        >
          Home
        </div>
      </div>
    </div>
  );
};

export default Home;
