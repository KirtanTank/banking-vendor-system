import Link from "next/link";
import LogBtn from "./LogBtn";

const Navbar = () => {
    return (
        <div>
        <header className="text-black body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
                <span className="ml-3 text-xl">Vendor System</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/">
                        <span className="hover:bg-blue-700 transition-all hover:text-white rounded-md p-2 font-bold">Index</span>
                    </Link>
                    <Link href="/vendor">
                        <span className="hover:bg-blue-700 transition-all hover:text-white rounded-md p-2 font-bold">Vendor</span>
                    </Link>
                </nav>
                <LogBtn />
            </div>
        </header>
        </div>
        

     );
}
 
export default Navbar;