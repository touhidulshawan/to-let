import DeleteIcon from "./icons/DeleteIcon";
import { useAuth } from "../context/AuthContext";
import CommentIcon from "./icons/CommentIcon";
import { useState } from "react";
import Modal from "./Modal";
import CommentCard from "./CommentCard";
import { FieldValue, firestore } from "../Firebase";

const PostCard = (props) => {
  const {
    userName,
    createdTime,
    ocrText,
    photoURL,
    uid,
    postID,
    deletePost,
    comments,
  } = props;

  const { currentUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const removeComment = (commentID) => {
    firestore
      .collection("ocrTexts")
      .doc(postID)
      .update({
        comments: FieldValue.arrayRemove(postID === commentID),
      })
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => {
        setErrorModal(true);
      });
  };
  const handleCommentModal = () => {
    setShowCommentModal(!showCommentModal);
  };
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg mb-5 lg:w-6/12 lg:m-auto lg:mb-6">
      <div className="p-4 border-b-2 border-gray-200 mb-3 flex justify-between items-center ">
        <div className="flex items-center">
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
        <div className="flex items-center gap-2">
          <button
            className=" p-1 text-purple-600 hover:text-purple-400 transition duration-300 ease-linear focus:ring-2 focus:ring-purple-300 rounded outline none"
            onClick={() => setShowCommentModal(handleCommentModal)}
          >
            <CommentIcon />
          </button>
          <div className="border-r-2 w-1 h-8"></div>
          <button
            className="text-red-500 disabled:opacity-50 disabled:cursor-not-allowed hover:text-red-700 focus:ring-2 focus:ring-red-600 p-2 rounded"
            disabled={uid !== currentUser.uid}
            onClick={() => deletePost(postID)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="py-3 px-3 leading-7 lg:leading-8 lg:px-5">
        <p className="text-gray-800">{ocrText}</p>
      </div>
      {/* display comment here  */}
      <div className="grid grid-cols-1 gap-1 py-1 px-3 border-t-2 border-blue-300 bg-gray-800 text-gray-100 rounded-b-2xl">
        <h3 className=" tracking-wide text-lg pb-3 border-b-2 border-gray-400">
          Comments
        </h3>
        {comments.length > 0 ? (
          comments.map((c) => (
            <CommentCard
              key={c.postID}
              postID={c.postID}
              uid={c.uid}
              displayName={c.displayName}
              photoURL={c.photoURL}
              postTime={c.postTime}
              comment={c.comment}
              handleRemove={removeComment}
            />
          ))
        ) : (
          <p className="text-center p-4 text-gray-400 text-lg">
            No comments found
          </p>
        )}
      </div>
      {showCommentModal ? (
        <Modal
          modaltype="comment"
          id={postID}
          handleCommentModal={handleCommentModal}
        />
      ) : null}
      {showModal ? (
        <Modal modalMessage="Comment has been removed successfully." success />
      ) : null}
      {errorModal ? (
        <Modal modalMessage="Something wrong! Please try again." />
      ) : null}
    </div>
  );
};
export default PostCard;
