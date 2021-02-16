const PostCard = (props) => {
  const { firstName, lastName, ocrText } = props;
  let fullName = `${firstName} ${lastName}`;
  return (
    <div>
      <div>
        <h4>{fullName}</h4>
      </div>
      <div>
        <p>{ocrText}</p>
      </div>
    </div>
  );
};
export default PostCard;
