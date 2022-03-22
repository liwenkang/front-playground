function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert("Hello, " + name);
  }, 3000);
}

let someone = { name: "Dan" };
sayHi(someone);

someone = { name: "Yuzhi" };
sayHi(someone);

someone = { name: "Dominic" };
sayHi(someone);
