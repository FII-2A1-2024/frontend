/*
Ciprian 5 apr

Daca vom avea lista de mesaje in stanga iar o conversatie individuala pe restul ecranului, fisierul asta va ramane
Daca nu, va fi sters probabil
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