import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Greeter__factory, StandardToken__factory } from "./types";

const greeterAddress = String(import.meta.env.VITE_GREETER_ADDRESS ?? "");
const tokenAddress = String(import.meta.env.VITE_TOKEN_ADDRESS ?? "");

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

function App() {
  // Store greeting in local state
  const [greeting, setGreeting] = useState<string>("");
  // Store user address in local state
  const [userAddress, setUserAddress] = useState<string>("");
  // Store amount in local state
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const checkMetamaskAndNetwork = async () => {
      if (typeof window.ethereum === "undefined") {
        toast.error(
          "MetaMask is not installed. Please install it from https://metamask.io/ to continue.",
        );
      } else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== 80001) {
          // Mumbai Testnet Chain ID
          toast.error("Please connect MetaMask to the Mumbai Testnet.");
        }
      }
    };

    checkMetamaskAndNetwork().catch(console.error);
  }, []);

  // Request access to the user's MetaMask account
  async function requestAccount() {
    if (window.ethereum?.request)
      return window.ethereum.request({ method: "eth_requestAccounts" });

    throw new Error(
      "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser",
    );
  }

  // Call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = Greeter__factory.connect(greeterAddress, provider);
      try {
        const data = await contract.greet();
        toast.success(`Greeting: ${data}`);
      } catch (err) {
        toast.error(`Error: ${JSON.stringify(err)}`);
      }
    }
  }

  // Call the smart contract, send an update
  async function handleSetGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = Greeter__factory.connect(greeterAddress, signer);

      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      await fetchGreeting();
    }
  }

  // Get balance of the token contract
  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = StandardToken__factory.connect(tokenAddress, provider);

      // Request account from metamask
      const [account] = await requestAccount();
      const balance = await contract.balanceOf(String(account));
      toast.success(`balance: ${balance.toString()}`);
    }
  }

  // Send a transaction to the token contract
  async function sendToken() {
    if (!userAddress || !amount) return;

    if (typeof window.ethereum !== "undefined") {
      // Request account from metamask
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = StandardToken__factory.connect(tokenAddress, signer);
      const transaction = await contract.transfer(userAddress, amount);
      await transaction.wait();
      await getBalance();
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
              href={`https://mumbai.polygonscan.com/address/${greeterAddress}`}
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
              onClick={async () => fetchGreeting()}
            >
              Fetch Greeting
            </button>
            <div className="flex flex-row flex-wrap mt-1">
              <input
                type="text"
                placeholder="Set greeting"
                onChange={(e) => {
                  setGreeting(e.target.value);
                }}
              />
              <button
                className="ml-1 btn btn-green"
                type="button"
                onClick={async () => handleSetGreeting()}
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
              href={`https://mumbai.polygonscan.com/address/${greeterAddress}`}
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
            onClick={async () => getBalance()}
          >
            Get Balance
          </button>

          <hr className="mt-4" />

          <input
            type="text"
            placeholder="User address"
            onChange={(e) => {
              setUserAddress(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <button
            className="mt-1 btn btn-green"
            type="button"
            onClick={async () => sendToken()}
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
