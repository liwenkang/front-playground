import { useState, useEffect } from "react";

// function Counter() {
//   const [count, setCount] = useState(0);

//   function handleAlertClick() {
//     setTimeout(() => {
//       alert("You clicked on: " + count);
//     }, 3000);
//   }
//   // 在任意一次渲染中，props和state是始终保持不变的。
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//       <button onClick={handleAlertClick}>Show alert</button>
//     </div>
//   );
// }

// 在任意一次渲染中，props和state是始终保持不变的。

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    console.log("测试2");
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
