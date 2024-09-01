import NoDataFoundImage from "../public/no-data-bro.png";
import Image from "next/image";
import Link from "next/link";

const NoDataFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center relative">
      <Image src={NoDataFoundImage} alt="No Data Found" className="w-2/6" />
      <span className="text-4xl no-data-font mb-6 absolute bottom-14 text-[#E2E2B6]">Sorry! No data to display</span>
      <Link href="/vendor" passHref className="get-started">
        <span>Get Started</span>
      </Link>
    </div>
  );
};

export default NoDataFound;
