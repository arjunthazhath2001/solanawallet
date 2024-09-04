import { mnemonicToSeedSync } from "bip39";
import { derivePath as deriveSolanaPath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

interface SolanaKeys {
  publicKey: string;
  privateKey: string;
}

export const deriveSolanaKeys = (mnemonic: string): SolanaKeys => {
  const seed = mnemonicToSeedSync(mnemonic);  // Deriving seed from mnemonic
  const path = "m/44'/501'/0'/0'"; // Solana BIP44 path
  const derivedSeed = deriveSolanaPath(path, seed.toString("hex")).key; // Deriving path
  const keypair = Keypair.fromSeed(derivedSeed); // Generating Keypair

  return {
    publicKey: keypair.publicKey.toBase58(),  // Convert public key to base58
    privateKey: Buffer.from(keypair.secretKey.slice(0, 32)).toString('hex'),  // Extract and convert private key (first 32 bytes) to hex
  };
};
