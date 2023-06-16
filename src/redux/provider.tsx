"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    require("preline");
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
