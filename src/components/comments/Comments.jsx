import { useState, useEffect } from "react";
import axios from "axios";
import Comment from './Comment';
import { createComment as createCommentApi, getComments as getCommentsApi, addComment as addCommentApi } from "./api";
import CommentsForm from './CommentsForm'

const Comments = ({ currentUserId, postId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments
    .filter(backendComment =>
      backendComment.detaliiComentariu.parent_id === -1
    );

 /* const addComment = (text, parentId, post_id, author_id) => {
    createCommentApi(text, parentId, post_id, author_id).then(newComment => {
      fetchComments(postId);
    });
    setActiveComment(null);
  };*/

   const addComment = async (text, parentId, post_id, author_id) => {
    try{

      const newComment = {
        detaliiComentariu : {
          id : Date.now(),
          post_id : post_id,
          parent_id: parentId,
          author_id : author_id,
          description: text,
          votes: 1,
          created_at: new Date().toISOString()
        }
      };

      const updatedComments = [...backendComments];
      if (parentId === -1) {
        //add a root level comment
        updatedComments.push(newComment);
      } else {
        addNewComment(updatedComments, parentId, newComment);
      }
      setBackendComments(updatedComments);

      //const updatedCommentsWithBackData = [...backendComments];
      //aici ar trebui sa iau raspunsul de la backend si sa il refac
      //--> getAll
      addCommentApi(text, parentId, post_id, author_id).then(() =>{
        fetchComments(postId);
      });
      
      //const createdComment = await createCommentApi(text, parentId, post_id, //author_id);
      setActiveComment(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }


  const updateComment = async (commentId, updateData) => {
    try {
      const updatedComments = [...backendComments];
      
      if (updateData.description !== undefined) {
        console.log("Updatam textul comentului");
        updateExistentComment(updatedComments, commentId, updateData);
        setBackendComments(updatedComments);
        const response = await axios.put(`http://localhost:3000/comments`, {
          id: commentId,
          description: updateData.description
        }).then(() => {
          fetchComments(postId);
        });
        console.log('Success:');
      } else if (updateData.votes !== undefined) {
        console.log("Updatam voturile comentului");
        updateExistentComment(updatedComments, commentId, updateData);
        setBackendComments(updatedComments);
        const response = await axios.put(`http://localhost:3000/comments`, {
          id: commentId,
          votes: updateData.votes
        }).then(() => {
          fetchComments(postId);
        });
        console.log('Success:');
      } else {
        throw new Error('Invalid update data');
      }
      setActiveComment(null);
      //fetchComments(postId);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const deleteComment = async (commentId, parent_id) => {
    try {
      const updatedComments = [...backendComments];
      console.log("trying to delete comment ...");
      deleteExistentComment(updatedComments, parent_id, commentId);
      setBackendComments(updatedComments);

      await axios.delete(`http://localhost:3000/comments?id=${commentId}`);
      fetchComments(postId);

    } catch (error) {
      console.error('Error:', error);
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
    for (let comment of comments) {
      if (comment.detaliiComentariu.id === parentId) {
          if (comment.detaliiComentariu.id === commentId) {
              // Remove the comment
              comments.splice(comments.indexOf(comment), 1);
              return;
          }
          if (comment.subcomentarii) {
              // Recursively search for the comment in subcomments
              deleteExistentComment(comment.subcomentarii, parentId, commentId);
          }
      }
  }
  };

  /* const getReplies = (commentId) => {
     return backendComments.filter(
       comment => 
         comment.detaliiComentariu.parent_id === commentId)
         .map(comment => comment.detaliiComentariu);
   };*/

  const fetchComments = (postId) => {
    getCommentsApi(postId).then((data) => {
      setBackendComments(data); 
      localStorage.setItem(`comments_${postId}`, JSON.stringify(data));
    });
  };



  useEffect(() => {
   // const cachedComments = localStorage.getItem(`comments_${postId}`);
    //if (cachedComments) {
    //  setBackendComments(JSON.parse(cachedComments));
   // } else {
      fetchComments(postId);
   // }
  }, [postId]);


  return (
    <div className="comments">
      {<CommentsForm submitLabel="Comment" hasCancelButton handleCancel={() => setActiveComment(null)} handleSubmit={(text) => addComment(
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