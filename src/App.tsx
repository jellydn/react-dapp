import React, { useState } from "react";
import { ethers } from "ethers";

import GreeterArtifacts from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { Greeter } from "./types/Greeter";

const greeterAddress = import.meta.env.VITE_DEPLOYED_ADDRESS;

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

function App() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState<string>("");

  // request access to the user's MetaMask account
  async function requestAccount() {
    if (window.ethereum?.request)
      await window.ethereum.request({ method: "eth_requestAccounts" });
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
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
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

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <button
            className="btn btn-green"
            type="button"
            onClick={fetchGreeting}
          >
            Fetch Greeting
          </button>
          <button className="btn btn-green" type="button" onClick={setGreeting}>
            Set Greeting
          </button>
          <input
            onChange={(e) => setGreetingValue(e.target.value)}
            placeholder="Set greeting"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
