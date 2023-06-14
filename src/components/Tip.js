import { ethers } from "ethers";
import Link from "next/link";
import { useContractRead } from "wagmi";
import config from "../abi";
import { useAccount } from "wagmi";
import { useState } from "react";

const Tip = ({ tip }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { address } = useAccount();
  const { isLoading } = useContractRead({
    address: config.address,
    abi: config.abi,
    functionName: "getTipTotalAmount",
    args: [address, tip?.id],
    overrides: {
      from: address,
    },
    onSuccess(d) {
      setTotalAmount(ethers.utils.formatEther(d));
    },
  });

  return (
    <div
      key={tip.id}
      className={`${
        tip?.isActive ? "" : "border-red-300 border-2"
      } bg-gray-700 mt-5 p-5 rounded-lg font-bold relative`}
    >
      <span className="absolute top-4 right-4 bg-green-700 text-xs p-2 rounded-full shadow-sm">
        {tip && ethers.utils.formatEther(tip?.maxAmount)} ETH
      </span>

      <span className="absolute top-4 right-20 bg-green-700 text-xs p-2 rounded-full shadow-sm">
        {totalAmount} ETH
      </span>

      <h4 className="text-green-500">Title</h4>
      <p>{tip?.title}</p>
      <h4 className="text-green-500">Description</h4>
      <p>{tip?.description}</p>

      <div className="flex justify-between">
        <Link href={`${tip?.isActive ? `/tip/${tip.id}` : ``}`} target="_blank">
          <div className="flex items-center bg-gray-900 rounded-lg w-fit mt-2 p-3">
            Visit link
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </div>
        </Link>

        <Link href={`/tip/${tip?.id}/donors`}>
          <div className="flex items-center bg-green-600 rounded-lg w-fit mt-2 p-3">
            See Donors
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Tip;
