import React from 'react';
import { Fix, List, Pipe } from '../types';

interface OutputProps {
  selectedListName: string;
  selectedPipeName: string;
  listCount: number | null;
  pipeLength: number | null;
  screwCount: number | null;
  total: number;
  pipes: Pipe[];
  lists: List[];
  screw: Fix;
}

const Output: React.FC<OutputProps> = ({
  selectedListName,
  selectedPipeName,
  listCount,
  pipeLength,
  screwCount,
  total,
  pipes,
  lists,
  screw,
}) => {
  return (
    <div className="output">
      <table>
        <caption>Корзина</caption>
        <tbody>
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
            <td>Труба ({pipes.find(i => i.name === selectedPipeName)?.name})</td>
            <td>м</td>
            <td>{pipeLength !== null ? pipeLength.toFixed(2) : '-'}</td>
            <td>
              {pipeLength !== null
                ? (Number(pipes.find(i => i.name === selectedPipeName)?.price) * pipeLength).toFixed(2)
                : '-'}
            </td>
          </tr>
          <tr>
            <td>Саморезы</td>
            <td>шт.</td>
            <td>{screwCount !== null ? screwCount.toFixed(2) : '-'}</td>
            <td>
              {screwCount !== null && screw && (screw.price * screwCount).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="total">Итог: {total.toFixed(2)} ₽</div>
    </div>
  );
};

export default Output;