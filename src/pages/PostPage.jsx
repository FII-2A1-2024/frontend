import {useParams} from 'react-router-dom'

function PostPage() {
    const params = useParams();
    console.log(params);
    return (
        <div className="font-bold text-4xl text-blue-700 uppercase tracking-wide">
            Postare individuala, ID: {params.postId}
        </div>
    );
}

export default PostPage