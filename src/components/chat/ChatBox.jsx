import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import firebase from "firebase/app";

const ChatBox = ({ messageRef }) => {
  const [messageText, setMessageText] = useState("");
  const scrollDiv = useRef();

  const { currentUser } = useAuth();

  const handleMessageSend = async (evt) => {
    evt.preventDefault();
    const { uid, photoURL } = currentUser;

    await messageRef.add({
      messageText: messageText,
      createTime: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setMessageText("");
    scrollDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <form
        onSubmit={handleMessageSend}
        className="fixed w-full bottom-0 left-0 flex justify-center items-center md:mb-3"
      >
        <input
          type="text"
          value={messageText}
          className="p-3 w-10/12 md:w-5/12 bg-gray-200 md:border-2 md:border-gray-400 text-gray-700 focus:ring-2 ring-blue-400 md:rounded-md md:mr-3"
          onChange={(evt) => setMessageText(evt.target.value)}
          placeholder="type message here..."
        />
        <button
          className="bg-pink-600  text-pink-100 py-3 px-6 md:rounded-sm md:border-2 md:border-pink-600 uppercase tracking-wide md:w-1/12"
          type="submit"
        >
          Send
        </button>
      </form>
      <div ref={scrollDiv}></div>
    </>
  );
};
export default ChatBox;
