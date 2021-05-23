const CommentCard = ({ uid, displayName, photoURL, postTime, comment }) => {
  return (
    <div>
      <h3>Comments</h3>
      <div>
        <div>
          <img src={photoURL} alt="userImage" />
          <div>
            <h5>{displayName}</h5>
            <small>{postTime}</small>
          </div>
        </div>
        <div>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
