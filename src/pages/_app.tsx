import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { client, chains } from "../wagmi";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme()}
      >
        <NextHead>
          <title>GoTipMe | Decentralized tips</title>
        </NextHead>
        <Toaster />
        {mounted && <Component {...pageProps} />}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
