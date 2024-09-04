import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";

function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    // Create a state for the amount (as a string to handle input)
    const [amount, setAmount] = useState<string>('');

    // Function to handle the airdrop request
    async function sendAirdropToUser() {
        if (!wallet.publicKey) {
            alert('Please connect your wallet');
            return;
        }

        // Convert the amount to a number and request the airdrop
        const solAmount = parseFloat(amount); // Parse the amount entered
        if (isNaN(solAmount) || solAmount <= 0) {
            alert('Please enter a valid amount of SOL');
            return;
        }

        try {
            const tx = await connection.requestAirdrop(wallet.publicKey, solAmount * 1000000000); // 1 SOL = 10^9 lamports
            alert('Airdrop successful, transaction signature: ' + tx);
        } catch (error) {
            if (error instanceof Error) {
                alert('Airdrop failed: ' + error.message);
            } else {
                alert('Airdrop failed due to an unknown error.');
            }
        }
    }

    return (

        <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-center items-center p-10 text-gray-900 dark:text-gray-200 space-y-4 h-64">
            <h2 className="text-xl font-semibold tracking-wide">Request Airdrop</h2>
            <Input
                id="amount"
                type="text"
                placeholder="Enter amount of SOL"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Update the state with the entered value
                className="mb-3 dark:border-white border-gray-400 w-full text-sm p-2 rounded-md dark:bg-gray-700 dark:placeholder-gray-400"
            />
            <button
                onClick={sendAirdropToUser}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md py-2 dark:bg-purple-500 dark:hover:bg-purple-400"
            >
                Request Airdrop
            </button>
        </div>
    );
}

export default Airdrop;
