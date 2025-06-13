import React, { useState } from "react";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@reef-defi/extension-dapp";
import { Provider } from "@reef-chain/evm-provider";
import { WsProvider } from "@polkadot/api";

const ReefWalletConnect = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  // Function to connect with Reef Wallet and get all accounts
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
    setAccounts(accounts);

    // If no accounts are found, prompt the user to unlock the wallet
    if (accounts.length === 0) {
      alert("No accounts found. Please unlock your Reef Wallet");
      return;
    }
  };

  // Function to select an account and show its balance
  const selectAccount = async (account) => {
    setSelectedAccount(account);

    const wsProvider = new WsProvider("wss://rpc.reefscan.com/ws");

    const provider = new Provider({ provider: wsProvider });
    await provider.api.isReady;

    // Get the balance of the selected account
    const balance = await provider.api.query.system.account(account.address);
    console.log("🚀 ~ selectAccount ~ balance:", balance);
    setBalance(balance.data.free.toString()); // Show free balance
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect to Reef Wallet</button>
      <div>
        <h3>Accounts:</h3>
        {accounts.length > 0 ? (
          <ul>
            {accounts.map((acc) => (
              <li key={acc.address} onClick={() => selectAccount(acc)}>
                {acc.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No accounts found.</p>
        )}
      </div>

      {selectedAccount && (
        <div>
          <h3>Selected Account:</h3>
          <p>Address: {selectedAccount.address}</p>
          <p>Balance: {balance ? `${balance} REEF` : "Loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default ReefWalletConnect;

// import React, { useState } from "react";
// import {
//   web3Enable,
//   web3Accounts,
//   web3FromAddress,
// } from "@reef-defi/extension-dapp";

// const ReefWalletConnect = () => {
//   const [account, setAccount] = useState(null);

//   // Function to connect with Reef Wallet and get the account
//   const connectWallet = async () => {
//     // Enable Reef Wallet
//     const allInjected = await web3Enable("Reef Wallet Integration");

//     // If no extension is found, prompt the user to install it
//     if (allInjected.length === 0) {
//       alert("Please install the Reef Wallet extension");
//       return;
//     }

//     // Retrieve accounts injected by Reef Wallet
//     const accounts = await web3Accounts();
//     console.log("🚀 ~ connectWal ~ accounts:", accounts);

//     // If no accounts are found, prompt the user to unlock the wallet
//     if (accounts.length === 0) {
//       alert("No accounts found. Please unlock your Reef Wallet");
//       return;
//     }

//     // Set the first account as the connected account
//     const selectedAccount = accounts[0];
//     setAccount(selectedAccount);

//     // Optionally, get the signer for this account
//     const injector = await web3FromAddress(selectedAccount.address);
//     console.log("Signer for the account:", injector.signer); // Just for logging
//   };

//   return (
//     <div>
//       <button onClick={connectWallet}>Connect to Reef Wallet</button>
//       {account && <p>Connected Account: {account?.address}</p>}
//     </div>
//   );
// };

// export default ReefWalletConnect;
