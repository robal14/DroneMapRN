import {useRef, useEffect} from 'react';

export function useInterval(
  callback: () => void,
  delay: number | null,
  deps: unknown[] = [],
) {
  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => callback(), delay);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
}
