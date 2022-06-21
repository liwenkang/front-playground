## react-ref

[react ref 前世今生](https://dev.to/this-is-learning/react-refs-the-complete-story-16km)

为啥不会重新触发渲染?跟 ref 的实现有关

```tsx
// https://github.com/facebook/react/issues/14387#issuecomment-493676850
// 这样就不会触发了重新 render 了
function useRef(initialValue) {
  const [ref, ignored] = useState({ current: initialValue });
  return ref;
}
```

谁会触发重新渲染? useState()

ref 的用途: 用于清除定时器

```tsx
import React from 'react';
export default () => {
  const dataRef = React.useRef(0);

  const [timerVal, setTimerVal] = React.useState(0);

  React.useEffect(() => {
    dataRef.current = setInterval(() => {
      setTimerVal((tVal) => tVal + 1);
    }, 1000);

    return () => clearInterval(dataRef.current);
  }, [dataRef]);

  return <div>{timerVal}</div>;
};
```

向组件传递 ref 时,用 forwardRef() 包裹

```tsx
const Container = React.forwardRef((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});

const App = () => {
  const elRef = React.useRef();

  React.useEffect(() => {
    console.log(elRef);
    elRef.current.style.background = 'lightblue';
  }, [elRef]);

  return <Container ref={elRef} />;
};
```

一个注意点: ref.current 不要放在 useEffect 的依赖数组里面,将会出错,use callback
ref instead

一个展示 ref.current 放在 useEffect 的依赖数组里面的例子

```tsx
import React from 'react';
import './style.css';

export default function App() {
  const [minus, setMinus] = React.useState(0);
  const ref = React.useRef(0);

  const addState = () => {
    setMinus(minus + 1);
  };

  const addRef = () => {
    ref.current = ref.current + 1;
  };

  // 不会按照预期更新
  React.useEffect(() => {
    console.log(`ref.current:`, ref.current);
  }, [ref.current]);

  React.useEffect(() => {
    console.log(`minus:`, minus);
  }, [minus]);

  return (
    <div>
      <h1>useState</h1>
      <p>Num: {minus}</p>
      <button onClick={addState}>Add</button>
      <h1>useRef</h1>
      <p>Num: {ref.current}</p>
      <button onClick={addRef}>Add</button>
    </div>
  );
}
```

正确使用 ref 监听的例子: 通过触发 state 更新,从而监听 state

```tsx
import React from 'react';
import './style.css';

export default function App() {
  const [shouldRender, setRender] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 100);
  }, []);

  const [elNode, setElNode] = React.useState();

  const elRefCB = React.useCallback((node) => {
    // use ref callback, 使得 state 更新
    if (node !== null) {
      setElNode(node);
    }
  }, []);

  React.useEffect(() => {
    if (!elNode) return;
    elNode.style.background = 'lightblue';
  }, [elNode]); // 监听 state,从而监听 ref

  return !shouldRender ? null : (
    <div ref={elRefCB}>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
```
