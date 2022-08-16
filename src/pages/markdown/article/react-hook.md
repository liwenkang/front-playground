## uncommon react hook

From:
[React Hooks: The Deep Cuts ](https://css-tricks.com/react-hooks-the-deep-cuts/)

### useReducer

I think the `useReducer` is just like you use `redux` in your single component

```js
import { useReducer } from 'react';
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'USER_INPUT':
      return { ...state, userInput: action.payload };
    case 'TOGGLE_COLOR':
      return { ...state, color: !state.color };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    userInput: '',
    color: false,
  });

  // it's very similar with the following code in class component,but you can't change data by using `this.setState()`,just like in `redux`, you need to dispatch an action to change data

  //   this.state = {
  //     count: 0,
  //     userInput: '',
  //     color: false,
  //   }

  return (
    <main
      className='App, App-header'
      style={{ color: state.color ? '#000' : '#FF07FF' }}
    >
      <input
        style={{ margin: '2rem' }}
        type='text'
        value={state.userInput}
        onChange={(e) =>
          dispatch({ type: 'USER_INPUT', payload: e.target.value })
        }
      />
      <br />
      <br />
      <p style={{ margin: '2rem' }}>{state.count}</p>
      <section style={{ margin: '2rem' }}>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => dispatch({ type: 'TOGGLE_COLOR' })}>
          Color
        </button>
      </section>
      <br />
      <br />
      <p style={{ margin: '2rem' }}>{state.userInput}</p>
    </main>
  );
}
export default App;
```

### useRef
