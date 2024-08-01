import { useState } from "react";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your name.");
      return;
    }

    if(!password){
      setError("Please a password.");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email.")
      return
    }

    setError('')

    /** 
     * TODOs: Sign Up Login - API Call
    */ 

  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded-lg px-7 py-10">
          <form onSubmit={handleSignIn}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />

            <PasswordInput
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4 ">
              Already have an account ?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
