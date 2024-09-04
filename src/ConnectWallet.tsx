import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';


function ConnectWallet(){
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-center items-center p-10 text-gray-900 dark:text-gray-200 space-y-4">
   
        <div className="flex flex-col justify-center items-center space-y-4">
          <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/s_I_xMxDUfVxjo47Dmfo_4lOiieLx1Pc">
            <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <p className='font-semibold'>Connect to an existing Wallet:</p><br />  
                <div className='flex flex-col justify-center items-center w-48 space-y-4'>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </div>
    </div>
  );
};

export default ConnectWallet;
