let _Component = null;
let _root = null;
let _hooks = null;

export const render =
  (hooks) =>
  (Component = _Component, root = _root) => {
    if (JSON.stringify(hooks) === _hooks) {
      return; // 简单的判断是否需要重新渲染
    } else {
      _hooks = JSON.stringify(hooks);
    }

    // 去掉root中的已经渲染的内容
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    const Comp = reconcile(Component, root);
    _Component = Component;
    _root = root;
    const dom = createDom(Comp);

    // mount 新的dom
    root.appendChild(dom);
  };

// 递归调用创建DOM
export function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  const props = fiber.props || {};

  updateDom(dom, {}, props);

  if (props.children) {
    props.children.forEach((child) => {
      // 递归
      if (Array.isArray(child)) {
        child.forEach((c) => {
          dom.appendChild(createDom(c));
        });
      } else {
        dom.appendChild(createDom(child));
      }
    });
  }
  return dom;
}

const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

function updateDom(dom, prevProps, nextProps) {
  // 去掉event listener
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // 移除之前不用的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });
  // 添加新的属性 设置修改的属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
  // 添加event listener
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

// 递归 调和
export function reconcile(Component, root) {
  if (Array.isArray(Component)) {
    return Component.map((child) => reconcile(child, root));
  }

  const type = Component.type;
  const Comp = typeof type === "string" ? Component : type();

  if (Comp.props && Comp.props.children) {
    Comp.props.children.forEach((child, idx) => {
      if (typeof child.type !== "string") {
        // 子组件 递归
        Comp.props.children[idx] = reconcile(Comp.props.children[idx], root);
      }
    });
  }
  return Comp;
}
