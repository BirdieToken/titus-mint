import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

const getProvider = async (enableWeb3) => {
  const endpoint = 'https://rpc.ankr.com/eth'

  if (localStorage.walletconnect) {
    await enableWeb3({
      provider: 'walletconnect',
      chainId: 1
    })

    let provider = new WalletConnectProvider({
      rpc: {
        1: endpoint,
      }
    })

    await provider.enable();

    return new Web3(provider)
  } else {
    await enableWeb3({
      provider: 'metamask',
      chainId: 1
    })
    
    return new Web3(window.ethereum)
  }
}

export default getProvider