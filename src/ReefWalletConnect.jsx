import React, { useState } from "react";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@reef-defi/extension-dapp";

const ReefWalletConnect = () => {
  const [account, setAccount] = useState(null);

  // Function to connect with Reef Wallet and get the account
  const connectWallet = async () => {
    // Enable Reef Wallet
    const allInjected = await web3Enable("Reef Wallet Integration");

    // If no extension is found, prompt the user to install it
    if (allInjected.length === 0) {
      alert("Please install the Reef Wallet extension");
      return;
    }

    // Retrieve accounts injected by Reef Wallet
    const accounts = await web3Accounts();
    console.log("🚀 ~ connectWal ~ accounts:", accounts);

    // If no accounts are found, prompt the user to unlock the wallet
    if (accounts.length === 0) {
      alert("No accounts found. Please unlock your Reef Wallet");
      return;
    }

    // Set the first account as the connected account
    const selectedAccount = accounts[0];
    setAccount(selectedAccount);

    // Optionally, get the signer for this account
    const injector = await web3FromAddress(selectedAccount.address);
    console.log("Signer for the account:", injector.signer); // Just for logging
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect to Reef Wallet</button>
      {account && <p>Connected Account: {account?.address}</p>}
    </div>
  );
};

export default ReefWalletConnect;
