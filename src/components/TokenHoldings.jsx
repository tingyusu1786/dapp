import { ethers } from 'ethers';
import { info } from '../info';
import { useEffect, useState } from 'react';

function TokenHoldings({ provider }) {
  const [tokenBalances, setTokenBalances] = useState({ USDC: '-', USDT: '-' });

  useEffect(() => {
    fetchTokenBalances();
  }, []);

  const getTokenBalance = async (tokenAddress, accountAddress) => {
    const contract = new ethers.Contract(tokenAddress, info.abi, provider);
    const balance = await contract.balanceOf(accountAddress);
    const decimals = await contract.decimals();
    const balanceInToken = balance / Math.pow(10, decimals);
    return balanceInToken;
  };

  const fetchTokenBalances = async () => {
    try {
      const balancePromises = Object.keys(info.tokenAddress).map(
        async (token) => {
          const balanceInToken = await getTokenBalance(
            info.tokenAddress[token],
            info.accountAddress
          );
          return balanceInToken;
        }
      );
      const balances = await Promise.all(balancePromises);
      const updatedBalances = {};
      Object.keys(info.tokenAddress).forEach((token, index) => {
        const balanceInToken = balances[index];
        updatedBalances[token] = balanceInToken;
      });
      setTokenBalances(updatedBalances);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  return (
    <div>
      <h2>Token Holdings</h2>
      <div className='flex flex-col gap-y-3'>
        {Object.entries(tokenBalances).map((token) => (
          <div className='info-row' key={token[0]}>
            <div className='after:content-["Balance"] row-title'>
              {token[0]}&nbsp;
            </div>
            <div>
              {token[1]}&nbsp;{token[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenHoldings;
