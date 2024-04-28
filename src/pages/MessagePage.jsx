import {useParams} from 'react-router-dom'

function MessagePage() {
    const params = useParams();
    console.log(params);
    return (
        <div className="font-bold text-4xl text-blue-700 uppercase tracking-wide">
            Conversatie individuala, ID: {params.messageId}
        </div>
    );
}

export default MessagePage