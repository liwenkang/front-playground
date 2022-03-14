/**
 * 监听 history 变化
 * @returns
 */
function onHistoryChange() {
  // 解析 location
  const { pathname, search } = window.location;

  // 根据页面不同执行不同内容
  switch (pathname) {
    case "/home":
      document.body.innerHTML = `Hello ${search.replace(/^\?/, "")}`;
      return;
    default:
      document.body.innerHTML = `Hello World`;
      return;
  }
}

/**
 * 页面跳转
 * @returns
 */
function pushState(target) {
  history.pushState(null, "", target);
  onHistoryChange();
}

// 3 秒后路由跳转
setTimeout(() => {
  pushState("/home?name=HZFEStudio");
}, 3000);

// 6 秒后返回
setTimeout(() => {
  history.back();
}, 6000);

// 监听 popstate 事件,监听历史记录变化

// 优点
// 1. 服务端可获取完整的链接和参数。
// 2. 前端监控友好。
// 3. SEO 相对 Hash 路由友好。
// 缺点
// 1. 兼容性稍弱。
// 2. 需要服务端额外配置（各 path 均指向同一个 HTML）。

window.addEventListener("popstate", onHistoryChange);
