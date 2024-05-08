import { useState, useEffect } from "react";
import axios from "axios";
//import {getComments as getCommentsApi, createComment as createCommentApi, updateComment as updateCommentApi} from "./api";
import Comment from './Comment';
import { createComment as createCommentApi, getComments as getCommentsApi, deleteComment as deleteCommentApi } from "./api";
//import { deleteComment as deleteCommentApi } from "./api";
import CommentsForm from './CommentsForm'

const Comments = ({ currentUserId, postId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments
    .filter(backendComment =>
      backendComment.detaliiComentariu.parent_id === -1
    );

  const addComment = (text, parentId, post_id, author_id) => {
    //console.log("AddComment", text, parentId);
    createCommentApi(text, parentId, post_id, author_id).then(newComment => {
      fetchComments(postId);
    });
    //setBackendComments(backendComments);
    setActiveComment(null);
  };

  const updateComment = async (commentId, updateData) => {
    try {
      if (updateData.description !== undefined) {
        // Update the comment text
        console.log("Updatam textul comentului");
        const response = await axios.put(`http://localhost:3000/comments`, {
          id: commentId,
          description: updateData.description
        });
        console.log('Success:', response.data);
      } else if (updateData.votes !== undefined) {
        // Update the number of votes
        const response = await axios.put(`http://localhost:3000/comments`, {
          id: commentId,
          votes: updateData.votes
        });
        console.log('Success:', response.data);
      } else {
        throw new Error('Invalid update data');
      }
      setActiveComment(null);
      fetchComments(postId);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/comments?id=${commentId}`);
      console.log('Success:', response.data);
      fetchComments(postId);
    } catch (error) {
      console.error('Error:', error);
    }

  };

  /*const addNewComment = (comments, parentId, newComment) => {
    for (let comment of comments) {
      if (comment.detaliiComentariu.id === parentId) {
        comment.subcomentarii = comment.subcomentarii || [];
        comment.subcomentarii.push(newComment);
        return;
      }
      if (comment.subcomentarii) {
        addNewComment(comment.subcomentarii, parentId, newComment);
      }
    }
  };*/

  /* const getReplies = (commentId) => {
     return backendComments.filter(
       comment => 
         comment.detaliiComentariu.parent_id === commentId)
         .map(comment => comment.detaliiComentariu);
   };*/

  const fetchComments = (postId) => {
    getCommentsApi(postId).then((data) => {
      setBackendComments(data); 
    });
  };

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);


  return (
    <div className="comments">
      {<CommentsForm submitLabel="Comment" hasCancelButton handleSubmit={(text) => addComment(
        text,
        -1,
        postId,
        currentUserId
      )} />}
      <div className="comments-container">
        {rootComments.map(rootComment => (
          <Comment
            key={rootComment.detaliiComentariu.id}
            comment={rootComment}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            updateComment={updateComment}
            activeComment={activeComment}
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