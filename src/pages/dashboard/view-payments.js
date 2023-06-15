import Layout from "../../components/Layout";
import { useAccount } from "wagmi";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import config from "../../abi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import Link from "next/link";

const ViewPayments = () => {
  const router = useRouter();
  const { address } = useAccount();
  let toastId;

  const { data: payments, isLoading: isLoadingPayment } = useContractRead({
    address: config.address,
    abi: config.abi,
    functionName: "getTipPayments",
    overrides: { from: address },
    args: [router?.query?.add, router?.query?.id],
  });

  const { data: tipTotal } = useContractRead({
    address: config.address,
    abi: config.abi,
    functionName: "getTipTotalAmount",
    args: [router?.query?.add, router?.query?.id],
    overrides: {
      from: address,
    },
  });

  const { data: tip } = useContractRead({
    address: config.address,
    abi: config.abi,
    functionName: "getTip",
    args: [router?.query?.add, router?.query?.id],
    overrides: {
      from: address,
    },
  });

  const { config: writeConfig } = usePrepareContractWrite({
    address: config.address,
    abi: config.abi,
    functionName: "withdrawMoney",
    overrides: { from: address },
    args: [address, router.query.id],
  });

  const { write, isLoading } = useContractWrite({
    ...writeConfig,
    onSuccess() {
      toast.dismiss(toastId);
      toast.success("Withdrawal Successful 🎉", {
        id: toastId,
        duration: 5000,
      });
      router.push("/dashboard");
    },
    onError(e) {
      console.log(e);
    },
  });

  const handleWithdraw = () => {
    confirm("Are you sure?");
    write();
    toastId = toast.loading("processing..");
  };

  tip && console.log(tip);

  return (
    <Layout>
      <section className="mt-9 xl:max-w-5xl xl:mx-auto">
        <h3 className="font-bold">View Payments</h3>

        <div className="bg-transparent p-5 rounded-lg mt-5">
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
        {payments && payments.length > 0 && (
          <div className="flex flex-col space-y-4 items-center bg-gray-700 px-3 py-5 rounded-lg">
            <h2 className="font-bold text-xl"> You are killing this!🔥 </h2>
            <h3 className="font-bold">
              Raised {tipTotal && ethers.utils.formatEther(tipTotal)} ETH from{" "}
              {payments?.length} donors!
            </h3>

            {tip?.isActive ? (
              <button
                className="bg-green-500 p-3 rounded-lg hover:bg-green-800 disabled:bg-gray-800"
                onClick={handleWithdraw}
                disabled={isLoading}
              >
                Withdraw
              </button>
            ) : (
              <p className="text-red-300"> Not receiving. Funds Withdrawn </p>
            )}
          </div>
        )}

        {payments && payments.length > 0 ? (
          payments.map((payment, i) => (
            <div
              key={payment?.owner}
              className="bg-gray-700 p-5 rounded-lg mt-5"
            >
              <div className="flex justify-between items-center">
                <span>{i + 1}</span>
                <span className="font-bold">
                  {payment && ethers.utils.formatEther(payment?.amount)} ETH
                </span>
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <span className="inline-block ml-1">
                    {payment?.giver.slice(0, 5) + ".."}
                  </span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-5 bg-gray-700 mt-5= p-5 text-center rounded-lg font-bold">
            <div className=" flex flex-col justify-center items-center">
              <p className="mb-2">No payment received</p>
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
      </section>
    </Layout>
  );
};
export default ViewPayments;
