import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import firebase from "firebase";
import { firestore } from "../Firebase";
import PostCard from "./PostCard";

const Feed = () => {
  const [textLists, setTextList] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("ocrTexts")
      .orderBy("createdTime")
      .limit(30)
      .onSnapshot((snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTextList(data);
      });

    return unsubscribe;
  }, []);

  const renderPost =
    textLists &&
    textLists.map(({ displayName, ocrText, postTime, id, photoURL }) => (
      <PostCard
        key={id}
        userName={displayName}
        ocrText={ocrText}
        createdTime={postTime}
        photoURL={photoURL}
      />
    ));

  return <div className="px-4 py-3 flex flex-col-reverse">{renderPost}</div>;
};
export default Feed;
