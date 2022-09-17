import styles from './Header.module.scss'
import { useMoralis } from 'react-moralis'

const Header = () => {
  const { user, isAuthenticated, logout, authenticate } = useMoralis()

  const sign_in_walletconnect = async() => {
    await authenticate({
      provider: 'walletconnect',
      signingMessage: 'Sign in using WalletConnect.',
      chainId: 1
    })
  }

  return (
    <header className={styles.hdr}>
      <nav>
        <div>
          <img src={`/images/logo2.png?${new Date()}`} alt='birdie token logo' onClick={() => window.open('/', '_self')} />
        </div>

        <div>
          <a className={`${styles.button} ${styles.button_white} ${styles.button_hover} ${styles.button_shadow}`} href='https://www.birdietoken.io/wp-content/uploads/2021/10/BTWP.pdf' target='_blank' rel='noreferrer'>Whitepaper</a>

          {isAuthenticated ?
            <button
              onClick={() => logout()}
              className={`${styles.button} ${styles.button_blue} ${styles.button_hover} open_modal`}>
              {user.get('ethAddress').slice(0, 10)}...
            </button>
            :
            <button
              onClick={() => sign_in_walletconnect()}
              id='btn_connect'
              className={`${styles.button} ${styles.button_blue} ${styles.button_hover} open_modal`}>
              <i id='btn-connect-icon' className='fa-solid fa-plus'></i>
              Connect
            </button>
          }
        </div>
      </nav>
    </header>
  )
}

export default Header