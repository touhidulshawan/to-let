import { useAuth } from "../../context/AuthContext";

const ChatMessage = (props) => {
  const { uid, messageText, photoURL } = props.message;
  const { currentUser } = useAuth();
  const messageClass = uid === currentUser.uid ? "sent" : "received";
  return (
    <div
      className={`flex items-center ${
        messageClass === "sent"
          ? "flex-row-reverse justify-start"
          : "justify-start"
      }`}
    >
      <img
        src={photoURL}
        alt="person"
        className={`w-10 h-10 rounded-full my-2 ${
          messageClass === "sent" ? "ml-2" : "mr-2"
        }`}
      />
      <p
        className={`${
          messageClass === "sent"
            ? "bg-blue-600 text-blue-50"
            : "bg-purple-700 text-purple-100"
        } py-2 px-4 rounded-xl shadow-sm `}
      >
        {messageText}
      </p>
    </div>
  );
};
export default ChatMessage;
