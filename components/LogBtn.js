import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const LogBtn = ({setUserImage}) => {
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session) {
      setUserImage(session.user.image);
    }
  }, [session, setUserImage]);

  if (session) {
    return (
      <div>
        <button
          id="logBtn"
          className="inline-flex items-center transition-all p-2 font-bold border-0 focus:outline-none hover:bg-[#387F39] hover:text-white rounded-md text-base md:mt-0"
          onClick={async () => {
            await signOut();
          }}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          id="logBtn"
          className="inline-flex items-center transition-all p-2 font-bold border-0 focus:outline-none hover:bg-[#387F39] hover:text-white rounded-md text-base md:mt-0"
          onClick={async () => {
            await signIn();
          }}
        >
          Login
        </button>
      </div>
    );
  }
};

export default LogBtn;