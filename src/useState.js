import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => {
  return (
    <div>
      <HookSwitcher />
    </div>
  );
};
const HookSwitcher = () => {
  const [color, setColor] = useState("white");
  const [fontSize, setFontSize] = useState(14);
  const [person, setPerson] = useState({
    firstName: "John",
    lastName: "Smith"
  });
  const handleChange = e => {
    const {
      target: { name, value }
    } = e;
    setPerson(person => {
      return { ...person, [name]: value };
    });
  };
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: color,
        fontSize: `${fontSize}px`
      }}
    >
      Hello World
      <div>
        <button onClick={() => setColor("black")}>Dark</button>
        <button onClick={() => setColor("white")}>Light</button>
        <button onClick={() => setFontSize(s => s + 2)}>Font Size +</button>
        <button onClick={() => setFontSize(s => s - 2)}>Font Size -</button>
      </div>
      <div>
        <p>Change Credentials</p>
        <input
          name="firstName"
          onChange={e => handleChange(e)}
          type="text"
          value={person.firstName}
        />
        <input
          name="LastName"
          onChange={e => handleChange(e)}
          type="text"
          value={person.lastName}
        />
        <button type="submit">OK</button>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
