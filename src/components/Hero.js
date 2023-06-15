import Image from "next/image";
import chain from "../../public/img/chain.png";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Hero = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  return (
    <div
      className="mt-14 px-3 md:flex md:items-center md:mt-5 lg:max-w-5xl lg:mx-auto
        xl:py-[5rem] xl:max-w-7xl"
    >
      <div className="md:flex-1">
        <h3 className="text-green-100 mb-3 text-xl xl:text-3xl xl:mb-5">
          redefining the future of tips
        </h3>
        <h1 className="font-extrabold text-3xl tracking-wider leading-relaxed xl:text-5xl xl:mb-9">
          Receive tips with Blockchain technology.
        </h1>

        {isConnected ? (
          <Link
            href="/dashboard"
            className="bg-green-500 font-bold text-gray-900 px-7 py-3 rounded-sm mt-2 inline-block xl:px-9 xl:py-4 xl:text-xl
        hover:bg-green-700 active:bg-green-500"
          >
            Dashboard
          </Link>
        ) : (
          <>
            {openConnectModal && (
              <button
                onClick={openConnectModal}
                className="bg-green-500 font-bold text-gray-900 px-7 py-3 rounded-sm mt-2 xl:mt-0 xl:px-9 xl:py-4 xl:text-xl
        hover:bg-green-700 active:bg-green-500 "
              >
                Connect Wallet
              </button>
            )}
          </>
        )}
      </div>

      <div className="mt-16 md:flex-1">
        <Image src={chain} alt="blockchain" />
      </div>
    </div>
  );
};
export default Hero;
