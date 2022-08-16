import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

import { fetchGreeting, getBalance, sendToken, setGreeting } from "./web3";

const greeterAddress = import.meta.env.VITE_GREETER_ADDRESS;
const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState<string>("");
  // store user address in local state
  const [userAddress, setUserAddressValue] = useState<string>("");
  // store amount in local state
  const [amount, setAmountValue] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="lg:flex md:flex text-xl justify-center items-center mx-auto border-orange-500 max-w-2xl py-4 px-4">
          <div className="font-semibold p-2">
            <span className="text-gray-800">Greeter Contract</span>
            <span className="text-orange-500 mx-1 text-3xl">/</span>
            <a
              href={`https://ropsten.etherscan.io/address/${greeterAddress}`}
              target="_blank"
              className="px-4 py-1 rounded-full focus:outline-none bg-orange-500 text-white shadow ml-2"
              rel="noreferrer"
            >
              Check
            </a>
          </div>
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 flex flex-col">
          <div className="flex flex-row flex-wrap">
            <button
              className="btn btn-green mt-1"
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
                className="btn btn-green ml-1"
                type="button"
                onClick={() => setGreeting(greeting)}
              >
                Set Greeting
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="lg:flex md:flex text-xl justify-center items-center mx-auto border-orange-500 max-w-2xl py-4 px-4">
          <div className="font-semibold p-2">
            <span className="text-gray-800">Token Contract</span>
            <span className="text-orange-500 mx-1 text-3xl">/</span>
            <a
              href={`https://ropsten.etherscan.io/address/${tokenAddress}`}
              target="_blank"
              className="px-4 py-1 rounded-full focus:outline-none bg-orange-500 text-white shadow ml-2"
              rel="noreferrer"
            >
              Check
            </a>
          </div>
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 flex flex-col">
          <button
            className="btn btn-green mt-1"
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
            className="btn btn-green mt-1"
            type="button"
            onClick={() => sendToken(amount, userAddress)}
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
