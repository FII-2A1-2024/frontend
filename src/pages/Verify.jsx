import congrats from "../media/icons/congrats.svg";
import "../styles/Login.css";
import "../styles/Signup.css";

function Verify() {
  const handleLogin = (event) => {
    event.preventDefault();
    window.location.href = "/connect";
  };

  return (
    <>
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
              Ai confirmat email-ul cu succes! Te rugam sa te intorci la pagina
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
    </>
  );
}

export default Verify;
