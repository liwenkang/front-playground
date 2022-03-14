/**
 * 解析 hash
 * @param hash
 * @returns
 */
function parseHash(hash) {
  // 去除 # 号
  hash = hash.replace(/^#/, "");

  // 简单解析示例
  const parsed = hash.split("?");

  // 返回 hash 的 path 和 query
  return {
    pathname: parsed[0],
    search: parsed[1],
  };
}

/**
 * 监听 hash 变化
 * @returns
 */
function onHashChange() {
  // 解析 hash
  const { pathname, search } = parseHash(window.location.hash);

  // 切换页面内容
  switch (pathname) {
    case "/home":
      document.body.innerHTML = `Hello ${search}`;
      return;
    default:
      return;
  }
}

// 监听 hashchange 事件,当 pathname 发生变化的时候,修改页面内容

// 优点
// 1.兼容性最佳。
// 2.无需服务端配置。

// 缺点
// 1. 服务端无法获取 hash 部分内容。
// 2. 可能和锚点功能冲突。
// 3. SEO 不友好。
window.addEventListener("hashchange", onHashChange);
