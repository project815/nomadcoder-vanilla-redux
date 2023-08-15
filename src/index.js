//2
import { createStore } from "redux";

const TO_DO_ADD = "TO_DO_ADD";
const TO_DO_DELETE = "TO_DO_DELETE";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

//Redux Three Principles
//1. Single source of truth
//2. State is read-only
//3. Changes are made with pure functions

//store의 값(reducer의 state값)을 변경하기 위해서는 반드시 dispatch를 통해 action을 전달해야 한다.
//state를 변경하는 것이 아니라 새로운 state를 만들어서 return한다.

// const createToDo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const addToDo = (text) => {
  return { type: TO_DO_ADD, text: text };
};
const deleteTodo = (id) => {
  return { type: TO_DO_DELETE, id: id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case TO_DO_ADD:
      return [...state, { text: action.text, id: Date.now() }];
    case TO_DO_DELETE:
      state.forEach((toDo) => {
        if (toDo.id === action.id) {
          console.log(toDo.id, action.id);
          document.getElementById(toDo.id).remove();
        }
      });
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch(deleteTodo(id));
};

const paintToDocs = () => {
  console.log("실행");
  const toDos = store.getState();

  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerHTML = "DEL";
    btn.type = "button"; //button type을 지정하지 않으면 submit으로 인식되어 form의 submit이 실행된다.
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerHTML = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDocs);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
