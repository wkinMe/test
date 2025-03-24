import config from "../data/config.json";
import { FixParam, Frame, Size } from "../types";

export const useParameters = () => {
  const sizes = config.filter(i => i.type === "size") as Size[];
  const strengths = config.filter(i => i.type === "frame") as Frame[];
  const fixTypes = config.filter(i => i.type === "fix") as FixParam[];

  const width = sizes.find(i => i.key === "width") as Size;
  const length = sizes.find(i => i.key === "length") as Size;

  return { sizes: { width, length }, strengths, fixTypes };
};