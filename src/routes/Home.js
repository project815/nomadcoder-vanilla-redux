import React, { useState } from "react";

function Home() {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    console.log("text : ", text);
    setText("");
  }
  return (
    <>
      <h1>To do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange}></input>
        <button type="submit">Add</button>
      </form>

      <ul></ul>
    </>
  );
}
export default Home;
