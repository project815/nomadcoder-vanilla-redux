import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

//counterModifier가 return하는 값이 countStore의 state가 된다.
//reducer(counterModifier)에 값을 보내는 방법은 dispatch를 이용한다.
const countModifier = (count = 0, action) => {
  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // }
  // return count;
  //switch문을 이용하면 위의 if문을 아래와 같이 간단하게 표현할 수 있다.
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

//what is reducer? reducer is a function that modifies the data.
const countStore = createStore(countModifier);

//Actions must be plain objects.
//Actions may not have an undefined "type" property.
//dispatch를 통해 reducer에 값을 보낼 때는 object를 보내야 하며, type이라는 property가 있어야 한다.
add.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));

const onChange = () => {
  console.log(countStore.getState());
  number.innerHTML = countStore.getState();
};

countStore.subscribe(onChange);
