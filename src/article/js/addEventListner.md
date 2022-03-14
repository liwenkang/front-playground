1. addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void

```html
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
```

1. 第三个参数默认是 false,即默认使用事件冒泡时,触发顺序是里向外 child => parent => grandParent

```html
<script>
  window.document.querySelector("#child").addEventListener("click", (e) => {
    console.log("child click");
  });
  window.document.querySelector("#parent").addEventListener("click", (e) => {
    console.log("parent click");
  });
  window.document
    .querySelector("#grandParent")
    .addEventListener("click", (e) => {
      console.log("grandParent click");
    });
</script>
```

2. 第三个参数默认是 true 时,在捕获阶段设置处理程序,触发顺序是外向里 grandParent => parent => child

```html
<script>
  window.document.querySelector("#child").addEventListener(
    "click",
    (e) => {
      console.log("child click");
    },
    true
  );
  window.document.querySelector("#parent").addEventListener(
    "click",
    (e) => {
      console.log("parent click");
    },
    true
  );
  window.document.querySelector("#grandParent").addEventListener(
    "click",
    (e) => {
      console.log("grandParent click");
    },
    true
  );
</script>
```

1. stopPropagation 是只能阻止事件冒泡至其父节点
2. stopImmediatePropagation 既能阻止事件冒泡至父节点，也能阻止当前节点上其他同类型事件的触发(比如一个 dom 上,绑定了两个 click 事件,如果在第一个 click 事件上调用 stopImmediatePropagation,则第二个 click 事件不会被触发)
