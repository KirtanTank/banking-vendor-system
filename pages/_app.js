import '../styles/globals.css';
import Navbar from '../components/Navbar';
import {SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <div className='flex flex-col gap-5 mb-7'>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp
