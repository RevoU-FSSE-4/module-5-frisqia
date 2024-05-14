import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Dashboard from "./Dashboard";
Dashboard;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </div>
  );
}
