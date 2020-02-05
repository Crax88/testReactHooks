import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);
  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <ClassCounter value={value} />
        <HookCounter value={value} />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>show</button>;
  }
};

class ClassCounter extends Component {
  componentDidMount() {
    console.log("ClassCounter: mount");
  }
  componentDidUpdate() {
    console.log("ClassCounter: update");
  }
  componentWillUnmount() {
    console.log("ClassCounter: unmount");
  }
  render() {
    return <p>{this.props.value}</p>;
  }
}

const HookCounter = ({ value }) => {
  useEffect(() => {
    console.log("useEffect");
    return () => console.log("clear");
  }, [value]); //если передать пустой массив сработает только 1 раз === componentDidMount
  return <p>{value}</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
