import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import PasswordInput from "../../components/Input/PasswordInput"
import { useState } from "react";
import { validateEmail } from "../../utils/helper";

const Login = () => {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const handleLogin = (e) =>{
        e.preventDefault();
        
        if(!validateEmail(email)){
            setError("Please enter a valid email address.")
            return;
        }
        if(!password){
            setError("Please enter a valid password.")
            return;
            
        }
        setError("")
        /**
      * TODO : Login API Call
      */  
    }

     
    
    return (
    <div>
        <Navbar/>
        <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded-lg px-7 py-10">
                <form onSubmit={handleLogin}>
                    <h4 className="text-2xl mb-7">Login</h4>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="input-box"
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        value={email}
                    />
                    <PasswordInput 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                    <button type="submit" className="btn-primary">Login</button>
                    <p className="text-sm text-center mt-4">
                        Not registered yet ?{" "} <Link to="/signup" className="font-medium underline text-primary">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login