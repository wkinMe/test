export interface Size {
    "type": string,
    "key": string,
    "name": string,
    "min": number,
    "max": number,
    "step": number
}

export type Frame = {type: "pipe"} & Pick<Size, "key" | "name" | "step">
export type Material = {type: "material"} & Pick<Size,  "key" | "name">;
export type FixParam = {type: "fix"} & Pick<Size, "key" | "name"> & {value: number}

export interface List {
    "type": string,
    "name": string,
    "material": string,
    "unit": string,
    "width": number,
    "price": number
}

export type Pipe = Pick<List, "type" | "name" | "unit" | "width" | "price">;
export type Fix = Pick<List, "type" | "name" | "unit" | "price">;