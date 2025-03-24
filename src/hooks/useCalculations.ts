import { useState } from 'react';
import { Frame, List, Pipe } from '../types';

export const useCalculations = (
  pipes: Pipe[],
  lists: List[],
  strengths: Frame[],
) => {
  const [selectedPipeName, setSelectedPipeName] = useState(pipes[0].name);
  const [selectedListName, setSelectedListName] = useState(lists[0].name);
  const [selectedStrengthName, setSelectedStrengthName] = useState(strengths[0].name);

  const calculatePipeLength = (
    width: number,
    length: number,
    step: number,
    pipeWidth: number
  ): number => {
    const pipesAcrossWidth = Math.ceil(width / (step + pipeWidth));
    const pipesAcrossLength = Math.ceil(length / (step + pipeWidth));
    const horizontalPipesLength = pipesAcrossWidth * length;
    const verticalPipesLength = pipesAcrossLength * width;
    return horizontalPipesLength + verticalPipesLength;
  };

  const calculateTotal = (
    listCount: number | null,
    pipeLength: number | null,
    screwCount: number | null
  ) => {
    if (listCount === null || pipeLength === null || screwCount === null) return 0;

    const selectedList = lists.find(i => i.name === selectedListName);
    const selectedPipe = pipes.find(i => i.name === selectedPipeName);

    const listCost = selectedList ? selectedList.price * listCount : 0;
    const pipeCost = selectedPipe ? selectedPipe.price * pipeLength : 0;
    const screwCost = screwCount * 1.1;

    return listCost + pipeCost + screwCost;
  };

  return {
    selectedPipeName,
    setSelectedPipeName,
    selectedListName,
    setSelectedListName,
    selectedStrengthName,
    setSelectedStrengthName,
    calculatePipeLength,
    calculateTotal,
  };
};