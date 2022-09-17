import styles from './Provider.module.scss'
import { useMoralis } from 'react-moralis'

const Provider = ({ setModal }) => {
  const { authenticate } = useMoralis()

  const sign_in_walletconnect = async () => {
    await authenticate({
      provider: 'walletconnect',
      signingMessage: 'Sign in using WalletConnect.',
      chainId: 1
    })
    setModal(false)
  }

  const sign_in_metamask = async () => {
    await authenticate({
      signingMessage: 'Sign in using Metamask.',
      chainId: 1
    })
    setModal(false)
  }

  return (
    <div className={styles.provider}>
      <div className={styles.bg}></div>

      <div className={styles.app}>
        <button className={styles.wc} onClick={() => sign_in_walletconnect()}>
          Wallet Connect
          <img src={`/images/walletconnect.svg?${new Date()}`} />
        </button>

        <button className={styles.mm} onClick={() => sign_in_metamask()}>
          MetaMask
          <img src={`/images/metamask.svg?${new Date()}`} />
        </button>

        <div className={styles.close} onClick={() => setModal(false)}>
          Close Menu
        </div>
      </div>
    </div>
  )
}

export default Provider