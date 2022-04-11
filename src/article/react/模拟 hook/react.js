import { render } from "./render";

const React = (function () {
  let memoizedState = [];
  let cursor = 0;

  function useState(initialValue) {
    let state = memoizedState[cursor] ?? initialValue;

    const _cursor = cursor;

    const setState = (newValue) => (memoizedState[_cursor] = newValue);

    cursor += 1;

    return [state, setState];
  }

  function useEffect(cb, depArray) {
    const oldDeps = memoizedState[cursor];
    let hasChange = true;
    if (oldDeps) {
      hasChange = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if (hasChange) cb();
    memoizedState[cursor] = depArray;
    cursor++;
  }

  function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) =>
          typeof child === "object" ? child : createTextElement(child)
        )
      }
    };
  }

  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
  }

  function workLoop() {
    cursor = 0;
    render(memoizedState)();
    requestIdleCallback(workLoop);
  }
  requestIdleCallback(workLoop);

  return { useState, useEffect, createElement, render: render(memoizedState) };
})();

export default React;
