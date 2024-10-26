// This type is required by the template and should NOT be removed/changed.
export type StdinInput = {
  inputStdin: string;
  inputCursor: number;
};

export interface Substance {
  lowTemp: number;
  highTemp: number;
}

export interface Fridge {
  substances: Substance[];
  lowTemp: number;
  highTemp: number;
}
