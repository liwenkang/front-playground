import { useEffect, useState } from "react";
import axios from "axios";
import type { CatDTO, CatsDTO } from "./cat.interface";

const ReactQuery = () => {
  // get 带参数
  // post form-data
  // post json
  // post 文件上传

  const [cats, setCats] = useState<CatsDTO>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");

  const getCats = () => {
    axios.get("/cats").then((response) => {
      if (response.data.code === 1) {
        setCats(response.data.data);
      }
    });
  };

  const addCat = () => {
    axios
      .post("/cats", {
        name,
        age,
        breed,
      })
      .then((response) => {
        if (response.data.code === 1) {
          getCats();
          setAge("");
          setBreed("");
          setName("");
        }
      });
  };

  const deleteCat = (id: string) => {
    axios.delete("/cats/" + id).then((response) => {
      if (response.data.code === 1) {
        getCats();
      }
    });
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <div>
      <div>数据展示</div>
      <div>
        {cats.map((item: CatDTO) => (
          <div key={item._id} style={{ margin: "10px" }}>
            <div>id: {item._id}</div>
            <div>name: {item.name}</div>
            <div>age: {item.age}</div>
            <div>breed: {item.breed}</div>
            <button
              onClick={() => {
                deleteCat(item._id);
              }}
            >
              删除
            </button>
          </div>
        ))}
      </div>

      <div>添加数据</div>
      <div>
        <span>
          Enter your name:
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </span>
      </div>
      <div>
        <span>
          Enter your age:
          <input
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </span>
      </div>
      <div>
        <span>
          Enter your breed:
          <input
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          />
        </span>
      </div>
      <button
        onClick={() => {
          addCat();
        }}
        style={{ border: "1px", color: "yellow" }}
      >
        新增
      </button>
    </div>
  );
};

export default ReactQuery;
