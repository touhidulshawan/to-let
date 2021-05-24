import DeleteIcon from "./icons/DeleteIcon";
import { useAuth } from "../context/AuthContext";

const CommentCard = ({
  uid,
  displayName,
  photoURL,
  postTime,
  comment,
  commentID,
  handleRemove,
}) => {
  const { currentUser } = useAuth();
  return (
    <div className="my-2 py-1 flex justify-between items-start border-b border-gray-700">
      <div className="flex items-start justify-start gap-4 pb-4">
        <img
          className="w-12 h-12 rounded-full border-2 border-gray-300 p-1"
          src={photoURL}
          alt="userImage"
        />
        <div className="flex flex-col justify-center items-start">
          <h5 className=" font-bold text-gray-200">
            <span>{displayName}</span>
          </h5>
          <small className="text-gray-500">{postTime}</small>
          <p className="text-lg ">{comment}</p>
        </div>
      </div>
      <button
        className="mt-4 mr-3 text-red-500 disabled:opacity-50 disabled:cursor-not-allowed hover:text-red-700 focus:ring-2 focus:ring-red-600 p-2 rounded"
        disabled={uid !== currentUser.uid}
        onClick={() => handleRemove(commentID)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};
export default CommentCard;
