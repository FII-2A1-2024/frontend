import { useState } from "react";
import Login from "../media/icons/login.svg"
import Homepage from "../media/icons/homepage.svg"
import LeftArrow from "../media/icons/arrow-left.svg"
import "../styles/Login.css"

//7 aprilie, tudor, log in/sign up form

function ConnectPage() {
  const name = "Ugly Button";
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, SetConfirmedPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const Submit = async (event) => {
    event.preventDefault();

    if (action == "Sign up") {
      if (password !== confirmedPassword) {
        setPasswordMatchError(true);
        return;
      } else {
        setPasswordMatchError(false);
      }

      const userData = {
        username: username,
        email: email,
        password: password,
        confirmedPassword: confirmedPassword,
      };

      const data = JSON.stringify(userData);

      //api de testare
      fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
        document.getElementById("form").reset();
    } else {
      const userData = {
        username: username,
        email: email,
      };
      const data = JSON.stringify(userData);
      fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log(err)); 
      console.log("log in");
      document.getElementById("loginForm").reset();
    }

    
  };

  const handleHomePageButtonClick = () => {
      document.querySelector(".homepage-container").style.display = "none";
      document.querySelector(".small-login-page-view").style.display = "block";
      const divToMove = document.querySelector(".right-half");
      const destinationDiv = document.querySelector(".small-login-page-view");
      destinationDiv.appendChild(divToMove);
      console.log("Specific button clicked!");
  };

  const functie = () => {
    document.querySelector(".small-login-page-view").style.display = "none";
    document.querySelector(".homepage-container").style.display = "flex";
    const divToMove = document.querySelector(".right-half");
    const destinationDiv = document.querySelector(".desktop-view");
    destinationDiv.appendChild(divToMove);
  };

  return (
    <>
      {action === "Sign up" ? (
        <form
          onSubmit={Submit}
          id="form"
          className="h-screen flex flex-row justify-center"
        >
          <div className="p-5 lg:flex-1 flex flex-col">
            <div className="m-auto">
              <h1 className="max-lg:text-4xl text-5xl font-bold mb-5 mt-5 text-left text-black">
                {action == "Sign up" ? "Inregistreaza-te acum" : ""}
              </h1>
              <div className="mb-5 flex flex-row">
                <label className="max-lg:text-sm pr-2" htmlFor="signedAlready">
                  Ai deja un cont?
                </label>
                <button
                  type="button"
                  className="max-lg:text-sm  text-red-900 font-bold"
                  onClick={() => setAction("Log in")}
                >
                  Log in
                </button>
              </div>
              <div>
                <label
                  className="font-bold block my-3  max-lg:text-sm text-lg font-medium text-left text-black"
                  htmlFor="username"
                >
                  Nume
                </label>
                <input
                  type="text"
                  id="username"
                  className="max-lg:text-sm py-3 w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                  placeholder="introdu numele"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="flex flex-row justify-end -mt-9 mb-7 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="gray"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label
                  className="font-bold block my-3  max-lg:text-sm text-lg font-medium text-left text-black"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="max-lg:text-sm py-3 w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                  placeholder="introdu emailul"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex flex-row justify-end -mt-9 mb-7 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label
                  className="font-bold block my-3  max-lg:text-sm text-lg font-medium text-left text-black"
                  htmlFor="password"
                >
                  Parola
                </label>
                <input
                  type="password"
                  id="password"
                  className="max-lg:text-sm  py-3 w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                  placeholder="introdu parola"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex flex-row justify-end -mt-9 mb-7 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label
                  className="font-bold block my-3 max-lg:text-sm text-lg font-medium text-left text-black"
                  htmlFor="confirmPassword"
                >
                  Confirma parola
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`max-lg:text-sm py-3 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 ${
                    passwordMatchError ? "bg-red-300" : "border-gray-400"
                  }`}
                  placeholder="confirma parola"
                  onChange={(e) => SetConfirmedPassword(e.target.value)}
                  required
                />
                <div className="flex flex-row justify-end -mt-9 mb-7 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gray"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="max-lg:text-sm py-3 mt-10 w-full bg-red-900 text-white px-4 py-2 rounded-md"
                  onClick={() => setAction("Sign up")}
                >
                  Creaza cont
                </button>
              </div>
            </div>
          </div>
          <div className="lg:flex-1 max-lg:hidden flex justify-center m-auto">
            Imagine
          </div>
        </form>
      ) : (
        <div>
        <div className="container desktop-view">
        <div className="left-half" id="gotoright">
          <img src={Login} alt="Login Image" className="login-img" />
        </div>
  
        <div className="right-half">
          <div className="upper-text">
            <cap-text> Începe bârfa </cap-text>
            <h1 id="h1">Bine ai revenit</h1>
            <p id="p">
              Încă nu ai un cont? 
              <a href="#" id="link" onClick={() => setAction("Sign up")}>Sign up</a>
            </p>
          </div>
          <form onSubmit={Submit} action="#" method="post" id="loginForm">
            <h5 id="h5">Email</h5>
            <label className="usernameLabel">
              <input
                type="text"
                name="username"
                placeholder="Username"
                id="loginInputUsername"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <h5 id="h5">Parola</h5>
            <label className="passwordLabel">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="loginInputPassword"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="login-btn" id="login-btn" onClick={() => setAction("Log in")}> Log in </button>
          </form>
        </div>
      </div>

    {/*----------Tablet View Homepage----------*/}
    <div className="homepage-container tablet-view">
      <div className="content-homepage">
        <div className="image">
          <img src={Homepage} alt="Homepage Image" />
        </div>
        <div className="text-content">
          <h1 id="h1">Ne bucurăm să te vedem</h1>
          <p id="p">
            Bine ai venit pe platforma noastră! Pentru a continua, te rugăm să
            te loghezi sau să te înregistrezi
          </p>
        </div>
        <div className="buttons">
        <button className="login-btn" id="btn-homepage" onClick={handleHomePageButtonClick}>Log in</button>
          <button className="signup-btn" id="btn-homepage">Sign up</button>
        </div>
      </div>
    </div>

    {/*---------- Tablet/Phone View Login Page --------------*/}
    <div className="container small-login-page-view">
      <img src={LeftArrow} alt="Left Arrow" id="leftArrow" onClick={functie}/> 
    </div>
      </div>
     )
      }
    </>
  );
}

export default ConnectPage;
