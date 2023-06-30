import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import vipABI from '../../../../utils/vipABI.json';
import styles from './Hero.module.scss';

const Hero = () => {
  const [mintAmount, setMintAmount] = useState(0);
  const account = useAccount(); // Changed variable name to avoid destructuring

  const birdieVIPContractAddress = '0xd9c94b9540b9297046737eb9211e47df508b6d95';

  const CheckTokens = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const vipContract = new ethers.Contract(birdieVIPContractAddress, vipABI, signer);
      const hexAmount = await vipContract.whitelist(account.address);
      const amount = parseInt(hexAmount, 10);
      setMintAmount(amount);
      console.log('Checked.', amount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const vipContract = new ethers.Contract(birdieVIPContractAddress, vipABI, signer);
      const tx = await vipContract.ClaimPasses();
      await tx.wait();
      console.log("Minted! You are no longer a P, you're now a VIP!");
    } catch (error) {
      console.error('Failed to mint:', error);
    }
  };

  useEffect(() => {
    if (account) { // Add a null check for account
      CheckTokens();
    }
  }, [account]);

  return (
    <div style={{ width: "60%", margin: "auto", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{padding: "10px"}}>Birdie VIP Pass Claim</h1>
      <img src="/images/VIPPass.jpg" alt="Passes" style={{padding: "10px"}} width="60%"/>
      {mintAmount === 0 ? (
        <>
          {account ? (
            <h3 style={{padding: "10px"}}>You do not have any passes to claim with this wallet!</h3>
          ) : (
            <h3 style={{padding: "10px"}}>Connect your wallet to claim passes</h3>
          )}
        </>
      ) : (
        <h3 style={{padding: "10px"}}>You are on par to claim {mintAmount} VIP passes!</h3>
      )}
      <button
        onClick={mint}
        style={{
          border: 'none',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          padding: '1.2rem 2.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          backgroundColor: (!account || mintAmount === 0) ? '#2f436d44' : '#2f436d',
          
          color: '#fff',
        }}
        disabled={!account || mintAmount === 0}
      >
        Claim
      </button>
    </div>
  );
};

export default Hero;