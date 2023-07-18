import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
//import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
//import { publicProvider } from 'wagmi/providers/public'
//import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
//import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

//const { chains, provider, webSocketProvider } = configureChains(
//  [mainnet],
//  [publicProvider()],
//)

//const client = createClient({
//  autoConnect: true,
//  connectors: [
//    new MetaMaskConnector({ chains }),
//    new WalletConnectConnector({
//      chains,
//      options: {
//        projectId: '18873e9664a85d2a9d860e1aec22af0f',
//      },
//    }),
//  ],
//  provider,
//  webSocketProvider,
//})

function MyApp({ Component, pageProps }) {
  return (

      <Layout>
        <Component {...pageProps} />
      </Layout>

  )
}

export default MyApp
