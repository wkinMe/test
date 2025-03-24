import { ChangeEvent, useReducer, useRef, useState } from 'react'
import data from "./data/data.json";
import config from "./data/config.json";
import './App.scss'

const useParameters = () => {
  const sizes = config.filter(i => i.type == "size")
  const strengths = config.filter(i => i.type == "frame");

  const width = sizes.find(i => i.key == "width");
  const length = sizes.find(i => i.key == "length");
  
  return {sizes: {width, length}, strengths};
}

const useData = () => {
  const pipes = data.filter(i => i.type == "pipe");
  const lists = data.filter(i => i.type == "list");

  return {pipes, lists}
}

function App() {
  const {sizes, strengths} = useParameters();
  const {pipes, lists} = useData();

  const [selectedPipeName, setSelectedPipeName] = useState(pipes[0].name);
  const [selectedListName, setSelectedListName] = useState(lists[0].name);
  const [selectedStrengthName, setStrengthName] = useState(strengths[0].name);

  const widthRef = useRef<null | HTMLInputElement>(null);
  const lengthRef = useRef<null | HTMLInputElement>(null);

  const [listCount, setListCount] = useState(0);


  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.dataset.type;
    const value = e.target.value;

    switch(type) {
      case "pipe": {
        const selectedPipeName = pipes.find(i => i.name == value)?.name;
        setSelectedPipeName(selectedPipeName!);
        break;
      }
      case "list": {
        const selectedListName = lists.find(i => i.name == value)?.name;
        setSelectedListName(selectedListName!);
        break;
      }
      case "strength": {
        const selectedStrentghName = pipes.find(i => i.name == value)?.name;
        setStrengthName(selectedStrentghName!);
        break;
      }
    }
  }

  const handleClick = () => {
    const list = lists.find(i => i.name == selectedListName)!;
    const width = Number(widthRef.current?.value);
    const length = Number(lengthRef.current?.value);
    const count = Math.floor((width * length) / list.width!)

    setListCount(count);
  }

  return (
    <div className="app">
    <div className="settings">
      <select value={selectedPipeName} onChange={handleSelect} data-type="pipe">
        {pipes.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
      </select>
      <select value={selectedListName} onChange={handleSelect} data-type="list">
        {lists.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
      </select>
      <select value={selectedStrengthName} onChange={handleSelect} data-type="strength">
        {strengths.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
      </select>

      <input type="number" ref={widthRef} max={sizes.width?.max} min={sizes.width?.min}/>
      <input type="number" ref = {lengthRef} max={sizes.length?.max} min={sizes.length?.min}/>
    </div>
    <div>
    </div>
      {listCount}
      <button onClick={handleClick}>Count</button>
    </div>
  )
}

export default App
