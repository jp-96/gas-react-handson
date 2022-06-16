import React, { createContext, useState, useContext } from "react";
import colorData from "./color-data.json";
import { v4 } from "uuid";

export interface color {
  id: string;
  title: string;
  color: string;
  rating: number;
};

type ColorContextType = {
  colors: color[];
  addColor: (title: string, color: string) => void;
  removeColor: (id: string) => void;
  rateColor: (id: string, rating: number) => void;
};

const ColorContext = createContext<ColorContextType>({
  colors: [],
  addColor: (title, color) => undefined,
  removeColor: (id) => undefined,
  rateColor: (id, rating) => undefined,
});
export const useColors = () => useContext(ColorContext);
export default function ColorProvider({ children }) {
  const [colors, setColors] = useState(colorData);

  const addColor = (title: string, color: string) =>
    setColors([
      ...colors,
      {
        id: v4(),
        rating: 0,
        title,
        color
      }
    ]);

  const rateColor = (id: string, rating: number) =>
    setColors(
      colors.map(color => (color.id === id ? { ...color, rating } : color))
    );

  const removeColor = (id: string) => setColors(colors.filter(color => color.id !== id));

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
}
