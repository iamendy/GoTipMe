import Layout from "../../components/Layout";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";
import config from "../../abi";
import Link from "next/link";
import Tip from "../../components/Tip";

const Dashboard = () => {
  const { address, isConnected } = useAccount();

  const { data: tips, isLoading: isLoadingTips } = useContractRead({
    address: config.address,
    abi: config.abi,
    args: [address],
    functionName: "getUserTips",
    onSuccess(d) {
      console.log(d);
    },
  });

  return (
    <Layout>
      <section className="mt-9 xl:max-w-5xl xl:mx-auto">
        <h3 className="font-bold">
          Welcome, {isConnected && address.slice(0, 5)}
        </h3>

        <div className="mt-5 bg-gray-700 p-5 text-center rounded-lg font-bold">
          <p className="mb-9 w-[60%] mx-auto">
            Start receiveing tips from fans and customers
          </p>

          <Link
            href="dashboard/add-new-tip"
            className="px-5 py-3 bg-green-400 text-gray-700 rounded-lg"
          >
            Create One
          </Link>
        </div>

        {tips && tips.length > 0 ? (
          tips.reverse().map((tip) => <Tip key={tip.name} tip={tip} />)
        ) : (
          <div className="mt-5 bg-gray-700 mt-5= p-5 text-center rounded-lg font-bold">
            <div className=" flex flex-col justify-center items-center">
              <p className="mb-2">We cant find any Tips.</p>
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
export default Dashboard;
