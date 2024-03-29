import Head from 'next/head'
import styles from './Layout.module.scss'

const Layout = ({children}) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link href="https://pro.fontawesome.com/releases/v6.0.0-beta3/css/all.css" rel="stylesheet" />
        <link rel="icon" href="/images/favicon.png" />
        <title>Birdie | VIP Pass</title>
      </Head>
      
      {children}
    </div>
  )
}

export default Layout
