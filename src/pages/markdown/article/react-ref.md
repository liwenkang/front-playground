## react-ref 还没用过的特性

    为啥不会重新触发渲染? 谁会触发重新渲染? useState()

```js
// https://github.com/facebook/react/issues/14387#issuecomment-493676850
// 这样就不会触发了重新 render 了
function useRef(initialValue) {
  const [ref, ignored] = useState({ current: initialValue });
  return ref;
}
```

```tsx
// 用于清除定时器
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

```js
// 用于传递 ref
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
