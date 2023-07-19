import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import vipABI from '../../../../utils/vipABI.json';

export default function Hero() {
  const [mintAmount, setMintAmount] = useState(0);
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const birdieVIPContractAddress = '0xd9c94b9540b9297046737eb9211e47df508b6d95';

  useEffect(() => {
    const getWC = async () => {
      const walletCon = await EthereumProvider.init({
        projectId: process.env.NEXT_PUBLIC_WalletConnect_Project_ID,
        chains: [1],
        optionalMethods: ["eth_signTypedData", "eth_signTypedData_v4", "personal_ecRecover","eth_sendTransaction", "personal_sign"],
        optionalEvents: ["chainChanged", "accountsChanged"],
        showQrModal: true,
        metadata:{
          name: 'BirdieGolfLLC',
          description: 'Birdie Golf VIP Pass Claim',
          url: '...',
          icons: ['...']
        },
        qrModalOptions: {
          themeMode: "light",

        },
      });
      
      walletCon.on("display_uri", (uri) => {
        console.log("display_uri", uri);
      });
      
      setProvider(walletCon)
    }
    getWC();
  },[]);
  
  const connectWalletWC = async () => {
    await provider.connect()
    const ethersProvider = await new ethers.providers.Web3Provider(provider)
    setProvider(ethersProvider)

    const accounts = await ethersProvider.send("eth_requestAccounts", []);
    console.log("accounts: " + accounts);
    if(accounts.length > 0) {
        const account = accounts[0];
        setAddress(account);
        setProvider(new ethers.providers.Web3Provider(ethereum));
    }
  }

  useEffect(() => {
    if (address && provider) {
      console.log("checklin")
      CheckTokens();
    }
  }, [address]);

  const CheckTokens = async () => {
    try {
      const signer = provider.getSigner(address);
      const vipContract = new ethers.Contract(birdieVIPContractAddress, vipABI, signer);
      const hexAmount = await vipContract.whitelist(address);
      const amount = parseInt(hexAmount, 10);
      setMintAmount(amount);
      console.log('Checked.', amount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mint = async () => {
    try {
      const signer = provider.getSigner(address);
      const vipContract = new ethers.Contract(birdieVIPContractAddress, vipABI, signer);
      const tx = await vipContract.ClaimPasses();
      await tx.wait();
      console.log("Minted! You are no longer a P, you're now a VIP!");
    } catch (error) {
      console.error('Failed to mint:', error);
    }
  };

  const connectWalletMM = async () => {
    try{
    const { ethereum } = window;
    if(!ethereum) {
        console.log("You need to have Metamask installed!");
        return;
    } else {
        console.log("Metamask is installed.");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("accounts: " + accounts);
    if(accounts.length > 0) {
        const account = accounts[0];
        setAddress(account);
        setProvider(new ethers.providers.Web3Provider(ethereum));
    }
  }
  catch (e){
    console.log(e);
  }
  }

  return (
    <div style={{ width: '90%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ padding: '10px' }}>Birdie VIP Pass Claim</h1>
      <img src="/images/VIPPass.jpg" alt="Passes" style={{ padding: '10px' }} width="60%" />
      {mintAmount === 0 ? (
        <>
          {address ? (
            <h3 style={{ padding: '10px' }}>You do not have any passes to claim with this wallet!</h3>
          ) : (
            <>
              <h3 style={{ padding: '10px' }}>Connect your wallet to claim passes</h3>
              <button
                onClick={() => {connectWalletMM()}}
                style={{
                  border: 'none',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: '#2f436d',
                  color: '#fff',
                  marginBottom: '1rem',
                }}
              >
                Metamask
              </button>
              <button
                onClick={() => {connectWalletWC()}}
                style={{
                  border: 'none',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: '#2f436d',
                  color: '#fff',
                  marginBottom: '1rem',
                }}
              >
                WalletConnect
              </button>
            </>
          )}
        </>
      ) : (
        <h3 style={{ padding: '10px' }}>You are on par to claim {mintAmount} VIP passes!</h3>
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
          backgroundColor: !address || mintAmount === 0 ? '#2f436d44' : '#2f436d',
          color: '#fff',
        }}
        disabled={!address || mintAmount === 0}
      >
        Claim
      </button>
    </div>
  );
      };