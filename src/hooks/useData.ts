import data from "../data/data.json";
import { Fix, List, Pipe } from "../types";

export const useData = () => {
  const pipes = data.filter(i => i.type === "pipe") as Pipe[];
  const lists = data.filter(i => i.type === "list") as List[];
  const fixes = data.filter(i => i.type === "fix") as Fix[];

  return { pipes, lists, fixes };
};