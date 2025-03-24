import { ChangeEvent, useState } from 'react'
import data from "./data/data.json";
import config from "./data/config.json";
import './App.css'

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

  const [selectedListId, setSelectedListId] = useState(0);
  const [selectedPipeId, setSelectedPipeId] = useState(0);
  const [selectedStrengthId, setStrengthId] = useState(0);


  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.dataset.type;
    const value = e.target.value;

    switch(type) {
      case "pipe": {
        const selectedPipe = pipes.find(i => i.name == value)!;
        const selectePipeIndex = pipes.indexOf(selectedPipe);
        setSelectedPipeId(selectePipeIndex);
        break;
      }
      case "list": {
        const selectedList = lists.find(i => i.name == value)!;
        const selectedListId = lists.indexOf(selectedList);
        setSelectedListId(selectedListId);
        break;
      }
      case "strength": {
        const selectedStrength = strengths.find(i => i.name == value)!;
        const selectedListId = strengths.indexOf(selectedStrength);
        setStrengthId(selectedListId);
        break;
      }
    }
  }

  return (
    <>
      <select onChange={handleSelect} data-type="pipe">
        {pipes.map(i => <option value={i.name}>{i.name}</option>)}
      </select>
      <select onChange={handleSelect} data-type="list">
        {lists.map(i => <option value={i.name}>{i.name}</option>)}
      </select>
      <input type="number" max={sizes.width?.max} min={sizes.width?.min}/>
      <input type="number" max={sizes.length?.max} min={sizes.length?.min}/>
      <select onChange={handleSelect} data-type="strength">
        {strengths.map(i => <option value={i.name}>{i.name}</option>)}
      </select>
    </>
  )
}

export default App
