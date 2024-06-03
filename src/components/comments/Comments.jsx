import { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import {
  createComment as createCommentApi,
  getComments as getCommentsApi,
  addComment as addCommentApi,
} from "./api";
import CommentsForm from "./CommentsForm";

const Comments = ({ currentUserId, postId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [isCommentWithSlurs, setIsCommentWIthSlurs] = useState(false);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.detaliiComentariu.parent_id === -1
  );

  /*
     how addComment function works
      ---> add this comment into the local Storage JSON (recursive search)
      ---> this will update instantly the UI
      ---> then POST the comment to backend
      ---> GET the comments (needed for ID of comments from the database)
   */
  const addComment = async (text, parentId, post_id, author_id) => {
    
    try {
      const newComment = {
        detaliiComentariu: {
          id: Date.now(),
          post_id: post_id,
          parent_id: parentId,
          username : localStorage.getItem('UserName'),
          author_id: author_id,
          description: text,
          votes: 0,
          created_at: new Date().toISOString(),
        },
      };

      const updatedComments = [...backendComments];
      if (parentId === -1) {
        //add a root level comment
        updatedComments.push(newComment);
      } else {
        addNewComment(updatedComments, parentId, newComment);
      }
      setBackendComments(updatedComments);
     addCommentApi(text, parentId, post_id, author_id).then((response) => {
         if (response == "Comment could not be added, it may contain slurs") {
            setIsCommentWIthSlurs(true);
            const updatedComments = [...backendComments];
            deleteExistentComment(updatedComments, parentId, newComment.detaliiComentariu.id);
            setBackendComments(updatedComments);
            setTimeout(() => {
              setIsCommentWIthSlurs(false);
          }, 3000); 
          
         } else {
            updateIdOfNewComment(updatedComments, newComment.detaliiComentariu.id, response.comment_id);
            setBackendComments(updatedComments);
         }
      });

      setActiveComment(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const updateComment = async (userId, commentId, updateData) => {
    try {
      const updatedComments = [...backendComments];

      if (updateData.description !== undefined) {
        console.log("Updatam textul comentului");
        updateExistentComment(updatedComments,  commentId, updateData);
        setBackendComments(updatedComments);
        setActiveComment(null);
        await axios
          .put(`${import.meta.env.VITE_URL_BACKEND}/comments`, {
            id: commentId,
            description: updateData.description,
            user_id: userId
          })
          .then(() => {
            //fetchComments(postId); we dont need to GET the comments back
          });
        console.log("Success:");
      } else if (updateData.votes !== undefined) {
        console.log("Updatam voturile comentului");
        updateExistentComment(updatedComments, userId, commentId, updateData);
        setBackendComments(updatedComments);
        setActiveComment(null);
        await axios
          .put(`${import.meta.env.VITE_URL_BACKEND}/comments`, {
            id: commentId,
            votes: updateData.votes,
            user_id: userId
          })
          .then(() => {
            //fetchComments(postId); we dont need to GET the comments back
            console.log("Success:");
          });
      } else {
        throw new Error("Invalid update data");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async (commentId, parent_id) => {
    try {
      const updatedComments = [...backendComments];
      deleteExistentComment(updatedComments, parent_id, commentId);
      setBackendComments(updatedComments);

      await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/comments?id=${commentId}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addNewComment = (comments, parentId, newComment) => {
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
  };

  const updateIdOfNewComment = (comments, commentId, backId) => {
    for (let comment of comments) {
      if (comment.detaliiComentariu.id === commentId) {
          
          comment.detaliiComentariu.id = backId;
          return;
      }
      if (comment.subcomentarii) {
        updateExistentComment(comment.subcomentarii, commentId, backId);
      }
    }
  };


  const updateExistentComment = (comments, commentId, updateData) => {
    for (let comment of comments) {
      if (comment.detaliiComentariu.id === commentId) {
        if (updateData.description !== undefined) {
          //actualizam textul comentariului
          comment.detaliiComentariu.description = updateData.description;
          return;
        } else if (updateData.votes !== undefined) {
          comment.detaliiComentariu.votes = updateData.votes;
          return;
        }
      }
      if (comment.subcomentarii) {
        updateExistentComment(comment.subcomentarii, commentId, updateData);
      }
    }
  };

  const deleteExistentComment = (comments, parentId, commentId) => {
    if (parentId === -1) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].detaliiComentariu.id === commentId) {
          comments.splice(i, 1);
          return;
        }
      }
    } else {
      for (let comment of comments) {
        if (comment.detaliiComentariu.id === parentId) {
          if (comment.subcomentarii) {
            for (let i = 0; i < comment.subcomentarii.length; i++) {
              if (comment.subcomentarii[i].detaliiComentariu.id === commentId) {
                comment.subcomentarii.splice(i, 1);
                return;
              }
            }
          }
        }
        if (comment.subcomentarii) {
          deleteExistentComment(comment.subcomentarii, parentId, commentId);
        }
      }
    }
  };

  const fetchComments = (postId) => {
    getCommentsApi(postId).then((data) => {
      setBackendComments(data);
      localStorage.setItem(`comments_${postId}`, JSON.stringify(data));
    });
  };

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  return (
    <div className="comments">
      {
        <CommentsForm
          submitLabel="Comment"
          hasCancelButton
          handleCancel={() => setActiveComment(null)}
          handleSubmit={(text) => addComment(text, -1, postId, currentUserId)}
        />
      }
      {isCommentWithSlurs && <div className="btn_message">The comment may contain slurs!</div>}
      <div className="comments-container">
        {rootComments.map((rootComment) => (
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
        ))}
      </div>
    </div>
  );
};

export default Comments;