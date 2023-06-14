import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { fantomTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [fantomTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "GoTipMe",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains };
