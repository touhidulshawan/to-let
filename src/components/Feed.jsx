import { useState, useEffect } from "react";
import { firestore } from "../Firebase";
import PostCard from "./PostCard";
import { useHistory } from "react-router-dom";

const Feed = () => {
  const [textLists, setTextList] = useState([]);
  const history = useHistory();

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

  // delete post
  const deletePost = (postID) => {
    firestore
      .collection("ocrTexts")
      .doc(postID)
      .delete()
      .then(() => {
        alert("Post Successfully Deleted");
        history.push("/");
      })
      .catch((error) => alert("Something Wrong! Please  try again."));
  };
  const renderPost =
    textLists &&
    textLists.map(({ displayName, ocrText, postTime, id, photoURL, uid }) => (
      <PostCard
        key={id}
        postID={id}
        userName={displayName}
        ocrText={ocrText}
        createdTime={postTime}
        photoURL={photoURL}
        uid={uid}
        deletePost={deletePost}
      />
    ));

  return <div className="px-4 py-3 flex flex-col-reverse">{renderPost}</div>;
};
export default Feed;
