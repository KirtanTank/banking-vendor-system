import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { SessionProvider, useSession } from "next-auth/react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MainApp Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function MainApp({ Component, pageProps }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { data: session, status } = useSession();
  const userId = session?.userId;

  useEffect(() => {
    if (status === "authenticated" && !userId) {
      setTimeout(() => {
        setShowLoginModal(true);
      }, 1000);
    } else {
      setShowLoginModal(false);
    }
  }, [status, userId]);

  if (status === "loading") {
    return <div className="min-w-full min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-[#BEFEA8] min-w-full min-h-screen">
      <div className="flex flex-col gap-5 w-full h-full">
        <Navbar session={session} setShowLoginModal={setShowLoginModal} />
        <Component {...pageProps} />
        <LoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          setShowRegisterModal={setShowRegisterModal}
        />
        <RegisterModal
          showRegisterModal={showRegisterModal}
          setShowRegisterModal={setShowRegisterModal}
        />
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      </div>
    </div>
  );
}

export default MyApp;
