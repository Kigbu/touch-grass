export const L = (...args: any) => {
  process.env.NODE_ENV === "development" && console.log(...args);
};