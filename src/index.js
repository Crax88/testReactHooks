import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);
  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <HookCounter value={value} />
        <Notification />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>Show</button>;
  }
};

const HookCounter = ({ value }) => {
  // имитация ComponentDidMount
  useEffect(() => console.log(`Mount! Value is: ${value}`), []);
  // имитация ComponentDidUpdate
  useEffect(() => console.log(`Update!!! Value is: ${value}`));
  // имитация ComponentWillUnmount
  useEffect(() => () => console.log("Unmount! "), []);
  return <p>{value}</p>;
};
const Notification = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeOutId = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeOutId);
  }, []);
  if (visible) {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
  return null;
};
ReactDOM.render(<App />, document.getElementById("root"));
