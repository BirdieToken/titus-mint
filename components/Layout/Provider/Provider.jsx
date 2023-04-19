import styles from './Provider.module.scss'
import { useConnect } from 'wagmi'

const Provider = ({ setModal }) => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <div className={styles.provider}>
      <div className={styles.bg}></div>

      <div className={styles.app}>
        {connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            className={connector.name == 'WalletConnect' ? styles.wc : styles.mm}
            key={connector.id}
            onClick={() => {
              connect({ connector })
              setModal(false)
            }}
          >
            <img src={connector.name == 'WalletConnect' ? `/images/walletconnect.svg` : `/images/metamask.svg`} />
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>
        ))}

        <div className={styles.close} onClick={() => setModal(false)}>
          Close Menu
        </div>
      </div>
    </div>
  )
}

export default Provider