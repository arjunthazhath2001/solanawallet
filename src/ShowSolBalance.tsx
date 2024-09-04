import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function ShowSolBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    
    // State for storing balance
    const [balance, setBalance] = useState<number | null>(null);

    // Function to fetch and set balance
    async function getBalance() {
        if (wallet.publicKey) {
            const balanceLamports = await connection.getBalance(wallet.publicKey);
            setBalance(balanceLamports / LAMPORTS_PER_SOL); // Convert lamports to SOL
        }
    }

    // Use useEffect to fetch balance on component mount or when wallet changes
    useEffect(() => {
        getBalance();
    }, [wallet.publicKey]);

    return (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-center items-center p-10 text-gray-900 dark:text-gray-200 space-y-4 h-64">
            <h2 className="text-xl font-semibold tracking-wide">SOL Balance</h2>
            <div id="balance" className="text-3xl font-bold">
                {balance !== null ? (
                    <span>{balance.toFixed(2)} <span className="text-purple-600 dark:text-purple-400">SOL</span></span>
                ) : (
                    "Loading..."
                )}
            </div>
        </div>
    );
}

export default ShowSolBalance;
