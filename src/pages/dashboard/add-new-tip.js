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

        <div className="bg-gray-700 p-5 rounded-lg mt-5 ">
          <div className="flex justify-between items-center">
            <span className="font-bold">0.5 ETH</span>
            <span className="flex items-center justify-center">
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
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              <span className="inline-block ml-3">5</span>
            </span>
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
