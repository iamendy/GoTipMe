import Layout from "../components/Layout";
import Image from "next/image";
import eth from "../../public/img/eth.png";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";
import config from "../abi";
import { ethers } from "ethers";
import { useState } from "react";
import toast from "react-hot-toast";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useRouter } from "next/router";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const GiveTip = () => {
  let toastId;
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();

  const {
    data: tip,
    isLoading: isLoadingTip,
    refetch,
  } = useContractRead({
    address: config.address,
    abi: config.abi,
    functionName: "getTip",
    args: [router?.query?.add, router?.query?.tipId],
  });

  const { config: conf } = usePrepareContractWrite({
    address: config.address,
    abi: config.abi,
    functionName: "giveTip",
    overrides: {
      from: address,
      value: ethers.utils.parseEther(amount || "0"),
    },
    args: [tip?.owner, tip?.id?.toNumber()],
  });

  const { isLoading, data, write } = useContractWrite(conf);

  useWaitForTransaction({
    hash: data?.hash,
    confirmations: 2,
    onSuccess() {
      setIsSuccess(true);
      setAmount("");
      toast.dismiss(toastId);
      toast.success("Thanks for your tip 🎉", { id: toastId, duration: 5000 });
    },
  });

  const handleAmount = (e) => {
    setAmount(e.target.value);
    refetch?.();
  };

  const handleGift = () => {
    toastId = toast.loading("processing..");
    write?.();
  };
  tip && console.log(tip);
  return (
    <Layout>
      <div className="mt-20">
        {isSuccess && (
          <Confetti
            numberOfPieces={500}
            recycle={false}
            width={width}
            height={height}
          />
        )}

        {tip && tip.title ? (
          <div className="bg-gray-700 p-5 xl:p-12 xl:max-w-3xl xl:mx-auto mt-28 rounded-lg">
            <h3 className="font-bold text-5xl">{tip?.title}</h3>{" "}
            <p className="mt-5 xl:text-lg xl:w-[60%]">{tip?.description}</p>
            <div className="mt-9 mb-3 flex items-center">
              <Image src={eth} alt="eth" className="w-6 h-6" />
              <span className="font-bold text-lg">
                {tip && ethers?.utils?.formatEther(tip?.maxAmount)}
              </span>
            </div>
            {tip.isActive ? (
              <div className="flex flex-col space-y-7 xl:w-[60%]">
                <input
                  type="text"
                  placeholder="Enter Amount (ETH)"
                  className="w-full p-3 rounded-lg focus:border-green-300 text-gray-900"
                  onChange={(e) => handleAmount(e)}
                  value={amount}
                />

                <button
                  className="px-5 py-3 bg-green-500 text-white rounded-lg shadow-sm w-fit focus-within:outline-none disabled:bg-gray-500"
                  onClick={() => handleGift()}
                  disabled={isLoading}
                >
                  Give Tip 🪄
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-7 xl:w-[60%]">
                <p className="text-red-500">
                  Oops! This user is no longer receiving tips
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 bg-gray-700 mt-5= p-5 text-center rounded-lg font-bold">
            <div className=" flex flex-col justify-center items-center">
              <p className="mb-2">Oops! We cannot find this Tip.</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-24 h-24"
              >
                <path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" />
                <path
                  fillRule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z"
                  clipRule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default GiveTip;
