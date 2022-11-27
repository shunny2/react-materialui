import { useCallback, useRef } from 'react';

/**
 * This hook is responsible for preventing many database queries.
 * @param delay number
 * @param notDelayInFirstTime boolean
 * @returns void
 */
export const useDebounce = (delay = 1000, notDelayInFirstTime = true) => {
  const isFirstTime = useRef(notDelayInFirstTime);
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback((func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    } else {
      // If there is already a debouncing (function) registered, and it is executed again, cancel the timeout and add another timeout that waits for 1s.
      if (debouncing.current)
        clearTimeout(debouncing.current);

      debouncing.current = setTimeout(() => func(), delay);
    }
  }, [delay]);

  return { debounce };
};