import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

function Page() {
  return (
    <>
      <SEOHead />
      <section className="">
        <div className="bg-black/90 text-white bg-[url('../../public/img/bg.png')] xl:min-h-[90%]">
          <Navbar />
          <Hero />
        </div>

        <section className="bg-black text-white pt-16 pb-5">
          <div className="w-[90%] mx-auto xl:max-w-7xl xl:mx-auto text-center">
            <h1 className="mb-10 text-center font-extrabold text-2xl xl:text-4xl text-green-400">
              Welcome to GoTipMe
            </h1>

            <div className=" px-3 text-lg leading-loose xl:max-w-[60%] xl:mx-auto space-y-5">
              <p>
                The decentralized tipping platform for creators, artists, and
                entrepreneurs.
              </p>

              <p>
                Say goodbye to centralized tipping platforms that charge high
                fees and put unnecessary restrictions on your earnings.
              </p>

              <p>
                With GoTipMe, you can receive tips from your audience directly
                and securely, using the power of blockchain technology. Join the
                decentralized tipping revolution and start earning what you
                deserve.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-black text-white pt-16 pb-5">
          <div className="xl:max-w-7xl xl:mx-auto">
            <h4 className="mb-10 text-center font-extrabold text-2xl xl:text-4xl text-green-400">
              How it Works
            </h4>

            <div>
              <div className="left-how">
                <div className="xl:w-[35%]">
                  <h4 className="text-3xl stroke xl:text-5xl">01</h4>
                  <h5 className="font-extrabold text-xl xl:text-3xl text-white tracking-[1px] my-3">
                    Connect your wallet
                  </h5>
                  <p className="text-[#80AB9E] w-[60%] mr-auto">
                    Easily connect to our smart contract to start enjoying tips
                  </p>
                </div>
              </div>

              <div className="right-how mt-5">
                <div className="xl:w-[35%] xl:ml-auto text-right ">
                  <h4 className="text-3xl stroke xl:text-5xl">02</h4>
                  <h5 className="font-extrabold text-xl xl:text-3xl text-white tracking-[1px] my-3">
                    Create a Tip
                  </h5>
                  <p className="text-[#80AB9E] w-[60%] ml-auto">
                    Create a Tip template with ease. You can create more than
                    one Tip template and receive tips from any of them
                    simultaneously!
                  </p>
                </div>
              </div>

              <div className="left-how mt-5">
                <div className="xl:w-[35%]">
                  <h4 className="text-3xl stroke xl:text-5xl">03</h4>
                  <h5 className="font-extrabold text-xl xl:text-3xl text-white tracking-[1px] my-3">
                    Get Link
                  </h5>
                  <p className="text-[#80AB9E] w-[60%] mr-auto">
                    Share your link with anyone to start receiving tips!
                  </p>
                </div>
              </div>

              <div className="right-how mt-5">
                <div className="xl:w-[35%] xl:ml-auto text-right ">
                  <h4 className="text-3xl stroke xl:text-5xl">04</h4>
                  <h5 className="font-extrabold text-xl xl:text-3xl text-white tracking-[1px] my-3">
                    Withdraw Tip
                  </h5>
                  <p className="text-[#80AB9E] w-[60%] ml-auto">
                    You can withdraw your accumulated tips anytime and receive
                    payments in your personal wallet!
                  </p>
                </div>
              </div>

              <Footer></Footer>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Page;
