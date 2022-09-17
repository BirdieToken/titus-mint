import styles from './Hero.module.scss'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { supabase } from '../../../../utils/supabaseClient'
import getProvider from '../../../../hooks/getProvider'

const Hero = () => {
  const { user, isAuthenticated, enableWeb3, authenticate } = useMoralis()
  const abi = '[{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "devMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "devMintForAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "mintForAddress", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "cost", "type": "uint256" }], "name": "setCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "paused", "type": "bool" }], "name": "setPaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "wallet", "type": "address" }], "name": "setWallet1", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "wallet", "type": "address" }], "name": "setWallet2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "wallet", "type": "address" }], "name": "setWithdrawalWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "_admin", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_cost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_currentBaseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_wallet1", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_wallet2", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_withdrawalWallet", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]'
  const contract_address = '0xA83928153a3c0fcE1c1d37AcF123864E18E4C7b9'

  const [cost, setCost] = useState(0)
  const [supply, setSupply] = useState(0)

  const sign_in_walletconnect = async () => {
    await authenticate({
      provider: 'walletconnect',
      signingMessage: 'Sign in using WalletConnect.',
      chainId: 1
    })
  }

  const get_cost = async () => {
    const web3 = await getProvider(enableWeb3)
    const contract = new web3.eth.Contract(JSON.parse(abi), contract_address)
    const trans = await contract.methods._cost().call()

    setCost(trans)
  }

  const get_supply = async () => {
    const web3 = await getProvider(enableWeb3)
    const contract = new web3.eth.Contract(JSON.parse(abi), contract_address)
    const trans = await contract.methods.totalSupply().call()

    setSupply(trans)
  }

  // Minting
  const get_random_int = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const _mint_ = async (tokenURI) => {
    const web3 = await getProvider(enableWeb3)

    const contract = new web3.eth.Contract(JSON.parse(abi), contract_address)
    const trans = await contract.methods.mint(`${tokenURI}`).send({ from: user?.get('ethAddress'), value: cost })
    console.log(trans)
  }

  const mint = async () => {
    const min = 1, max = 1818
    let rand_number = get_random_int(min, max)

    let res = await supabase
      .from('titus_minted')
      .select()
      .match({ titus_id: rand_number })

    while (res.data.length > 0) {
      console.log('true')

      rand_number = get_random_int(min, max)

      res = await supabase
        .from('titus_minted')
        .select()
        .match({ titus_id: rand_number })
    }

    await supabase
      .from('titus_minted')
      .insert({ titus_id: rand_number })

    try {
      await _mint_(rand_number)

      await supabase
        .from('titus_minted')
        .update({ status: true })
        .match({ titus_id: rand_number })
    } catch (error) {
      await supabase
        .from('titus_minted')
        .update({ status: false })
        .match({ titus_id: rand_number })
    }
  }

  useEffect(() => {
    (async () => {
      await get_cost()
      await get_supply()
    })()
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.hero_left}>
        <h1>GOLF AND CRYPTO <span>COME TOGETHER</span></h1>

        <div className={styles.form}>
          <h2><span>{supply > 0 ? supply - 3 : 0}</span> / 1818 MINTED!</h2>
          <h3>Price: <span>{cost / 10 ** 18}</span> ETH</h3>

          {isAuthenticated ?
            <button id="btn-buy" className={styles.poppins} onClick={() => mint()}>
              Mint
            </button>
            :
            <button id="btn-connect1" className={`${styles.poppins} open-modal`} onClick={() => sign_in_walletconnect()}>
              Connect
            </button>
          }
        </div>

        <p>
          In case you encounter any technical issues make sure to join any
          of our Social Media Platforms and the team would be more than
          happy to assist you.
        </p>
      </div>

      <div className={styles.hero_right}>
        <img src={`/images/hero.png?${new Date()}`} alt='' />
      </div>
    </section>
  )
}

export default Hero