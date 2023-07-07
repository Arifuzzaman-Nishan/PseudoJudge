import "../styles/globals.css";
import Layout from "@/components/Shared/Layout/Layout";
import { Outfit } from "next/font/google";
import { RootStyleRegistry } from "./lib/antd";
import ReduxProvider from "@/utils/reduxQuerySetup/reduxToolkit/ReduxProvider";
import QueryProvider from "@/utils/reduxQuerySetup/reactQuery/QueryProvider";

const outfit = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Pseudo Judge",
  description: "Pseudo Judge is a online judge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={outfit.className}>
        <RootStyleRegistry>
          <ReduxProvider>
            <QueryProvider>
              <Layout>{children}</Layout>
            </QueryProvider>
          </ReduxProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
