import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { info } from '../info';

function AccountInfo({ provider }) {
  const [balance, setBalance] = useState('-');

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const balance = await provider.getBalance(info.accountAddress);
      const balanceInEth = ethers.utils.formatEther(balance);
      setBalance(balanceInEth);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  return (
    <div>
      <h2>Account Info</h2>
      <div className='flex flex-col gap-y-3'>
        <div className='info-row'>
          <div className='row-title'>Account Address</div>
          <div>{info.accountAddress}</div>
        </div>
        <div className='info-row'>
          <div className='row-title'>ETH Balance</div>
          <div className='after:content-["ETH"] after:ml-1'>{balance}</div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
