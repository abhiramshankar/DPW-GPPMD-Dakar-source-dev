import { useState, useEffect } from "react";

/**
 * Custom hook that adds a debounce functionality to a value.
 * @template T - The type of the value.
 * @param {T} value - The value to be debounced.
 * @param {number} [delay=250] - The delay in milliseconds before the value is updated.
 * @returns {T} - The debounced value.
 */
export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

