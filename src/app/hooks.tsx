import { useEffect, useState } from "react";
import Sheetdata from '../api/sheetdata';
import { GASClient } from 'gas-client';
const { serverFunctions } = new GASClient();

interface inputProps {
  value: any;
  onChange: (e: any) => void;
};

export const useInput = (initialValue): [inputProps, () => void] => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};

export const useGetSheetData = (): { loading: boolean, error: any, colors: Sheetdata.color[], setColors: React.Dispatch<React.SetStateAction<Sheetdata.color[]>> } => {
  const emptyColors: Sheetdata.color[] = [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [colors, setColors] = useState(emptyColors);

  useEffect(() => {
    serverFunctions.getData()
      .then(sheetData => setColors(sheetData.colors))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return {
    loading, error, colors, setColors,
  }
} 