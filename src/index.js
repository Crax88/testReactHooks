import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const MyContext = React.createContext();

const App = () => {
  return (
    <div className="div">
      <MyContext.Provider value="Hello World">
        <Child />
      </MyContext.Provider>
    </div>
  );
};

const Child = () => {
  return (
    <MyContext.Consumer>
      {value => {
        return <p>{value}</p>;
      }}
    </MyContext.Consumer>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
