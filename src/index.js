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
      const newTodoObj = { text: action.text, id: Date.now() };
      return [newTodoObj, ...state];
    case TO_DO_DELETE:
      const cleaned = state.filter((toDo) => toDo.id !== parseInt(action.id));
      return cleaned;
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
  console.log("paseInt id", parseInt(id));
  store.dispatch(deleteTodo(id));
};

const paintToDocs = () => {
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

//메모리 주소가 같은 위치에 있는 객체라도, 내부의 내용이 변경되면 불변성이 깨지게 됩니다.
//불변성을 유지해야 함.
//리액트 컴포넌트의 재랜더링 문제
//Redux 상태 추적 문제
//이전 상태는 그대로 유지되고, 변경 사항을 추적하고 관리하기 쉬워집니다. 상태를 직접 변경하면 예측 불가능한 버그가 발생할 수 있고, Redux의 핵심 원칙 중 하나인 "time-travel debugging"과 같은 기능을 활용할 수 없습니다.
