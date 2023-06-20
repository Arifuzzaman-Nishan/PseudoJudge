const debounce = (fn: (...args: any[]) => any, delay: number) => {
  let timeoutID: NodeJS.Timeout | null = null;
  console.log("outside function calling...");
  return (...args: any[]) => {
    console.log("inside function calling...");
    if (timeoutID) {
      console.log("clearing timeout...");
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => fn(...args), delay);
  };
};

export default debounce;
