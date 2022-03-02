import React, { useState } from "react";

const XMLHttpRequestPage = () => {
  const [getResponse, setGetResponse] = useState<string>("{}");

  const get = () => {
    const request = () => {
      const url = "http://localhost:4001/cats";
      const xhr = new XMLHttpRequest();
      // 创建一个 get 请求，true 采用异步
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = xhr.responseText;
            setGetResponse(data);
          }
        }
      };
      //发送请求
      xhr.send(null);
    };

    request();
  };

  return (
    <>
      <div
        onClick={() => {
          get();
        }}
      >
        点击发送get请求
      </div>
      {getResponse}
    </>
  );
};

export default XMLHttpRequestPage;
