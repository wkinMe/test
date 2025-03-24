export interface Material {
    "type": "list" | "pipe" | "fix",
    "name": string,
    "material": string,
    "unit": string,
    "width": number,
    "price": number
}

export type Pipe = Omit<Material, "material">
export type Fix = Omit<Material, "width" | "material">