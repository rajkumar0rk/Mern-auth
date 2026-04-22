import type { NavigateFunction, NavigateOptions } from "react-router";

let navigator: NavigateFunction | null = null;

export const setNavigator = (fn: NavigateFunction) => {
  navigator = fn;
};

export const navigateTo = (to: string, options?: NavigateOptions) => {
  if (!navigator) {
    console.log("navigator is unavailable!");
    return;
  }
  navigator(to, options);
};
