import React, { ChangeEvent } from 'react';
import { Frame, List, Pipe, Size } from '../types';

interface SettingsProps {
  pipes: Pipe[];
  lists: List[];
  strengths: Frame[];
  selectedPipeName: string;
  selectedListName: string;
  selectedStrengthName: string;
  onHandleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onHandleClick: () => void;
  sizes: { width: Size; length: Size };
  widthRef: React.RefObject<HTMLInputElement | null>; // Ref для ширины
  lengthRef: React.RefObject<HTMLInputElement | null>; // Ref для длины
}

const Settings: React.FC<SettingsProps> = ({
  pipes,
  lists,
  strengths,
  selectedPipeName,
  selectedListName,
  selectedStrengthName,
  onHandleSelect,
  onHandleClick,
  sizes,
  widthRef,
  lengthRef,
}) => {
  return (
    <div className="settings">
      <label htmlFor="pipe-select">Труба:</label>
      <select
        id="pipe-select"
        value={selectedPipeName}
        onChange={onHandleSelect}
        data-type="pipe"
      >
        {pipes.map((pipe) => (
          <option key={pipe.name} value={pipe.name}>
            {pipe.name}
          </option>
        ))}
      </select>

      <label htmlFor="list-select">Лист:</label>
      <select
        id="list-select"
        value={selectedListName}
        onChange={onHandleSelect}
        data-type="list"
      >
        {lists.map((list) => (
          <option key={list.name} value={list.name}>
            {list.name}
          </option>
        ))}
      </select>

      <label htmlFor="strength-select">Прочность каркаса:</label>
      <select
        id="strength-select"
        value={selectedStrengthName}
        onChange={onHandleSelect}
        data-type="strength"
      >
        {strengths.map((strength) => (
          <option key={strength.name} value={strength.name}>
            {strength.name}
          </option>
        ))}
      </select>

      <label htmlFor="width-input">Ширина:</label>
      <input
        id="width-input"
        type="number"
        ref={widthRef}
        max={sizes.width.max}
        min={sizes.width.min}
        placeholder="Ширина"
        required
      />

      <label htmlFor="length-input">Длина:</label>
      <input
        id="length-input"
        type="number"
        ref={lengthRef}
        max={sizes.length.max}
        min={sizes.length.min}
        placeholder="Длина"
        required
      />

      <button onClick={onHandleClick}>Рассчитать</button>
    </div>
  );
};

export default Settings;