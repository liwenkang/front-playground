Hooks 主要是利用闭包来保存状态，使用链表保存一系列 Hooks，将链表中的第一个 Hook 与 Fiber 关联。在 Fiber 树更新时，就能从 Hooks 中计算出最终输出的状态和执行相关的副作用。

使用 Hooks 的注意事项：

不要在循环，条件或嵌套函数中调用 Hooks。
只在 React 函数中调用 Hooks。
