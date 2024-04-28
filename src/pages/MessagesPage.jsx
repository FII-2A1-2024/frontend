/*
Ciprian 5 apr
*/

import { NavLink, Outlet } from "react-router-dom";

import Navbar_superior from "../components/Navbar_superior";

function MessagesPage() {
    const messagesIds = [1, 2, 3, 4];
    return (
        <>
        <Navbar_superior />
        <div className="flex gap-2">
            <div className="flex flex-col gap-2">
                {messagesIds.map((messId) => (
                    // Highlight the selected conversation on the left navbar. Change the returned classes in order to do the final styling
                    <NavLink key={messId} to={`/messages/${messId}`} className={({isActive}) => {
                        return isActive ? 'text-slate-500' : '';
                    }}>
                        ID conversatie: {messId}
                    </NavLink>
                ))}
            </div>
            <Outlet />
        </div>
        </>
    );
}

export default MessagesPage