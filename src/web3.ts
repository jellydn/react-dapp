// call the smart contract, read the current greeting value
export async function fetchGreeting() {
  throw new Error("Not implemented");
}

// call the smart contract, send an update
export async function setGreeting(greeting: string) {
  if (!greeting) return;
  throw new Error("Not implemented");
}

// get balance of the token contract
export async function getBalance() {
  throw new Error("Not implemented");
}

// send a transaction to the token contract
export async function sendToken(amount: number, userAddress: string) {
  if (!userAddress || !amount) return;

  throw new Error("Not implemented");
}
