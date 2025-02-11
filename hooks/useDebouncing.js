import { useEffect, useState } from "react";

export default function useDebouncing(value, delay) {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]); // Only triggers if value or delay change

  return debounceValue;
}
