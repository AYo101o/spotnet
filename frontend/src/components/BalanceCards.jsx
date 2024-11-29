import React, { useEffect } from 'react';
import { useMatchMedia } from 'hooks/useMatchMedia';
import { getBalances } from '../services/wallet';
import useScrollTracker from 'hooks/useScrollTracker';
import PaginationDots from './PaginationDots';
import { useWalletStore } from 'stores/useWalletStore';

const BalanceCards = ({balances, setBalances}) => {
    const { walletId } = useWalletStore();

 
  const isMobile = useMatchMedia('(max-width: 768px)');
  const { scrollRef, activeIndex, setActiveIndex } = useScrollTracker();

  const handleDotClick = (index) => {
    setActiveIndex(index);
    const balanceContainer = scrollRef.current;
    const containerWidth = balanceContainer.offsetWidth;
    const scrollAmount = index * containerWidth;
  
    balanceContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };
  

  useEffect(() => {
    getBalances(walletId, setBalances);
  }, [walletId]);

  return (
    <div className='balance-card'>
    <div className="balance-container" ref={scrollRef}>
      {balances.map((balance) =>
        isMobile ? (
          <div className="balance-item" key={balance.title}>
            <div className="title-container">
              <label htmlFor="icon" className="balance-title">
              <span className="token-icon">{balance.icon}</span>
              </label>
              <label htmlFor={balance.title}>{balance.title} Balance</label>
            </div>
              <label htmlFor={balance.title}>{balance.balance}</label>
          </div>
        ) : (
          <div className="balance-item" key={balance.title}>
            <label htmlFor={balance.title} className={'balance-title'}>
            <span className="token-icon blend">{balance.icon}</span>
              {balance.title} Balance
            </label>
            <label htmlFor={balance.title}>{balance.balance}</label>
          </div>
        )
      )}
    </div>
      <PaginationDots
          balances={balances}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
        />
      </div>
  );
};

export default BalanceCards;