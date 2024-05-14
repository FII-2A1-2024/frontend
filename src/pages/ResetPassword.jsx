import { useState, useEffect } from "react";
import forgot from "../media/icons/forgot.svg";
import congrats from "../media/icons/congrats.svg";
import "../styles/Login.css";
import "../styles/Signup.css";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const { t } = useTranslation();
  const [action, setAction] = useState("Verify");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    const token = getUrlParameter("token");
    event.preventDefault();
    // trimite email pentru recuperare parola

    if (password !== confirmedPassword) {
      setPasswordMatchError(true);
      return;
    } else {
      setPasswordMatchError(false);
    }

    const userData = {
      password: password,
    };
    const data = JSON.stringify(userData);

    fetch(`http://localhost:3000/resetPass/verify?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((result) => {
        console.log(result);
        console.log(password);
      })
      .catch((err) => console.log(err));
    setAction("congrats");
  };
  function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const handleLogin = (event) => {
    event.preventDefault();
    window.location.href = "/connect";
  };

  return (
    <>
      {action === "Verify" ? (
        <div className="overflow-x-hidden">
          <form
            id="form"
            className="min-h-screen signup-form flex flex-row justify-center back"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="left-img lg:flex-[1.2] max-lg:hidden flex">
              <img alt="img" src={forgot} />
            </div>
            <div className="max-sm:w-screen  my-auto main-content lg:flex-1 max-md:pt-16 px-5">
              <div className="max-sm:w-4/5 w-[485px]  m-auto flex flex-col justify-center">
                <div>
                  <p className="text-4xl font-semibold max-sm:text-3xl mt-2 text-left text-black">
                    {t("reset")}
                  </p>
                  <div className="mb-5 flex flex-row">
                    <p className=" text-base font-normal pr-1 mt-4 text-left">
                      {t("resetp")}
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="h-[86]">
                    <label
                      className="font-bold block my-3 text-lg font-medium text-left text-black"
                      htmlFor="confirmPassword"
                    >
                      {t("password")}
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={` back py-3 w-full px-4 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 `}
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
                  <div className="">
                    <button
                      type="submit"
                      className="signup-btn mt-5"
                      id="signup-btn"
                    >
                      {t("resetPassword")}
                    </button>
                    <div className="mb-5 flex flex-row justify-center">
                      <p className=" text-base font-normal pr-1 text-left">
                        {t("resetBack")}
                        <button
                          type="button"
                          className="text-red-700 font-semibold"
                          onClick={handleLogin}
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
      ) : (
        <div className="min-h-screen flex flex-col items-center confirma-bg">
          <div className="py-[20px] my-auto">
            <img
              src={congrats}
              alt="image"
              className="w-[645px] h-[481px] mb-[26px] max-lg:h-[416px] max-lg:w-[558px] max-sm:h-[223px] max-sm:w-[299px]"
            />
            <div className="w-[496px] h-[213px] mx-auto flex flex-col justify-between items-center max-lg:h-[192px] max-lg:w-[496px] max-sm:h-[197px] max-sm:w-[320px]">
              <p className="h1-dc max-lg:text-4xl max-sm:text-2xl text-5xl font-semibold">
                Felicitari!
              </p>
              <p className="h1-dc max-lg:text-sm">
                Ai schimbat parola cu succes! Te rugam sa te intorci la pagina
                de login ca sa te poti conecta!
              </p>
              <button
                type="button"
                onClick={handleLogin}
                className="login-btn h1-dc w-[217px]"
              >
                Revino la login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
