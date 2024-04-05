/*
Ciprian 5 apr

If the user will have all convs on the left and the current one on the right, this file will remain
Otherwise, most likely it will be deleted
*/

import { Link } from "react-router-dom";

function ConversationsPage() {
    const conversationsIds = [1, 2, 3, 4];
    return (
        <div class="flex flex-col gap-2">
            {conversationsIds.map((convId) => (
                <Link key={convId} to={`/conversation/${convId}`}>
                    ID conversatie: {convId}
                </Link>
            ))}
        </div>
    );
}

export default ConversationsPage