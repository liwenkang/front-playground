const request = () => {
  const url = "http://localhost:4001/cats";
  const xhr = new XMLHttpRequest();
  // 创建一个 get 请求，true 采用异步
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
    }
  };
  //发送请求
  xhr.send(null);
};

request();
