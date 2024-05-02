import {useState, useEffect} from "react";
//import {getComments as getCommentsApi, createComment as createCommentApi, updateComment as updateCommentApi} from "./api";
import Comment from './Comment';
import { createComment as createCommentApi } from "./api";
//import { deleteComment as deleteCommentApi } from "./api";
//import CommentsForm from './CommentsForm'
import { getComments as getCommentsApi } from "./api";

const Comments  =({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments
          .filter(backendComment => 
            backendComment.detaliiComentariu.parent_id === -1
  );

  const addComment = (text, parentId, post_id, author_id) => {
      //console.log("AddComment", text, parentId);
      createCommentApi(text, parentId, post_id, author_id).then(newComment => {
          addNewComment(backendComments, parentId, newComment);
      });
      //setBackendComments(backendComments);
      setActiveComment(null);
  };

  const addNewComment = (comments, parentId, newComment) => {
    for (let comment of comments) {
      if (comment.detaliiComentariu.id === parentId) {
        // If the parent comment is found, add the new comment to its subcomentarii array
        comment.subcomentarii = comment.subcomentarii || [];
        comment.subcomentarii.push(newComment);
        return; // Exit the loop once the parent comment is updated
      }
      // If the parent comment is not found, recursively search in its subcomments
      if (comment.subcomentarii) {
        addNewComment(comment.subcomentarii, parentId, newComment);
      }
    }
  };

 /* const getReplies = (commentId) => {
    return backendComments.filter(
      comment => 
        comment.detaliiComentariu.parent_id === commentId)
        .map(comment => comment.detaliiComentariu);
  };*/

  console.log('backendComments', backendComments);

  useEffect(() => {
    getCommentsApi().then(data => {
      setBackendComments(data);
      console.log(backendComments);
    })
  }, []);


  return (
    <div className = "comments">
   {/* <CommentsForm submitLabel="Write" handleSubmit={addComment}/>*/}
    <div className="comments-container">
      {rootComments.map(rootComment => (
        <Comment 
          key = {rootComment.detaliiComentariu.id} 
          comment={rootComment} 
          currentUserId={currentUserId}
          //deleteComment={deleteComment}
          //updateComment={updateComment}
          activeComment ={activeComment}
          setActiveComment={setActiveComment}
          addComment={addComment}
          parentId={null}
          />
      )
    )}
    </div>
  </div>
  );
};

export default Comments