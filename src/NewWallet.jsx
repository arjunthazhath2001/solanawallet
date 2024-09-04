import Home from './Home';

function NewWallet() {
  const [mnemonic, setMnemonic] = useState("");
  const [solanaKeys, setSolanaKeys] = useState([]);

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-center items-center p-10 text-gray-900 dark:text-gray-200 space-y-4 h-64">
        <Home solanaKeys={solanaKeys}/>
    </div>
)
}

export default NewWallet