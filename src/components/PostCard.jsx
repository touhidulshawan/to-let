const PostCard = (props) => {
  const { userName, createdTime, ocrText, photoURL } = props;
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg mb-5 lg:w-6/12 lg:m-auto lg:mb-6">
      <div className="p-4 border-b-2 border-gray-200 mb-3 flex items-center">
        <div>
          <img
            className="w-12 h-12 rounded-full border-2 border-gray-300 p-1"
            src={photoURL}
            alt="user"
          />
        </div>
        <div>
          <h4 className="text-lg px-4 font-bold text-gray-800">{userName}</h4>
          <span className="text-sm px-4 text-gray-400">{`Posted on ${createdTime}`}</span>
        </div>
      </div>
      <div className="py-3 px-3 leading-7 lg:leading-8 lg:px-5">
        <p className="text-gray-800">{ocrText}</p>
      </div>
    </div>
  );
};
export default PostCard;
