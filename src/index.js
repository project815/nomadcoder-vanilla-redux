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
      return [...state, { text: action.text, id: Date.now() }];
    case TO_DO_DELETE:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

//Redux Three Principles
//1. Single source of truth
//2. State is read-only
//3. Changes are made with pure functions

//store의 값(reducer의 state값)을 변경하기 위해서는 반드시 dispatch를 통해 action을 전달해야 한다.
//state를 변경하는 것이 아니라 새로운 state를 만들어서 return한다.

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

  console.log(store.getState());
  createToDo(toDo);
};

form.addEventListener("submit", onSubmit);
