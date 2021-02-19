import { useState, useEffect } from "react";
import { firestore } from "../../Firebase";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const { signOut } = useAuth();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createTime").limit(30);

  useEffect(() => {
    return query.onSnapshot((querySnapShot) => {
      const data = querySnapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });
  });

  const handleLogout = async () => {
    await signOut();
  };

  const renderMessages =
    messages &&
    messages.map((msg) => <ChatMessage key={msg.id} message={msg} />);
  return (
    <div className="md:w-12/12 m-auto">
      <div className="flex justify-end">
        <Link
          className="py-3  uppercase mt-2 mr-2 text-indigo-600 focus:ring-red-600 hover:text-blue-400 transition-all duration-300"
          to="/"
        >
          Home
        </Link>
        <button
          className="py-3 px-4  uppercase mt-2 mr-2 text-red-600 focus:ring-red-600 hover:text-red-300 transition-all duration-300"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
      <div
        style={{ height: "480px" }}
        className="w-full md:flex md:flex-col md:items-center "
      >
        <div
          className="py-4 px-2 md:w-6/12 md:m-auto md:border-4 md:border-gray-800 md:rounded-xl overflow-y-scroll"
          style={{ height: "480px" }}
        >
          {renderMessages}
        </div>
        <ChatBox messageRef={messagesRef} />
      </div>
    </div>
  );
};
export default Chat;
