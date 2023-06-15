## GoTipMe

### ✨ Inspiration

The rise of social media, and most especially streaming services have given creators the ability to receive tips from their apps. These platform charge a premium and pay at the end of each month. GoTipMe allows creators, and just anyone to receive tips and get their full value by leveraging on the blockchain technology.

### 🍰 What GoTipMe does

[GoTipMe](https://https://go-tip-me.vercel.app) allows just anyone with a blockchain wallet create a Tipping account. They can have more than one Tip running and receive tips from any of them simultaneously. With GoTipMe, a user can rise funds, and have full access to their funds and withdraw whenever they want without paying any commision.

![homepage](https://go-tip-me.vercel.app/img/1.JPG) <br />  
![create Tip](https://go-tip-me.vercel.app/img/2.JPG) <br />  
![Give Tip](https://go-tip-me.vercel.app/img/4.JPG) <br />  
![Shows Up](https://go-tip-me.vercel.app/img/3.JPG)

### 💻 How I built GoTipMe

I created GoTipMe smart contract with Solidity using Truffle framework. I also wrote some tests using Chai to ensure proper checking. I also used OpenZepplin to implement counter.

For the front end, I used **`NextJs`** with **`Wagmi`** and **`Rainbow Kit`** for smart contract and wallet interaction. For styling, i used **`TailwindCSS`**. The dApp is fully responsive.

### 🚀 Accomplishments that I'm proud of

🍥 Implemented a tipping platform that allows any user receive tips <br />
🍥 Learnt smart contract testing using chai framework with truffle <br />
🍥 Overcame the challenge of building a fullstack dApp in less than 24 hours <br />

## 📈 What's next for GoTipMe

I'm happy to have built this app. I learnt a whole lot. In the future, I plan on:

- Expanding the app to use GoTipMe tokens as utitlity.
- Allow more dynamic usecases such as timed tippings, milestones tippings, and a much more amazing UI.
- Integrate the Service to allow inter-chain tipping by employing Axelar protocol.

## 📄 Links

[Live Dapp](https://https://go-tip-me.vercel.app) 🌍

Thank you! I hope you enjoyed receiving tips with GoTipMe

## 🧑‍💻 Instructions for testing locally

1.  Run `npm install` to install all dependencies.

2.  Simulate a local chain by running Ganache. `truffle develop`

Open a new console tab:

3. Test the smart contract `truffle test --network development`

4. Deploy the smart to your local network `truffle migrate`

5. To spin up the dApp in development `npm run dev`

6. Copy the deployed smart contract address on the development environment and paste it in the config file at /abi/index.js. Repeat for the abi as well.

Our dApp is connected to local environment, and you can interact with it.

To deploy to a testnet, update the `truffle-config.js` file to your required testnet configuration.
