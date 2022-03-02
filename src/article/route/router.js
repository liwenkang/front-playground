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

let url = "https://example.com:8042/over/there?name=ferret#nose";
console.log(parseHash(url));

// {
//     pathname: 'https://example.com:8042/over/there',
//     search: 'name=ferret#nose'
// }

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

window.addEventListener("hashchange", onHashChange);
