import AccountInfo from './components/AccountInfo';
import TokenHoldings from './components/TokenHoldings';
import Transactions from './components/Transactions';
import { ethers } from 'ethers';
import { info } from './info';

function App() {
  const provider = new ethers.providers.JsonRpcProvider(info.rpcUrl);
  return (
    <div className='bg-black text-white min-h-screen p-10'>
      <div className='max-w-5xl mx-auto flex flex-col gap-y-10'>
        <AccountInfo provider={provider} />
        <Transactions provider={provider} />
        <TokenHoldings provider={provider} />
      </div>
    </div>
  );
}

export default App;
