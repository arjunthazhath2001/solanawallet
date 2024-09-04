import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "./components/mode-toggle";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from "@/Airdrop";
import ShowSolBalance from './ShowSolBalance';
import { SendTokens } from './SendTokens';
import ConnectWallet from "./ConnectWallet";


function User() {

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen min-w-full">
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/s_I_xMxDUfVxjo47Dmfo_4lOiieLx1Pc">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>

            {/* ModeToggle button in the top right corner */}
            <div className="absolute top-0 right-0 m-4">
              <ModeToggle />
            </div>
            <h1 className="text-6xl font-black text-black dark:text-white">
              SOL<span className="text-violet-700">PAL</span>
            </h1>
            <p className="text-black dark:text-white font-sans">Most trusted Solana Wallet</p>
            <div className="w-[450px] h-72 flex mb-10 mt-2 p-10 justify-center">
              <Tabs defaultValue="connect">
                <TabsList>
                  <TabsTrigger value="connect">Connect existing Wallet</TabsTrigger>
                  <TabsTrigger value="send">Send Token</TabsTrigger>
                  <TabsTrigger value="balance">Show Balance</TabsTrigger>
                  <TabsTrigger value="airdrop">Request Airdrop</TabsTrigger>
                </TabsList>
                {/* <TabsContent value="wallet">Hi</TabsContent> */}
                <TabsContent value="connect"><ConnectWallet/></TabsContent>
                <TabsContent value="send"><SendTokens/></TabsContent>
                <TabsContent value="balance"><ShowSolBalance/></TabsContent>
                <TabsContent value="airdrop"><Airdrop/></TabsContent>
              </Tabs>
            </div>

          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default User;
