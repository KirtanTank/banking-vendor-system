import '../styles/globals.css';
import NavbarComp from '../components/Navbar';
import {SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps, session }) {
  return (
  <>
    <SessionProvider session={session}>
      <NavbarComp />
      <Component {...pageProps} />
    </SessionProvider>
  </>
  )
}

export default MyApp
