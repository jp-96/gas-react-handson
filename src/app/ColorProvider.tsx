import React, { createContext, useState, useContext } from "react";
//import colorData from "./color-data.json";
import { v4 } from "uuid";
import Sheetdata from "../api/sheetdata";
import { useGetSheetData } from './hooks';

type ColorContextType = {
  colors: Sheetdata.color[];
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
  const { loading, error, colors, setColors } = useGetSheetData();

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

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );

}
