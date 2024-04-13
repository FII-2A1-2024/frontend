import { useState } from "react";

//7 aprilie, tudor, log in/sign up form

function ConnectPage() {
  const name = "Ugly Button";
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, SetConfirmedPassword] = useState("");
  const [passwordMatchError,setPasswordMatchError] = useState(false);
  const Submit = async (event) => {
    event.preventDefault();
    
    if(action=="Sign up"){
      if(password!==confirmedPassword){
        setPasswordMatchError(true);
        return;
      }else{
        setPasswordMatchError(false);
      }
  
      const userData={
        username:username,
        email:email,
        password:password,
        confirmedPassword:confirmedPassword
      };
  
      const data=JSON.stringify(userData);
  
      //api de testare
      fetch('https://reqres.in/api/users',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:data
      }).then(res=>res.json()).then(result=>console.log(result)).catch(err=>console.log(err))
    }else{
      console.log("log in");
    }

    document.getElementById("form").reset();
  };
  return (
    <>
      <h1>{name}</h1>
      <form onSubmit={Submit} id="form">
        {action === "Sign up" ? (
          <div>
            <h1>{action}</h1>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="border-solid border-2 border-black"
                placeholder="enter username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="border-solid border-2 border-black"
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="border-solid border-2 border-black"
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                className={`border-solid border-2 border-black ${passwordMatchError?'border-red-500':'border-black-500'}`}
                placeholder="enter password"
                onChange={(e) => SetConfirmedPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" onClick={() => setAction("Sign up")}>
                Sign Up
              </button>
              <button type="button" onClick={() => setAction("Log in")}>
                Log in
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1>{action}</h1>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="border-solid border-2 border-black"
                placeholder="enter username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="border-solid border-2 border-black"
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="button" onClick={() => setAction("Sign up")}>
                Sign Up
              </button>
              <button type="submit" onClick={() => setAction("Log in")}>
                Log in
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default ConnectPage;
