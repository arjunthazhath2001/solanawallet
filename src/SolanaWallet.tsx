import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import nacl from "tweetnacl";

interface SolanaWalletProps {
  mnemonic: string;
}

const SolanaWallet: React.FC<SolanaWalletProps> = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [privateKey, setPrivateKey] = useState<Uint8Array | null>(null);

  const addWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setPrivateKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  };

  const sendSolana = async (recipient: string, amount: number) => {
    if (!privateKey) {
      alert("No private key available!");
      return;
    }

    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const senderKeypair = Keypair.fromSecretKey(privateKey);
    const recipientPublicKey = new PublicKey(recipient);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount * 1e9, // converting SOL to lamports
      })
    );

    const signature = await connection.sendTransaction(transaction, [senderKeypair]);
    await connection.confirmTransaction(signature);
    alert(`Transaction successful: ${signature}`);
  };

  return (
    <div>
      <button onClick={addWallet}>Add Solana wallet</button>

      {publicKeys.map((p, index) => (
        <div key={index}>
          {p.toBase58()}
        </div>
      ))}
    </div>
  );
};

export default SolanaWallet;
