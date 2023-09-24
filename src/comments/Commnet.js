import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUsername,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canDelete =
    currentUsername === comment.username && replies.length === 0;
  const canReply = Boolean(currentUsername);
  const canEdit = currentUsername === comment.username;
  const replyId = parentId ? parentId : comment.id;
  const lastModifiedDate = new Date(comment.lastModifiedDate).toLocaleDateString();
  const username = comment.username.substring(0,5)+ '*'.repeat(comment.username.length - 5);;

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div>
            <span className="comment-author">{username}</span>({lastModifiedDate})
          </div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {/* {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )} */}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUsername={currentUsername}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;