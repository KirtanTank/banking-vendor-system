import Link from "next/link";
import { useRouter } from "next/router";
import LogBtn from "./LogBtn";
import logo from "../public/logo.png";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const getNavLinkClass = (path) => {
    return router.pathname === path
      ? "bg-blue-700 text-white"
      : "hover:bg-blue-700 transition-all hover:text-white";
  };

  return (
    <div>
      <header className="text-black body-font bg-blue-300 rounded-br-xl rounded-bl-xl shadow-xl">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
            <Image src={logo} alt="logo" width={40} height={40} />
            <span
              className="ml-3 text-2xl font-semibold"
              style={{ fontFamily: "Oswald, sans-serif", fontStyle: "normal" }}
            >
              VƎNDORVAULT
            </span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-5">
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
            <LogBtn />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
