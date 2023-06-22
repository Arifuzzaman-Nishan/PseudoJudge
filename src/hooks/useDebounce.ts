const debounce = (fn: (...args: any[]) => any, delay: number) => {
  let timeoutID: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => fn(...args), delay);
  };
};

const useDebounce = (fn: (...args: any[]) => any, delay = 500) => {
  return debounce(fn, delay);
};

export default useDebounce;
