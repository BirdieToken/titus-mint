import styles from './Header.module.scss'
import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import Provider from '../../Layout/Provider/Provider'

const Header = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const [provider, setProvider] = useState(false)

  return (
    <header className={styles.hdr}>
      <nav>
        <div>
          <img src={`/images/logo2.png`} alt='birdie token logo' onClick={() => window.open('/', '_self')} />
        </div>

        <div>
          <a className={`${styles.button} ${styles.button_white} ${styles.button_hover} ${styles.button_shadow}`} href='https://www.birdietoken.io/wp-content/uploads/2022/06/Birdie_WP_V2.pdf' target='_blank' rel='noreferrer'>Whitepaper</a>

          {isConnected ?
            <button
              onClick={() => disconnect()}
              className={`${styles.button} ${styles.button_blue} ${styles.button_hover} open_modal`}>
              {address.slice(0, 10)}...
            </button>
            :
            <button
              onClick={() => setProvider(true)}
              id='btn_connect'
              className={`${styles.button} ${styles.button_blue} ${styles.button_hover} open_modal`}>
              <i id='btn-connect-icon' className='fa-solid fa-plus'></i>
              Connect
            </button>
          }
        </div>
      </nav>

      {provider && <Provider setModal={setProvider} />}
    </header>
  )
}

export default Header