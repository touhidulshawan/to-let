import { useState } from "react";
import SendIcon from "./icons/SendIcon";
import { useAuth } from "../context/AuthContext";
import { firestore, FieldValue } from "../Firebase";
import Modal from "./Modal";

const CommentForm = ({ postID }) => {
  const [comment, setComment] = useState("");
  const { currentUser } = useAuth();
  const { uid, displayName, photoURL } = currentUser;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const selectedPost = firestore.collection("ocrTexts").doc(postID);
    try {
      selectedPost.update({
        comments: FieldValue.arrayUnion({
          uid,
          displayName,
          photoURL,
          comment,
          postTime: new Date().toDateString(),
        }),
      });
    } catch (err) {
      console.log(err);
      // <Modal modalMessage="Something wrong. Try again later" />;
    }
    setComment("");
  };

  return (
    <form className="flex flex-col gap-3 items-start" onSubmit={handleSubmit}>
      <textarea
        className=" resize-none h-auto px-2 py-1 border-2 border-gray-300 focus:border-transparent focus:ring-2 ring-blue-800 outline-none rounded w-full"
        type="text"
        name="messageBox"
        id="messageBox"
        placeholder="Write a comment here..."
        maxLength="300"
        wrap="true"
        rows={6}
        autoFocus
        required
        value={comment}
        onChange={(evt) => setComment(evt.target.value)}
      ></textarea>
      <button className="bg-blue-600 text-blue-100 px-4 py-1 rounded border-2 border-blue-600 tracking-wide flex items-center justify-center gap-1 outline-none hover:bg-blue-400 hover:text-blue-900 transition-all duration-200 ease-linear focus:border-transparent focus:ring-2 focus:ring-blue-400">
        <span>Post Now</span>
        <span>
          <SendIcon />
        </span>
      </button>
    </form>
  );
};
export default CommentForm;
