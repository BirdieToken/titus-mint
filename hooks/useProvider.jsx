import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

const useProvider = async (enableWeb3) => {
  const endpoint = 'https://rpc.ankr.com/eth'

  if (localStorage.walletconnect) {
    await enableWeb3({
      provider: 'walletconnect',
      chainId: 1
    })

    let provider = new WalletConnectProvider({
      rpc: {
        1: endpoint,
        // 4: 'https://rpc.ankr.com/eth_rinkeby'
      }
    })

    await provider.enable();

    return new Web3(provider)
  } else return new Web3(new Web3.providers.HttpProvider(endpoint))
}

export default useProvider