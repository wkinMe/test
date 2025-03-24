import React, { ChangeEvent, useRef, useState } from 'react';
import { useParameters } from './hooks/useParameters';
import { useData } from './hooks/useData';
import { useCalculations } from './hooks/useCalculations';
import Settings from './components/Settings';
import Output from './components/Output';
import './App.scss';

const App: React.FC = () => {
  const { sizes, strengths, fixTypes } = useParameters();
  const { pipes, lists, fixes } = useData();

  const {
    selectedPipeName,
    setSelectedPipeName,
    selectedListName,
    setSelectedListName,
    selectedStrengthName,
    setSelectedStrengthName,
    calculatePipeLength,
    calculateTotal,
  } = useCalculations(pipes, lists, strengths);

  // Создаем refs для ширины и длины
  const widthRef = useRef<HTMLInputElement | null>(null);
  const lengthRef = useRef<HTMLInputElement | null>(null);

  const [listCount, setListCount] = useState<number | null>(null);
  const [pipeLength, setPipeLength] = useState<number | null>(null);
  const [screwCount, setScrewCount] = useState<number | null>(null);

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

  const handleClick = () => {
    const selectedStrength = strengths.find(i => i.name === selectedStrengthName);
    const selectedPipe = pipes.find(i => i.name === selectedPipeName);
    const selectedList = lists.find(i => i.name === selectedListName);
    const screw = fixTypes.find(i => i.key === selectedList?.material);

    if (!selectedStrength || !selectedPipe || !selectedList) {
      alert("Выберите все параметры!");
      return;
    }

    const width = parseFloat(widthRef.current?.value || "0");
    const length = parseFloat(lengthRef.current?.value || "0");

    if (isNaN(width) || isNaN(length)) {
      alert("Введите корректные числовые значения для ширины и длины!");
      return;
    }

    if (width <= 0 || length <= 0) {
      alert("Ширина и длина должны быть больше нуля!");
      return;
    }

    if (width < sizes.width.min || width > sizes.width.max) {
      alert(`Ширина должна быть в диапазоне от ${sizes.width.min} до ${sizes.width.max}`);
      return;
    }

    if (length < sizes.length.min || length > sizes.length.max) {
      alert(`Длина должна быть в диапазоне от ${sizes.length.min} до ${sizes.length.max}`);
      return;
    }

    const area = width * length;
    const listCount = Math.ceil(area / selectedList.width!);
    const pipeWidth = selectedPipe.width! / 1000;
    const step = selectedStrength.step!;
    const totalPipeLength = calculatePipeLength(width, length, step, pipeWidth);
    const screwCount = screw?.value && Math.ceil(area / screw.value);

    setListCount(listCount);
    setPipeLength(totalPipeLength);
    setScrewCount(Number(screwCount));
  };

  const total = calculateTotal(listCount, pipeLength, screwCount);

  return (
    <div className="app">
      <Settings
        pipes={pipes}
        lists={lists}
        strengths={strengths}
        selectedPipeName={selectedPipeName}
        selectedListName={selectedListName}
        selectedStrengthName={selectedStrengthName}
        onHandleSelect={handleSelect}
        onHandleClick={handleClick}
        sizes={sizes}
        widthRef={widthRef}
        lengthRef={lengthRef}
      />
      <Output
        selectedListName={selectedListName}
        selectedPipeName={selectedPipeName}
        listCount={listCount}
        pipeLength={pipeLength}
        screwCount={screwCount}
        total={total}
        pipes={pipes}
        lists={lists}
        screw={fixes[0]}
      />
    </div>
  );
};

export default App;