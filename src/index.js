import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count = 0, action) => {
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  }
  return count;
};

//what is reducer? reducer is a function that modifies the data.
const countStore = createStore(countModifier);

add.addEventListener("click", () => countStore.dispatch({ type: "ADD" }));
minus.addEventListener("click", () => countStore.dispatch({ type: "MINUS" }));

const onChange = () => {
  console.log(countStore.getState());
  number.innerHTML = countStore.getState();
};

countStore.subscribe(onChange);
