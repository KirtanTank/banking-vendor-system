import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../public/Logo.png";
import Image from "next/image";
import { signOut } from 'next-auth/react';

const Navbar = ({ session, setShowLoginModal }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/',
    });
    window.location.href = '/';
  };

  const getNavLinkClass = (path) => {
    return router.pathname === path
      ? "bg-[#387F39] text-[#EEEEEE]"
      : "hover:bg-[#387F39] transition-all hover:text-[#EEEEEE]";
  };

  return (
    <div>
      <header className="text-#1F316F body-font bg-[#F6E96B] shadow-xl">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-#1F316F">
            <Image src={logo} alt="logo" width={50} height={50} />
            <span className="ml-3 text-2xl font-semibold no-data-font">
              VƎNDORVAULT
            </span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-5 no-data-font">
            <Link href="/" passHref>
              <span
                className={`${getNavLinkClass(
                  "/"
                )} rounded-md p-2 font-bold cursor-pointer`}
              >
                Home
              </span>
            </Link>
            <Link href="/vendor" passHref>
              <span
                className={`${getNavLinkClass(
                  "/vendor"
                )} rounded-md p-2 font-bold cursor-pointer`}
              >
                New Vendor
              </span>
            </Link>
            {session?.userId ? (
              <button className="rounded-md p-2 font-bold cursor-pointer hover:bg-[#387F39] transition-all hover:text-[#EEEEEE]"
              onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button className="rounded-md p-2 font-bold cursor-pointer hover:bg-[#387F39] transition-all hover:text-[#EEEEEE]"
              onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
