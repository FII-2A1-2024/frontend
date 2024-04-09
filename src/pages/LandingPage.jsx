import { Link } from "react-router-dom";
import Navbar_superior from "../components";

function LandingPage() {
    const name = 'Ugly Button';
    return (<>
        <h1>{name}</h1>
        <p>Pagina principala (main)</p>
        <Navbar_superior />
        <div className="flex flex-col gap-1 temporary">
            <Link to="/connect">Conectare</Link>
            <Link to="/conversation">Conversatii</Link>
        </div>
    </>);
}

export default LandingPage