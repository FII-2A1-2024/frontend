import React, { useState, useEffect } from "react";
import CommentsForm from "./CommentsForm";
import "./index.css";
import UserPofile from "./user_profile.svg";
import upVotesSVG from "../Post/icons/shift_up.svg";
import downVotesSVG from "../Post/icons/shift_down.svg";
import commentsSVG from "../Post/icons/chat_bubble.svg";
import commentHideButton from "./icons/comment-hide-button.svg";
import commentUnhideButton from "./icons/comment-unhide-button.svg";
import editSVG from "./icons/edit.svg";
import { useTranslation } from "react-i18next";
import MessageLink from "../Messages/MessageLink";

const Comment = ({
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  currentUserId,
  deleteComment,
  addComment,
}) => {
  const { t } = useTranslation();
  const canEdit = currentUserId === comment.detaliiComentariu.author_id;
  const canDelete = currentUserId === comment.detaliiComentariu.author_id;
  const userId = parseInt(localStorage.getItem("UserId"), 10);
  const createdAt = new Date(
    comment.detaliiComentariu.created_at
  ).toLocaleDateString();
  const upVotesCount = comment.detaliiComentariu.votes;

  const [isHidden, setIsHidden] = useState(false);
  const [voted, setVoted] = useState(null);
  const [localUpVotesCount, setLocalUpVotesCount] = useState(upVotesCount);

  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.detaliiComentariu.id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.detaliiComentariu.id;

  const handleVote = (voteType) => {
    let newVoteCount = localUpVotesCount;
    if (voteType === "upvote" && voted !== "upvote") {
      newVoteCount = localUpVotesCount + 1;
      setVoted("upvote");
    } else if (voteType === "downvote" && voted !== "downvote") {
      newVoteCount = localUpVotesCount - 1;
      setVoted("downvote");
    } else if (voteType === "upvote" && voted === "upvote") {
      newVoteCount = localUpVotesCount - 1;
      setVoted(null);
    } else if (voteType === "downvote" && voted === "downvote") {
      newVoteCount = localUpVotesCount + 1;
      setVoted(null);
    }

    setLocalUpVotesCount(newVoteCount);
    updateComment(userId, comment.detaliiComentariu.id, { votes: newVoteCount });
  };

  const handleHideButton = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={UserPofile} alt="profile" />
        <div className="comment-hide-line">
          <div className="hide-line"></div>
        </div>
        <div className="comment-hide-button" onClick={handleHideButton}>
          <img
            src={isHidden ? commentUnhideButton : commentHideButton}
            alt="comment-hide-button"
          />
        </div>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-header">
            <MessageLink username={comment.detaliiComentariu.username == null ? "Filler" : comment.detaliiComentariu.username} id={400} type={"CommentLink"}/> 
            <div className="comment-createdAt">{createdAt}</div>
          </div>
          {!isEditing && (
            <div className="comment-text">
              {comment.detaliiComentariu.description}
            </div>
          )}
          {isEditing && (
            <CommentsForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.detaliiComentariu.description}
              handleSubmit={(text) => {
                const updateData = { description: text };
                updateComment(comment.detaliiComentariu.id, updateData);
              }}
              handleCancel={() => setActiveComment(null)}
            />
          )}
          <div className="comment-actions">
            <div className="comment-reacts">
              <div
                className="comments-react-btn comments-react-btn-upvotes"
                onClick={() => handleVote("upvote")}
              >
                <img src={upVotesSVG} alt="upVote" />
              </div>
              <p>{localUpVotesCount}</p>
              <div
                className="comments-react-btn comments-react-btn-upvotes"
                onClick={() => handleVote("downvote")}
              >
                <img src={downVotesSVG} alt="downVote" />
              </div>
            </div>

            <div
              className="comment-reacts comment-reply-btn"
              onClick={() =>
                setActiveComment({
                  id: comment.detaliiComentariu.id,
                  type: "replying",
                })
              }
            >
              <div className="btn">
                <img src={commentsSVG} alt="nush" className="SVG" />
              </div>
              <div>Reply</div>
            </div>

            {canEdit && (
              <div
                className="comment-reacts"
                onClick={() =>
                  setActiveComment({
                    id: comment.detaliiComentariu.id,
                    type: "editing",
                  })
                }
              >
                {" "}
                <div className="btn">
                  <img src={editSVG} alt="nush" className="SVG" />
                </div>
                <div>Edit</div>
              </div>
            )}
            {canDelete && (
              <div
                className="comment-reacts"
                onClick={() =>
                  deleteComment(
                    comment.detaliiComentariu.id,
                    comment.detaliiComentariu.parent_id
                  )
                }
              >
                Delete
              </div>
            )}
          </div>
        </div>
        {isReplying && (
          <CommentsForm
            submitLabel="Reply"
            handleSubmit={(text) =>
              addComment(
                text,
                comment.detaliiComentariu.id,
                comment.detaliiComentariu.post_id,
                comment.detaliiComentariu.author_id
              )
            }
            handleCancel={() => setActiveComment(null)}
          />
        )}
        {!isHidden &&
          comment.subcomentarii &&
          comment.subcomentarii.map((subComment) => (
            <Comment
              key={subComment.detaliiComentariu.id}
              comment={subComment}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              updateComment={updateComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
