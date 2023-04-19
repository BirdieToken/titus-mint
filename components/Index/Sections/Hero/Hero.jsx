import styles from './Hero.module.scss'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { supabase } from '../../../../utils/supabaseClient'
import Provider from '../../../Layout/Provider/Provider'

const Hero = () => {
  const [provider, setProvider] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0)

  const { address, isConnected } = useAccount()
  const abi = '[{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "devMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "devMintForAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "string", "name": "_tokenURI", "type": "string" }], "name": "mintForAddress", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "cost", "type": "uint256" }], "name": "setCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "paused", "type": "bool" }], "name": "setPaused", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "wallet", "type": "address" }], "name": "setWallet1", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "wallet", "type": "address" }], "name": "setWallet2", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "wallet", "type": "address" }], "name": "setWithdrawalWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "_admin", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_cost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_currentBaseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_wallet1", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_wallet2", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_withdrawalWallet", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]'
  const contract_address = '0xA83928153a3c0fcE1c1d37AcF123864E18E4C7b9'

  const { data: cost } = useContractRead({
    address: contract_address,
    abi: abi,
    functionName: '_cost',
  })

  const { data: supply } = useContractRead({
    address: contract_address,
    abi: abi,
    functionName: 'totalSupply',
  })

  const { config } = usePrepareContractWrite({
    address: contract_address,
    abi: abi,
    functionName: 'mint',
    args: [randomNumber],
    overrides: {
      from: address,
      value: cost,
    },
  })

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config, onSuccess: async () => {
      await supabase
        .from('titus_minted')
        .update({ status: true })
        .match({ titus_id: randomNumber })
    },
    onError: async () => {
      await supabase
        .from('titus_minted')
        .update({ status: false })
        .match({ titus_id: randomNumber })
    }
  })

  // Minting
  const get_random_int = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // const _mint_ = async (tokenURI) => {
  //   const contract = new web3.eth.Contract(JSON.parse(abi), contract_address)
  //   const trans = await contract.methods.mint(`${tokenURI}`).send({ from: address, value: cost })
  //   console.log(trans)
  // }

  const get_random = async () => {
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

    console.log(rand_number)
    setRandomNumber(rand_number)
  }

  useEffect(() => {
    (async () => {
      await get_random()
    })()
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.hero_left}>
        <h1>GOLF AND CRYPTO <span>COME TOGETHER</span></h1>

        <div className={styles.form}>
          <h2><span>{supply > 0 ? supply - 3 : 0}</span> / 1818 MINTED!</h2>
          <h3>Price: <span>{cost / 10 ** 18}</span> ETH</h3>

          {isConnected ?
            <button id="btn-buy" className={styles.poppins} disabled={!write} onClick={() => write?.()}>
              Mint
            </button>
            :
            <button id="btn-connect1" className={`${styles.poppins} open-modal`} onClick={() => setProvider(true)}>
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

      {provider && <Provider setModal={setProvider} />}
    </section>
  )
}

export default Hero