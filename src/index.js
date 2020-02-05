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
        <PlanetInfo id={value} />
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
const PlanetInfo = ({ id }) => {
  const [planetName, setPlanetName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`https://swapi.co/api/planets/${id}/`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        const name = data.name || "Not found";
        !cancelled && setPlanetName(name);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    return () => (cancelled = true);
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return (
    <div>
      {id} - {planetName}
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
