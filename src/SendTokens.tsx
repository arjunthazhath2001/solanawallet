import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    // State for input
    const [to, setTo] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    async function sendTokens() {
        if (!wallet.publicKey) {
            alert('Please connect your wallet.');
            return;
        }

        try {
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
            if (isNaN(lamports) || lamports <= 0) {
                alert("Please enter a valid amount.");
                return;
            }

            const toPublicKey = new PublicKey(to);
            const transaction = new Transaction().add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: toPublicKey,
                lamports,
            }));

            await wallet.sendTransaction(transaction, connection);
            alert(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            if (error instanceof Error) {
                alert('Transaction failed: ' + error.message);
            } else {
                alert('Transaction failed due to an unknown error.');
            }
        }
    }

    return (
        
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-center items-center p-10 text-gray-900 dark:text-gray-200 space-y-4 h-64">
            <h2 className="text-xl font-semibold tracking-wide">Send SOL Tokens</h2>
            <Input id="to"
                type="text"
                placeholder="Receiver's Public Key"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mb-3 dark:border-white border-gray-400 w-full text-sm p-2 rounded-md dark:bg-gray-700 dark:placeholder-gray-400"
            />
            <Input id="amount"
                type="text"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-3 dark:border-white border-gray-400 w-full text-sm p-2 rounded-md dark:bg-gray-700 dark:placeholder-gray-400"
            />
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md py-2 dark:bg-purple-500 dark:hover:bg-purple-400"
                onClick={sendTokens}>
                Send Tokens
            </Button>
        </div>
    );
}
