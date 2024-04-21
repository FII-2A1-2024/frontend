import { useState, useEffect } from "react";
import Login from "../media/icons/Ilustratie-log_in.svg";
import Signup from "../media/icons/Signup.svg";
import Homepage from "../media/icons/homepage.svg";
import LeftArrow from "../media/icons/arrow-left.svg";
import "../styles/Login.css";
import "../styles/Signup.css";

//7 aprilie, tudor, log in/sign up form

function ConnectPage() {
  const name = "Ugly Button";
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  useEffect(() => {
    if (action == "Log in") {
      handleHomePageButtonClick();
    }
    if (action == "Sign up") {
      handleHomePageButtonClick2();
    }
  }, [action]);

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
    document.querySelector(".small-login-page-view").style.display = "flex";
    // const divToMove = document.querySelector(".right-half");
    // const destinationDiv = document.querySelector(".small-login-page-view");
    // destinationDiv.appendChild(divToMove);
    console.log("Specific button clicked!");
  };

  const handleHomePageButtonClick2 = (event) => {
    document.querySelector(".main-content").classList.remove("hide2");
    document.querySelector(".main-content").style.display = "block";
    document.querySelector(".sign").style.display = "none";
  };
  const handleHomePageButtonClick2Prevent = (event) => {
    event.preventDefault();
    document.querySelector(".main-content").classList.remove("hide2");
    document.querySelector(".main-content").style.display = "block";
    document.querySelector(".sign").style.display = "none";
  };
  const handleHomePageButtonClick3 = (event) => {
    event.preventDefault();
    document.querySelector(".main-content").classList.add("hide2");
    document.querySelector(".main-content").style.display = "";
    document.querySelector(".sign").style.display = "";
  };

  const functie = () => {
    document.querySelector(".small-login-page-view").style.display = "none";
    document.querySelector(".homepage-container").style.display = "flex";
    //const divToMove = document.querySelector(".right-half");
    // const destinationDiv = document.querySelector(".desktop-view");
    // destinationDiv.appendChild(divToMove);
  };

  return (
    <>
      {action === "Sign up" ? (
        <body className="overflow-x-hidden">
          <form
            onSubmit={Submit}
            id="form"
            className="min-h-screen signup-form flex flex-row justify-center"
          >
            <div className="sign my-auto hide">
              <div className="flex flex-col items-center">
                <div className="image max-sm:w-3/5">
                  <img src={Homepage} alt="Homepage Image" />
                </div>
                <div className="mt-5 w-[354px] max-sm:w-[300px]">
                  <h1 className="max-md:text-4xl h1">Ne bucurăm să te vedem</h1>
                  <p className="p py-3 text-gray-400">
                    Bine ai venit pe platforma noastră! Pentru a continua, te
                    rugăm să te loghezi sau să te înregistrezi
                  </p>
                </div>
                <div className="buttons w-[354px] max-sm:w-[300px]">
                  <button
                    className="signup-btn max-md:mb-[5px]"
                    id="btn-homepage"
                    onClick={() => {
                      setAction("Log in", handleHomePageButtonClick);
                    }}
                  >
                    Log in
                  </button>
                  <button
                    className="signup-btn-white"
                    id="btn-homepage"
                    onClick={handleHomePageButtonClick2Prevent}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>

            <div className="max-sm:w-screen hide2 my-auto main-content lg:flex-1 max-md:pt-16 md:pt-4">
              <div className="text-left absolute left-5 top-5">
                <button
                  className="lg:hidden inapoi"
                  onClick={handleHomePageButtonClick3}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </div>
              <div className="max-sm:w-4/5 w-[485px] h-[715px] m-auto">
                <div>
                  <div className="flex flex-row">
                    <cap-text>INREGISTREAZA-TE ACUM</cap-text>
                  </div>
                  <h1 className="h1 text-4xl font-semibold max-sm:text-3xl mt-2 text-left text-black">
                    Invata SQL rapid si usor cu noi.
                  </h1>
                  <div className="mb-5 flex flex-row">
                    <p
                      className=" text-base font-normal pr-1 mt-2"
                      htmlFor="signedAlready"
                    >
                      Ai deja un cont?
                    </p>
                    <button
                      type="button"
                      className=" text-lg font-medium text-red-800 font-bold mt-2"
                      onClick={() => setAction("Log in")}
                    >
                      Log in
                    </button>
                  </div>
                </div>
                <div className="h-[430px]">
                  <div className="h-[86]">
                    <label
                      className="font-bold block my-3  text-lg font-medium text-left text-black"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="py-4 w-full px-4 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                      placeholder="student"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <div className="flex flex-row justify-end -mt-10 mb-7 mr-3">
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
                  <div className="h-[86]">
                    <label
                      className="font-bold block my-3   text-lg font-medium text-left text-black"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className=" py-4 w-full px-4 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                      placeholder="numestudent@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="flex flex-row justify-end -mt-10 mb-7 mr-3">
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
                  <div className="h-[86]">
                    <label
                      className="font-bold block my-3  text-lg font-medium text-left text-black"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className=" py-[14px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                      placeholder="**********"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="flex flex-row justify-end -mt-10 mb-7 mr-3">
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
                  <div className="h-[86]">
                    <label
                      className="font-bold block my-3 text-lg font-medium text-left text-black"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={`py-3 w-full px-4 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 ${
                        passwordMatchError ? "bg-red-300" : "border-gray-300"
                      }`}
                      placeholder="**********"
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                      required
                    />
                    <div className="flex flex-row justify-end -mt-10 mb-7 mr-3">
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
                  <div className="h-[86]">
                    <button
                      type="submit"
                      className="signup-btn mt-5"
                      id="signup-btn"
                      onClick={() => {
                        setAction("Sign up");
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                  <div className="text-left font-normal text-sm text-gray-300">
                    Prin apăsarea butonului Crează cont, sunteți de acord cu
                    Politica de Confidențialitate. Pentru mai multe informații,
                    click aici
                  </div>
                </div>
              </div>
            </div>
            <div className="right-img lg:flex-1 max-lg:hidden flex">
              <img src={Signup} alt="img" />
            </div>
          </form>
        </body>
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
                  <a href="#" id="link" onClick={() => setAction("Sign up")}>
                    Sign up
                  </a>
                </p>
              </div>
              <form onSubmit={Submit} action="#" method="post" id="loginForm">
                <h5 id="h5">Email</h5>
                <label className="usernameLabel">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="login-btn"
                  id="login-btn"
                  onClick={() => setAction("Log in")}
                >
                  {" "}
                  Log in{" "}
                </button>
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
                  Bine ai venit pe platforma noastră! Pentru a continua, te
                  rugăm să te loghezi sau să te înregistrezi
                </p>
              </div>
              <div className="buttons">
                <button
                  className="login-btn"
                  id="btn-homepage"
                  onClick={handleHomePageButtonClick}
                >
                  Log in
                </button>
                <button
                  className="signup-btn"
                  id="btn-homepage"
                  onClick={() => {
                    setAction("Sign up", handleHomePageButtonClick2);
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>

          {/*---------- Tablet/Phone View Login Page --------------*/}
          <div className="container small-login-page-view">
            <div className="leftArrowContainer">
              <img
                src={LeftArrow}
                alt="Left Arrow"
                id="leftArrow"
                onClick={functie}
              />
            </div>

            <div className="right-half">
              <div className="upper-text">
                <cap-text> Începe bârfa </cap-text>
                <h1 id="h1">Bine ai revenit</h1>
                <p id="p">
                  Încă nu ai un cont?
                  <a href="#" id="link" onClick={() => setAction("Sign up")}>
                    Sign up
                  </a>
                </p>
              </div>
              <form onSubmit={Submit} action="#" method="post" id="loginForm">
                <h5 id="h5">Email</h5>
                <label className="usernameLabel">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="login-btn"
                  id="login-btn"
                  onClick={() =>
                    setAction("Log in", handleHomePageButtonClick2)
                  }
                >
                  {" "}
                  Log in{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConnectPage;
