import Layout from "../../components/Layout";
import { useAccount } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import Link from "next/link";
import config from "../../abi";
import { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import toast from "react-hot-toast";

const AddNewTip = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { address } = useAccount();
  let toastId;

  const { config: writeConfig } = usePrepareContractWrite({
    address: config.address,
    abi: config.abi,
    functionName: "createNewTip",
    overrides: { from: address },
    args: [title, description, amount],
  });

  const { write, isLoading } = useContractWrite({
    ...writeConfig,
    onSuccess() {
      toast.dismiss(toastId);
      toast.success("Tip Created 🎉", { id: toastId, duration: 5000 });
      router.push("/dashboard");
    },
    onError(e) {
      console.log(e);
    },
  });

  const handleAmount = (e) => {
    e.target.value !== ""
      ? setAmount(ethers.utils.parseEther(e.target.value, "ether").toString())
      : "0";
  };

  const handleCreate = () => {
    toastId = toast.loading("processing..");
    write();
  };

  return (
    <Layout>
      <section className="mt-9 xl:max-w-5xl xl:mx-auto">
        <h3 className="font-bold">Create New Tip</h3>

        <div className="bg-transparent p-5 rounded-lg mt-5 ">
          <div className="flex justify-between items-center">
            <Link
              href="/dashboard"
              className="flex items-center cursor-pointer justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>

              <span className="inline-block ml-3">Back</span>
            </Link>
          </div>
        </div>

        <div className="mt-5 bg-gray-700 p-5 text-center rounded-lg">
          <div className="flex flex-col space-y-7">
            <input
              type="text"
              placeholder="Enter title"
              className="w-full p-3 rounded-lg focus:border-purple-300 text-gray-900"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <input
              type="text"
              placeholder="Enter amount (ETH)"
              className="w-full p-3 rounded-lg focus:outline-green-300 text-gray-900"
              onChange={(e) => handleAmount(e)}
            />

            <textarea
              className="rounded-lg min-h-[100px] p-3 text-gray-900"
              placeholder="Give a short description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>

            <div className="flex justify-center items-center space-x-3">
              <Link
                href="/dashboard"
                className="px-5 py-3 border border-red-300 text-white rounded-lg shadow-sm w-fit"
              >
                cancel
              </Link>
              <button
                className="px-5 py-3 bg-green-500 text-white rounded-lg shadow-sm w-fit disabled:bg-gray-600"
                onClick={() => handleCreate()}
                disabled={isLoading}
              >
                Create Tip 🪄
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default AddNewTip;
