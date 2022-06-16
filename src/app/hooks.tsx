import { useState } from "react";

interface inputProps {
  value: any;
  onChange: (e: any) => void;
};

export const useInput = (initialValue):[inputProps, () => void] => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};
