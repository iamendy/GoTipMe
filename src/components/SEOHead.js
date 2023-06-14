import Head from "next/head";
function SEOHead() {
  return (
    <Head>
      <title>GoTipMe | Decentralized tips</title>
      <meta
        name="description"
        content="With GoTipMe, you can receive tips from your audience directly and securely, using the power of blockchain technology."
      />
      <meta
        name="keywords"
        content="Decentralized tipping, Crypto tips, Blockchain-based tips, Tip bot, Micropayments, Decentralized finance (DeFi) tips, Crypto rewards"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="tipX" />
      <meta
        property="og:description"
        content="With GoTipMe, you can receive tips from your audience directly and securely, using the power of blockchain technology."
      />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:image" content="/img/tipx.JPG" />
    </Head>
  );
}

export default SEOHead;
