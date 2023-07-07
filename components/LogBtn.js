import {useSession, signIn, signOut} from 'next-auth/react'

const LogBtn = () => {
    const {data: session} = useSession()

    if(session){
        return ( 
            <div>
                {/* <p>{session.user.email}</p> */}
                <button id="logBtn" className="inline-flex items-center transition-all p-2 font-bold border-0 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base mt-4 md:mt-0" onClick={async ()=>{await signOut()}}>Logout</button>
            </div>
        );
    }
    else{
        return ( 
            <div>
                <button id="logBtn" className="inline-flex items-center transition-all p-2 font-bold border-0 focus:outline-none hover:bg-blue-700 hover:text-white rounded-md text-base mt-4 md:mt-0" onClick={async ()=>{await signIn()}}>Login</button>
            </div>
        );
    }
}
 
export default LogBtn;