/*
Ciprian 5 apr

If the user will have all convs on the left and the current one on the right, this file will remain
Otherwise, most likely it will be deleted
*/

import { NavLink, Outlet } from "react-router-dom";

function ConversationsPage() {
    const conversationsIds = [1, 2, 3, 4];
    return (
        <div className="flex gap-2">
            <div class="flex flex-col gap-2">
                {conversationsIds.map((convId) => (
                    // Highlight the selected conversation on the left navbar. Change the returned classes in order to do the final styling
                    <NavLink key={convId} to={`/conversation/${convId}`} className={({isActive}) => {
                        return isActive ? 'text-slate-500' : '';
                    }}>
                        ID conversatie: {convId}
                    </NavLink>
                ))}
            </div>
            <Outlet />
        </div>
    );
}

export default ConversationsPage