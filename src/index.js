import React, { useState, useEffect, useCallback, useMemo } from "react";
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

const getPlanet = id => {
  return fetch(`https://swapi.co/api/planets/${id}/`)
    .then(res => res.json())
    .then(data => data);
};
const useRequest = request => {
  //   const initialState = useMemo(
  //     () => ({
  //       data: null,
  //       loading: true,
  //       error: null
  //     }),
  //     []
  //   );
  const [data, setData] = useState({
    data: null,
    loading: true,
    error: null
  });
  useEffect(() => {
    // setData(initialState);
    let cancelled = false;
    request()
      .then(data => {
        if (!data.name) throw Error("Not Found");
        !cancelled && setData({ data, loading: false, error: null });
      })
      .catch(
        err =>
          !cancelled &&
          setData({ data: null, loading: false, error: err.message })
      );
    return () => (cancelled = true);
  }, [request]);
  return data;
};
const usePlanetInfo = id => {
  const request = useCallback(() => getPlanet(id), [id]);
  //   const request = () => getPlanet(id);
  return useRequest(request);
};
const PlanetInfo = ({ id }) => {
  const { data, loading, error } = usePlanetInfo(id);
  if (error) {
    return <div>{error || "Something wrong"}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {id} - {data && data.name}
    </div>
  );
};
// const usePlanetInfo = id => {
//   const [planetName, setPlanetName] = useState(null);
//   useEffect(() => {
//     let cancelled = false;
//     fetch(`https://swapi.co/api/planets/${id}/`)
//       .then(res => res.json())
//       .then(data => {
//         const name = data.name || "Not found";
//         !cancelled && setPlanetName(name);
//       });
//     return () => (cancelled = true);
//   }, [id]);
//   return planetName;
// };

// const PlanetInfo = ({ id }) => {
//   const name = usePlanetInfo(id);
//   return (
//     <div>
//       {id} - {name}
//     </div>
//   );
// };
// const PlanetInfo = ({ id }) => {
//   const [planetName, setPlanetName] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     fetch(`https://swapi.co/api/planets/${id}/`)
//       .then(res => res.json())
//       .then(data => {
//         setLoading(false);
//         const name = data.name || "Not found";
//         !cancelled && setPlanetName(name);
//       })
//       .catch(() => {
//         setLoading(false);
//         setError(true);
//       });
//     return () => (cancelled = true);
//   }, [id]);
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error!</div>;
//   return (
//     <div>
//       {id} - {planetName}
//     </div>
//   );
// };
ReactDOM.render(<App />, document.getElementById("root"));
