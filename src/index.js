//2
import { createStore } from "redux";

const TO_DO_ADD = "TO_DO_ADD";
const TO_DO_DELETE = "TO_DO_DELETE";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const reducer = (state = [], action) => {
  console.log(action.type, action.text);
  switch (action.type) {
    case TO_DO_ADD:
      return [];
    case TO_DO_DELETE:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

const createToDo = (toDo) => {
  const li = document.createElement("li");
  li.innerText = toDo;
  ul.appendChild(li);
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";

  store.dispatch({ type: TO_DO_ADD, text: toDo });

  createToDo(toDo);
};

form.addEventListener("submit", onSubmit);
