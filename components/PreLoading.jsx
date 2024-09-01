import Image from "next/image";
import PreLoadingLogo from '../public/Logo.png';

const Preloading = () => {
    return ( 
        <div className="min-w-full min-h-screen flex flex-col gap-4 items-center justify-center">
            <Image src={PreLoadingLogo} alt="logo" width={100} height={100} className="animate-spin"/>
            <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
     );
}
 
export default Preloading;