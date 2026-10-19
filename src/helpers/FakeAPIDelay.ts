/**
 * Creates an aritifical delay in execution to simulate API latency.
 * @param delay - The delay time in milliseconds (Defaults to 1000ms)
 * @returns A Promise that resolves after the specified delay.
 */
export const fetchDelay = (delay = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

