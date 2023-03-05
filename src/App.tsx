import { ethers } from "ethers";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import GreeterArtifacts from "./artifacts/contracts/Greeter.sol/Greeter.json";
import StandardTokenArtifacts from "./artifacts/contracts/StandardToken.sol/StandardToken.json";
import { Greeter, StandardToken } from "./types";

const greeterAddress = import.meta.env.VITE_GREETER_ADDRESS;
const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState<string>("");
  // store user address in local state
  const [userAddress, setUserAddressValue] = useState<string>("");
  // store amount in local state
  const [amount, setAmountValue] = useState<number>(0);

  // request access to the user's MetaMask account
  async function requestAccount() {
    if (window.ethereum?.request)
      return window.ethereum.request({ method: "eth_requestAccounts" });

    throw new Error(
      "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser"
    );
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        GreeterArtifacts.abi,
        provider
      ) as Greeter;
      try {
        const data = await contract.greet();
        toast.success(`Greeting: ${data}`);
      } catch (err) {
        toast.error(`Error: ${err}`);
      }
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        greeterAddress,
        GreeterArtifacts.abi,
        signer
      ) as Greeter;

      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  // get balance of the token contract
  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        StandardTokenArtifacts.abi,
        provider
      ) as StandardToken;

      // request account from metamask
      const [account] = await requestAccount();
      const balance = await contract.balanceOf(account);
      toast.success(`balance: ${balance.toString()}`);
    }
  }

  // send a transaction to the token contract
  async function sendToken() {
    if (!userAddress || !amount) return;

    if (typeof window.ethereum !== "undefined") {
      // request account from metamask
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        tokenAddress,
        StandardTokenArtifacts.abi,
        signer
      ) as StandardToken;
      const transaction = await contract.transfer(userAddress, amount);
      await transaction.wait();
      getBalance();
    }
  }

  return (
    <div className="flex flex-col justify-center py-6 min-h-screen bg-gray-100 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="justify-center items-center py-4 px-4 mx-auto max-w-2xl text-xl border-orange-500 md:flex lg:flex">
          <div className="p-2 font-semibold">
            <span className="text-gray-800">Greeter Contract</span>
            <span className="mx-1 text-3xl text-orange-500">/</span>
            <a
              href={`https://ropsten.etherscan.io/address/${greeterAddress}`}
              target="_blank"
              className="py-1 px-4 ml-2 text-white bg-orange-500 rounded-full shadow focus:outline-none"
              rel="noreferrer"
            >
              Check
            </a>
          </div>
        </div>
        <div className="flex relative flex-col py-10 px-4 bg-white shadow-lg sm:p-20 sm:rounded-3xl">
          <div className="flex flex-row flex-wrap">
            <button
              className="mt-1 btn btn-green"
              type="button"
              onClick={fetchGreeting}
            >
              Fetch Greeting
            </button>
            <div className="flex flex-row flex-wrap mt-1">
              <input
                onChange={(e) => setGreetingValue(e.target.value)}
                type="text"
                placeholder="Set greeting"
              />
              <button
                className="ml-1 btn btn-green"
                type="button"
                onClick={setGreeting}
              >
                Set Greeting
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-3 mt-10 sm:mx-auto sm:max-w-xl">
        <div className="justify-center items-center py-4 px-4 mx-auto max-w-2xl text-xl border-orange-500 md:flex lg:flex">
          <div className="p-2 font-semibold">
            <span className="text-gray-800">Token Contract</span>
            <span className="mx-1 text-3xl text-orange-500">/</span>
            <a
              href={`https://ropsten.etherscan.io/address/${tokenAddress}`}
              target="_blank"
              className="py-1 px-4 ml-2 text-white bg-orange-500 rounded-full shadow focus:outline-none"
              rel="noreferrer"
            >
              Check
            </a>
          </div>
        </div>
        <div className="flex relative flex-col py-10 px-4 bg-white shadow-lg sm:p-20 sm:rounded-3xl">
          <button
            className="mt-1 btn btn-green"
            type="button"
            onClick={getBalance}
          >
            Get Balance
          </button>

          <hr className="mt-4" />

          <input
            type="text"
            onChange={(e) => setUserAddressValue(e.target.value)}
            placeholder="User address"
          />
          <input
            type="number"
            onChange={(e) => setAmountValue(Number(e.target.value))}
            placeholder="Amount"
          />
          <button
            className="mt-1 btn btn-green"
            type="button"
            onClick={sendToken}
          >
            Send token
          </button>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
