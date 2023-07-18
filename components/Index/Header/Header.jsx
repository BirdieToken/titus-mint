import styles from './Header.module.scss'
import { useState } from 'react'
//import { useAccount, useDisconnect } from 'wagmi'
import Provider from '../../Layout/Provider/Provider'

const Header = () => {
  /*const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const [provider, setProvider] = useState(false)

  return (
    <header className={styles.hdr}>
      <nav>
        <div>
          <img src={`/images/logo2.png`} alt='birdie token logo' />
        </div>

        <div>
          {isConnected ?
            <button
              onClick={() => disconnect()}
              className={`${styles.button} ${styles.button_blue} ${styles.button_hover} open_modal`}>
              {address.slice(0, 10)}
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
  )*/
  return(
    <></>
  )
}

export default Header