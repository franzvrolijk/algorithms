import React, { useState } from "react";
import { mergeSort, quickSort, someSort } from "./Algorithms";
import "./App.css";
import Element from "./Element";
import { colors, createElementArray } from "./Utils";

var tickMs = 50;
var set: React.Dispatch<React.SetStateAction<Element[]>> = () => {};

function App() {
  let [functionName, setfunctionName] = useState("mergeSort");
  const [smoothing, setSmoothing] = useState(1);
  const [array, setArray] = useState<Element[]>(createElementArray(30));
  set = setArray;

  const run = async () => {
    if (functionName === "mergeSort") await mergeSort(array);
    else if (functionName === "quickSort") await quickSort(array);
    else if (functionName === "someSort") await someSort(array);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "space-between" }}>
      <div className="settings">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ alignItems: "center", display: "flex", flexDirection: "column",marginBottom: "2vh" }}>
            <h1 style={{ color: colors.dark, textAlign: "center" }}>Algorithm</h1>
            <select className="select" onChange={(e) => setfunctionName(e.target.value)}>
              <option value="mergeSort">Merge sort</option>
              <option value="quickSort">Quick sort</option>
              <option value="someSort">Some sort</option>
            </select>
          </div>
          <h2 style={{ color: colors.dark }}>Visualization delay</h2>
          <input
            min={0}
            max={Math.floor(Math.sqrt(1000))}
            className="input"
            defaultValue={8}
            onChange={(e) => {
              tickMs = Math.pow(e.target.valueAsNumber, 2);
            }}
            id="speed"
            type="range"
          />
          <h2 style={{ color: colors.dark }}>Number of elements</h2>
          <input
            min={2}
            max={Math.floor(Math.sqrt(300))}
            className="input"
            defaultValue={Math.sqrt(array.length)}
            onChange={(e) => {
              setArray(createElementArray(Math.pow(e.target.valueAsNumber, 2)));
            }}
            id="speed"
            type="range"
          />
          <h2>Smoothing</h2>
          <input
            min={0}
            max={9}
            className="input"
            defaultValue={smoothing}
            onChange={(e) => {
              setSmoothing(e.target.valueAsNumber);
            }}
            id="smoothing"
            type="range"
          />
        </div>
        <div>
          <button id="shuffle" className="button" onClick={(e) => set(createElementArray(array.length))}>
            Shuffle elements
          </button>
          <button className="button" onClick={async () => await run()}>
            Sort
          </button>
        </div>
      </div>
      <div style={{ display: "flex", width: "80%", marginBottom: "0px", bottom: 0, alignItems: "flex-end", height: "50vh" }}>
        {array.map((el, i) => (
          <div
            key={i}
            style={{
              border: `solid ${colors.light} 3px`,
              borderBottom: 0,
              backgroundColor: `${el.isDone ? colors.green : el.primary ? colors.red : el.secondary ? colors.turquoise : el.tertiery ? colors.peach : colors.dark}`,
              height: `${el.value / 2}vh`,
              width: `${(1 / array.length) * 100}%`,
              transition: `0.${smoothing}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export const showAndWait = async (arr: Element[]) => {
  await new Promise((r) => setTimeout(r, tickMs));
  set(Array.from(arr));
};

export default App;
