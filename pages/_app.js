import '../styles/globals.css';
import Navbar from '../components/Navbar';
import {SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps, session }) {
  return (
    <div className='bg-[#BEFEA8] min-w-full min-h-screen'>
      <SessionProvider session={session}>
        <div className='flex flex-col gap-5 w-full h-full'>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </div>
  );
}

export default MyApp
