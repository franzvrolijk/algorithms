import Element from "./Element";

export const createElementArray = (n: number) => {
  return Array.from(".".repeat(n)).map(() => new Element(Math.round(Math.random() * 100)));
};

export const colors: { [key: string]: string } = {
  light: "#f1dedeff",
  turquoise: "#84dcc6ff",
  dark: "#141c28ff",
  red: "#fa5256ff",
  peach: "#fe938cff",
  green: "#52ff55",
};
