import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../media/icons/Ilustratie-log_in.svg";
import Signup from "../media/icons/Signup.svg";
import Homepage from "../media/icons/homepage.svg";
import LeftArrow from "../media/icons/arrow-left.svg";
import verify from "../media/icons/verify.svg";
import forgot from "../media/icons/forgot.svg";
import "../styles/Login.css";
import "../styles/Signup.css";
import socket from "../socket";
import { useTranslation } from "react-i18next";
import { useMessages } from "../components/Messages/MessageContext";

/* ************************************
1. npm install nodemon
2. npm install multer

3. in signUpService.js
  adauga console.log(verificationLink); dupa verificationLink ca sa vezi linkul de verificare

4. in resetPasswordController.js
  schimba linia asta:

  const resetLink = `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/resetPass/verify?token=${resetToken}`;

  in asta:

  const resetLink = `http://${process.env.SERVER_IP}:5173/reset?token=${resetToken}`;

  si adauga console.log(resetLink); dupa ea ca sa vezi linkul de resetare parola
************************************ */

function ConnectPage() {

  const navigate = useNavigate();
  const { updateMessages } = useMessages();

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage == "en" ? "ro" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const name = "Ugly Button";
  const [action, setAction] = useState("Log in");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    changeLanguage(localStorage.getItem("language"));

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
        email: email,
        password: password,
      };

      const data = JSON.stringify(userData);

      //api signup
      fetch(`${import.meta.env.VITE_URL_BACKEND}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const resCode = result.resCode;
          if (resCode === 200) {
            setAction("Verify");
            setEmailError(false);
          } else {
            setEmailError(true);
          }
        })
        .catch((err) => console.log(err));

      document.getElementById("form").reset();
    } else {
      const userData = {
        email: email,
        password: password,
        socket: socket.id,
      };
      const data = JSON.stringify(userData);

      //api login
      fetch(`${import.meta.env.VITE_URL_BACKEND}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          const resCode = result.resCode;
          localStorage.setItem("UserId", result.id);
          console.log(resCode);
          if (resCode === 200) {
            navigate("/main");
            localStorage.removeItem("messages");
            updateMessages({});
          } else if (resCode === 458) {
            setPasswordError(true);
          } else if (resCode === 454) {
            setEmailError(true);
          } else if (resCode == 459) {
            setEmailError(true);
            alert("UNVERIFIED EMAIL");
          }
        })
        .catch((err) => console.log(err));

      document.getElementById("loginForm1").reset();
      document.getElementById("loginForm2").reset();
      setEmailError(false);
      setPasswordError(false);
    }
  };

  const handleHomePageButtonClick = () => {
    document.querySelector(".homepage-container").style.display = "none";
    document.querySelector(".small-login-page-view").style.display = "flex";
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
  };

  const handleForgot = (event) => {
    event.preventDefault();
    setAction("Forgot");
    setPasswordError(false);
    setEmailError(false);
    setEmail();
  };
  const handleBack = (event) => {
    event.preventDefault();
    setEmailError(false);
    setAction("Log in");
  };
  const handleChange = (event) => {
    event.preventDefault();
    //trimite email pentru recuperare parola

    if (email != undefined) {
      setEmailError(false);
      const userData = {
        email: email,
      };
      const data = JSON.stringify(userData);

      fetch(`${import.meta.env.VITE_URL_BACKEND}/resetPass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            setAction("Verify2");
          } else {
            setEmailError(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setEmailError(true);
    }
  };

  return (
    <>
      {action === "Sign up" ? (
        <div className="overflow-x-hidden">
          <form
            onSubmit={Submit}
            id="form"
            className="min-h-screen signup-form flex flex-row justify-center back"
            autoComplete="on"
          >
            <div className="sign hide fundal w-full min-h-full">
              <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="flex flex-col items-center h-full">
                  <div className="image max-sm:w-3/5">
                    <img src={Homepage} alt="Homepage Image" />
                  </div>
                  <div className="mt-5 w-[354px] max-sm:w-[300px]">
                    <h1 className="max-md:text-4xl h1">{t("loginSignupH1")}</h1>
                    <p className="p py-3 text-gray-400">
                      Bine ai venit pe platforma noastră! Pentru a continua, te
                      rugăm să te loghezi sau să te înregistrezi
                    </p>
                  </div>
                  <div className="buttons w-[354px] max-sm:w-[300px]">
                    <button
                      className="signup-btn mb-[5px]"
                      type="button"
                      id="btn-homepage1"
                      onClick={() => {
                        setAction("Log in", handleHomePageButtonClick);
                      }}
                    >
                      Log in
                    </button>
                    <button
                      className="signup-btn-white"
                      id="btn-homepage2"
                      type="button"
                      onClick={handleHomePageButtonClick2Prevent}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-sm:w-screen hide2 my-auto main-content lg:flex-1 max-md:pt-16 px-5">
              <div className="text-left absolute left-5 top-5">
                <button
                  className="lg:hidden inapoi"
                  onClick={handleHomePageButtonClick3}
                  type="button"
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
              <div className="max-sm:w-4/5 w-[485px] h-[600px] m-auto">
                <div>
                  <div className="flex flex-row">
                    <cap-text>{t("signUpThing")}</cap-text>
                  </div>
                  <p className="leading-tight text-5xl font-semibold max-sm:text-3xl mt-2 text-left text-black">
                    {t("signUpGreeting")}
                  </p>
                  <div className="mb-5 flex flex-row">
                    <p
                      className=" text-base font-normal pr-1 mt-2"
                      htmlFor="signedAlready"
                    >
                      {t("signUpQuestion")}
                    </p>
                    <button
                      type="button"
                      className=" text-lg font-medium text-red-800 font-bold mt-2"
                      onClick={() => {
                        setAction("Log in");
                        setPasswordMatchError(false);
                        setEmailError(false);
                      }}
                    >
                      {t("loginButton")}
                    </button>
                  </div>
                </div>
                <div className="h-[430px]">
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
                      className={`back py-4 w-full px-4 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 ${
                        emailError ? "bg-red-300" : "border-gray-300"
                      }`}
                      placeholder="nume.student@student.uaic.ro"
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
                      {t("password")}
                    </label>
                    <input
                      type="password"
                      id="password"
                      className=" py-[14px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700  back"
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
                      {t("confirmPassword")}
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={` back py-3 w-full px-4 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 ${
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
                      {t("signUpButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-img lg:flex-[1.2] max-lg:hidden flex fundal">
              <img src={Signup} alt="img" />
            </div>
          </form>
        </div>
      ) : action === "Log in" ? (
        <div className="overflow-x-hidden">
          <div className="login-page-container desktop-view back">
            <div className="left-half fundal" id="gotoright">
              <img src={Login} alt="Login Image" className="login-img" />
            </div>

            <div className="right-half">
              <div className="upper-text">
                <cap-text>{t("startGossip")}</cap-text>

                <p className="leading-tight text-5xl font-semibold max-sm:text-3xl mt-2 text-left text-black">
                  {t("loginGreeting")}
                </p>
                <p id="p">
                  {t("loginQuestion")}
                  <a
                    href="#"
                    id="link"
                    onClick={() => {
                      setAction("Sign up");
                      setEmailError(false);
                      setPasswordError(false);
                    }}
                  >
                    {t("signUpButton")}
                  </a>
                </p>
              </div>
              <form
                onSubmit={Submit}
                action="#"
                method="post"
                id="loginForm1"
                autoComplete="on"
              >
                <h5 id="h5">Email</h5>
                <label className="usernameLabel">
                  <input
                    type="text"
                    name="username"
                    placeholder="nume.student@student.uaic.ro"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`focus:outline-none focus:ring-2 focus:ring-red-700 back ${
                      emailError ? "bg-red-300" : "border-gray-300"
                    }`}
                  />
                </label>
                <h5 id="h5">{t("password")}</h5>
                <label className="passwordLabel">
                  <input
                    type="password"
                    name="password"
                    placeholder="***********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`focus:outline-none focus:ring-2 focus:ring-red-700 back ${
                      passwordError ? "bg-red-300" : "border-gray-300"
                    }`}
                  />
                </label>
                <div id="forgetPassword">
                  <button type="button" onClick={handleForgot}>
                    {t("forgotButton")}
                  </button>
                </div>
                <button
                  type="submit"
                  className="login-btn"
                  id="login-btn1"
                  onClick={() => setAction("Log in")}
                >
                  {" "}
                  {t("loginButton")}{" "}
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
                <h1 id="h1">{t("loginSignupH1")}</h1>
                <p id="p">{t("loginSignupp")}</p>
              </div>
              <div className="buttons">
                <button
                  className="login-btn"
                  id="btn-homepage1"
                  onClick={handleHomePageButtonClick}
                  type="button"
                >
                  {t("loginButton")}
                </button>
                <button
                  className="signup-btn"
                  id="btn-homepage2"
                  type="button"
                  onClick={() => {
                    setAction("Sign up", handleHomePageButtonClick2);
                  }}
                >
                  {t("signUpButton")}
                </button>
              </div>
            </div>
          </div>

          {/*---------- Tablet/Phone View Login Page --------------*/}
          <div className="container small-login-page-view back min-h-screen mx-[0px] w-full">
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
                <cap-text>{t("startGossip")}</cap-text>
                <p className="leading-tight text-5xl font-semibold max-sm:text-3xl mt-2 text-left text-black">
                  {t("loginGreeting")}
                </p>
                <p id="p">
                  {t("loginQuestion")}
                  <a
                    href="#"
                    id="link"
                    onClick={() => {
                      setAction("Sign up");
                      setEmailError(false);
                      setPasswordError(false);
                    }}
                  >
                    {t("signUpButton")}
                  </a>
                </p>
              </div>
              <form
                onSubmit={Submit}
                action="#"
                method="post"
                id="loginForm2"
                autoComplete="on"
              >
                <h5 id="h5">Email</h5>
                <label className="usernameLabel">
                  <input
                    type="text"
                    name="username"
                    placeholder="nume.student@student.uaic.ro"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`focus:outline-none focus:ring-2 focus:ring-red-700 back ${
                      emailError ? "bg-red-300" : "border-gray-300"
                    }`}
                  />
                </label>
                <h5 id="h5">{t("password")}</h5>
                <label className="passwordLabel">
                  <input
                    type="password"
                    name="password"
                    placeholder="***********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`back focus:outline-none focus:ring-2 focus:ring-red-700 ${
                      passwordError ? "bg-red-300" : "border-gray-300"
                    }`}
                  />
                </label>
                <div id="forgetPassword">
                  <button type="button" onClick={handleForgot}>
                    {t("forgotButton")}
                  </button>
                </div>
                <button
                  type="submit"
                  className="login-btn"
                  id="login-btn2"
                  onClick={() =>
                    setAction("Log in", handleHomePageButtonClick2)
                  }
                >
                  {" "}
                  {t("loginButton")}{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : action === "Verify" ? (
        <div className="min-h-screen flex flex-col items-center confirma-bg">
          <div className="py-[20px] my-auto">
            <img
              src={verify}
              alt="image"
              className="w-[645px] h-[481px] mb-[26px] max-lg:h-[416px] max-lg:w-[558px] max-sm:h-[223px] max-sm:w-[299px]"
            />
            <div className="w-[496px] h-[213px] mx-auto flex flex-col justify-between items-center max-lg:h-[192px] max-lg:w-[496px] max-sm:h-[197px] max-sm:w-[320px]">
              <p className="h1-dc max-lg:text-4xl max-sm:text-2xl text-5xl font-semibold">
                {t("confirm")}
              </p>
              <p className="h1-dc max-lg:text-sm">{t("confirmp")}</p>
              <button
                type="button"
                onClick={() => setAction("Log in")}
                className="login-btn h1-dc w-[217px]"
              >
                {t("confirmButton")}
              </button>
            </div>
          </div>
        </div>
      ) : action === "Verify2" ? (
        <div className="min-h-screen flex flex-col items-center confirma-bg">
          <div className="py-[20px] my-auto">
            <img
              src={verify}
              alt="image"
              className="w-[645px] h-[481px] mb-[26px] max-lg:h-[416px] max-lg:w-[558px] max-sm:h-[223px] max-sm:w-[299px]"
            />
            <div className="w-[496px] h-[213px] mx-auto flex flex-col justify-between items-center max-lg:h-[192px] max-lg:w-[496px] max-sm:h-[197px] max-sm:w-[320px]">
              <p className="h1-dc max-lg:text-4xl max-sm:text-2xl text-5xl font-semibold">
                {t("confirmButton")}
              </p>
              <p className="h1-dc max-lg:text-sm">{t("confirmp")}</p>
              <button
                type="button"
                onClick={() => setAction("Log in")}
                className="login-btn h1-dc w-[217px]"
              >
                {t("confirmButton")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-hidden">
          <form
            onSubmit={Submit}
            id="form"
            className="min-h-screen signup-form flex flex-row justify-center  back"
            autoComplete="on"
          >
            <div className="left-img lg:flex-[1.2] max-lg:hidden flex">
              <img src={forgot} alt="img" />
            </div>
            <div className="max-sm:w-screen  my-auto main-content lg:flex-1 max-md:pt-16 px-5">
              <div className="max-sm:w-4/5 w-[485px]  m-auto flex flex-col justify-center">
                <div>
                  <p className="text-4xl font-semibold max-sm:text-3xl mt-2 text-left text-black">
                    {t("forgotButton")}
                  </p>
                  <div className="mb-5 flex flex-row">
                    <p className=" text-base font-normal pr-1 mt-4 text-left">
                      {t("forgotp")}
                    </p>
                  </div>
                </div>
                <div className="">
                  <label
                    className="font-bold block my-3  text-lg font-medium text-left text-black"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`py-4 w-full px-4 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700  back ${
                      emailError ? "bg-red-300" : "border-gray-300"
                    }`}
                    placeholder="nume.student@student.uaic.ro"
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
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="signup-btn mt-5"
                      id="signup-btn"
                      onClick={handleChange}
                    >
                      {t("resetPassword")}
                    </button>
                    <div className="mb-5 flex flex-row justify-center">
                      <p className=" text-base font-normal pr-1 text-left">
                        {t("resetBack")}
                        <button
                          type="button"
                          onClick={handleBack}
                          className="text-red-700 font-semibold"
                        >
                          {t("loginButton")}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ConnectPage;
