"use client";

import { ConfigProvider } from "antd";
import { FC, ReactNode } from "react";

export const Theme: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        // https://tailwindcss.com/docs/customizing-colors
        colorPrimary: "#7e22ce", // tailwind purple-700
      },
    }}
  >
    {children}
  </ConfigProvider>
);
