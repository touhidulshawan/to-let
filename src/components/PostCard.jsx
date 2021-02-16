const PostCard = (props) => {
  const { firstName, lastName, ocrText } = props;
  let fullName = `${firstName} ${lastName}`;
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg mb-5">
      <div className="border-b-2 border-gray-200 mb-3">
        <h4 className="text-lg py-3 px-4 text-gray-800">{fullName}</h4>
      </div>
      <div className="py-3 px-3 leading-7">
        <p className="text-gray-800">{ocrText}</p>
      </div>
    </div>
  );
};
export default PostCard;
