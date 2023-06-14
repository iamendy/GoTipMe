import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
const Navbar = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <div
      className={`bg-black/20 pt-3 pb-3 md:pt-4 md:pb-4 px-3 md:px-5 flex ${
        isConnected ? "justify-between" : "justify-center"
      } items-center
    xl:pb-9 xl:pt-9`}
    >
      <Link
        href="/"
        className={`${
          router.pathname !== "/" ? "text-white" : ""
        } font-bold text-3xl xl:text-3xl`}
      >
        GoTip<span className="text-green-400">Me</span>
      </Link>

      {isConnected && <ConnectButton />}
    </div>
  );
};
export default Navbar;
