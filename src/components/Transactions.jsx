import { useEffect, useState } from 'react';
import { info } from '../info';

function Transactions({ provider }) {
  const [transactions, setTransactions] = useState([
    {
      hash: '-',
      blockNumber: '-',
      from: '-',
      to: '-',
    },
    {
      hash: '-',
      blockNumber: '-',
      from: '-',
      to: '-',
    },
  ]);

  useEffect(() => {
    fetchTransactions(info.transactionHashes);
  }, []);

  const getTransactionInfo = async (provider, hash) => {
    const info = await provider.getTransaction(hash);
    return info;
  };

  const fetchTransactions = async (hashes) => {
    const transactionPromises = hashes.map((hash) =>
      getTransactionInfo(provider, hash)
    );
    const transactionResults = await Promise.all(transactionPromises);
    setTransactions(transactionResults);
  };

  return (
    <div>
      <h2>Transactions</h2>
      <div className='flex flex-col gap-y-3'>
        {transactions.map((transaction, i) => (
          <div className='bg-[#1B1B1C] rounded-md px-3 py-4' key={i}>
            <div className='info-row-transaction'>
              <div className='shrink-0 row-title'>TX Hash</div>
              <div>{transaction.hash}</div>
            </div>
            <div className='info-row-transaction'>
              <div className='shrink-0 row-title'>Block #</div>
              <div>{transaction.blockNumber}</div>
            </div>
            <hr className='my-3 border-neutral-400' />
            <div className='info-row-transaction'>
              <div className='shrink-0 row-title'>from</div>
              <div>{transaction.from}</div>
            </div>
            <div className='info-row-transaction'>
              <div className='shrink-0 row-title'>to</div>
              <div>{transaction.to}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
