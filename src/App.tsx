import { ChangeEvent, useRef, useState } from 'react';
import data from "./data/data.json";
import config from "./data/config.json";
import './App.scss';

const calculatePipeLength = (
  width: number,
  length: number,
  step: number,
  pipeWidth: number
): number => {
  // Количество труб по ширине и длине
  const pipesAcrossWidth = Math.ceil(width / (step + pipeWidth));
  const pipesAcrossLength = Math.ceil(length / (step + pipeWidth));

  console.log(step);

  // Общая длина горизонтальных и вертикальных труб
  const horizontalPipesLength = pipesAcrossWidth * length;
  const verticalPipesLength = pipesAcrossLength * width;

  // Суммарная длина труб
  return horizontalPipesLength + verticalPipesLength;
};

// Хук для получения параметров из конфигурации
const useParameters = () => {
  const sizes = config.filter(i => i.type === "size");
  const strengths = config.filter(i => i.type === "frame");

  const width = sizes.find(i => i.key === "width");
  const length = sizes.find(i => i.key === "length");

  return { sizes: { width, length }, strengths };
};

// Хук для получения данных о трубах и листах
const useData = () => {
  const pipes = data.filter(i => i.type === "pipe");
  const lists = data.filter(i => i.type === "list");

  return { pipes, lists };
};

function App() {
  const { sizes, strengths } = useParameters();
  const { pipes, lists } = useData();

  const [selectedPipeName, setSelectedPipeName] = useState(pipes[0].name);
  const [selectedListName, setSelectedListName] = useState(lists[0].name);
  const [selectedStrengthName, setSelectedStrengthName] = useState(strengths[0].name);

  const widthRef = useRef<HTMLInputElement | null>(null);
  const lengthRef = useRef<HTMLInputElement | null>(null);

  const [listCount, setListCount] = useState<number | null>(null);
  const [pipeLength, setPipeLength] = useState<number | null> (null)

  // Обработчик выбора элементов
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.dataset.type;
    const value = e.target.value;

    switch (type) {
      case "pipe":
        setSelectedPipeName(value);
        break;
      case "list":
        setSelectedListName(value);
        break;
      case "strength":
        setSelectedStrengthName(value);
        break;
    }
  };

  // Обработчик кнопки "Count"
  const handleClick = () => {
    const selectedStrength = strengths.find(i => i.name === selectedStrengthName);
    const selectedPipe = pipes.find(i => i.name === selectedPipeName);
    const selectedList = lists.find(i => i.name === selectedListName);

    console.log(selectedStrengthName);
    
  
    if (!selectedStrength || !selectedPipe || !selectedList) {
      alert("Выберите все параметры!");
      return;
    }
  
    const width = Number(widthRef.current?.value);
    const length = Number(lengthRef.current?.value);
  
    if (!width || !length) {
      alert("Введите ширину и длину каркаса!");
      return;
    }
  
    // Расчет площади
    const area = width * length;
    const listCount = Math.ceil(area / selectedList.width!);
  
    // Расчет длины труб
    const pipeWidth = selectedPipe.width! / 1000; // Переводим мм в метры
    const step = selectedStrength.step;
    const totalPipeLength = calculatePipeLength(width, length, step!, pipeWidth);
  
    setListCount(listCount);
    setPipeLength(totalPipeLength);
  };

  return (
    <div className="app">
      <div className="settings">
        <select
          value={selectedPipeName}
          onChange={handleSelect}
          data-type="pipe"
        >
          {pipes.map(i => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
        <select
          value={selectedListName}
          onChange={handleSelect}
          data-type="list"
        >
          {lists.map(i => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
        <select
          value={selectedStrengthName}
          onChange={handleSelect}
          data-type="strength"
        >
          {strengths.map(i => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          ref={widthRef}
          max={sizes.width?.max}
          min={sizes.width?.min}
        />
        <input
          type="number"
          ref={lengthRef}
          max={sizes.length?.max}
          min={sizes.length?.min}
        />
      </div>

      <table>
  <thead>Корзина</thead>
  <th>Наименование</th>
  <th>Ед. Измерения</th>
  <th>Количество</th>
  <th>Сумма</th>
  <tr>
    <td>{selectedListName}</td>
    <td>шт.</td>
    <td>{listCount !== null ? listCount.toFixed(2) : '-'}</td>
    <td>
      {listCount !== null
        ? (Number(lists.find(i => i.name === selectedListName)?.price) * listCount).toFixed(2)
        : '-'}
    </td>
  </tr>
  <tr>
    <td>Труба ({selectedPipeName})</td>
    <td>м</td>
    <td>{pipeLength !== null ? pipeLength.toFixed(2) : '-'}</td>
    <td>
      {pipeLength !== null
        ? (Number(pipes.find(i => i.name === selectedPipeName)?.price) * pipeLength).toFixed(2)
        : '-'}
    </td>
  </tr>
</table>

      <button onClick={handleClick}>Count</button>
    </div>
  );
}

export default App;