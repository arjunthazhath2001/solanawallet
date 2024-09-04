import React, { useState } from 'react';
import { generateMnemonic } from "bip39";
import { useNavigate } from 'react-router-dom';
import { deriveSolanaKeys } from './keyGenerationFunctions';
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletAppProps {
  mnemonic: string;
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
  setSolanaKeys: React.Dispatch<React.SetStateAction<{ publicKey: string; privateKey: string } | null>>; // null is allowed
}

const WalletApp: React.FC<WalletAppProps> = ({ mnemonic, setMnemonic, setSolanaKeys }) => {
  const [inputMode, setInputMode] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showWords, setShowWords] = useState<boolean>(false);

  const navigate = useNavigate();

  const createSeedPhrase = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setShowWords(true);
  };

  const handleNext = () => {
    if (!mnemonic) {
      alert("Please generate or enter a recovery phrase before proceeding.");
      return;
    }

    if (!isChecked) {
      alert("Please select \"I saved my secret recovery phrase\" before proceeding.");
      return;
    }

    const solKeys = deriveSolanaKeys(mnemonic);

    // Ensure solKeys has both publicKey and privateKey
    setSolanaKeys({
      publicKey: solKeys.publicKey,
      privateKey: solKeys.privateKey,
    });

    navigate('/home');
  };

  const mnemonicWords = mnemonic ? mnemonic.split(' ') : [];

  return (
    <div className="flex min-h-screen min-w-full flex-col w-96 text-white overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-screen-sm p-10 mx-auto">
        {!inputMode ? (
          <div className="flex flex-col items-center w-full">
            <button
              onClick={createSeedPhrase}
              className="mb-4 bg-black text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
            >
              Generate Recovery Phrase
            </button>
            <button
              onClick={() => setInputMode(true)}
              className="text-purple-500 hover:underline mt-1 transition-transform scale-105 duration-300"
            >
              Or enter recovery phrase manually
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full transition-transform scale-105 duration-300 ease-in-out">
            <input
              type="text"
              placeholder="Enter recovery phrase"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded-lg text-white placeholder-gray-500 transition-all duration-500 ease-in-out"
            />
            <button
              onClick={() => setInputMode(false)}
              className="text-purple-500 hover:underline mt-1 transition-opacity duration-500 ease-in-out"
            >
              Or generate recovery phrase
            </button>
          </div>
        )}

        {mnemonicWords.length > 0 && (
          <div className="bg-black p-4 rounded-lg shadow-md w-full text-center mt-4">
            <div className="grid grid-cols-3 gap-2 mb-2">
              {mnemonicWords.map((word, index) => (
                <div key={index} className="bg-gray-900 py-1 px-2 rounded-md">
                  <span className="text-gray-500 text-sm">{index + 1}</span>
                  <span className="ml-2 font-semibold text-sm">{word}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center mt-3">
          <input 
            type="checkbox" 
            id="savedMnemonic" 
            checked={isChecked} 
            onChange={(e) => setIsChecked(e.target.checked)} 
            className="mr-2" 
          />
          <label htmlFor="savedMnemonic" className="text-xs text-gray-400">
            I saved my secret recovery phrase
          </label>
        </div>

        <button
          onClick={handleNext}
          className="mt-3 bg-black text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WalletApp;
