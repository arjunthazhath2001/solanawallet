import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    // Type assertion for the input element to avoid "unknown type" error.
    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        // Get the message value from input
        const messageElement = document.getElementById("message") as HTMLInputElement;
        const message = messageElement.value;

        // Encode the message and sign it
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        // Verify the signature
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
            throw new Error('Message signature invalid!');
        }

        // Show success alert with the signature
        alert(`Success! Message signature: ${bs58.encode(signature)}`);
    };

    return (
        <div>
            <input id="message" type="text" placeholder="Message" />
            <button onClick={onClick}>
                Sign Message
            </button>
        </div>
    );
};
