import { useState, useEffect } from "react";
import { firestore } from "../Firebase";
import PostCard from "./PostCard";
import Modal from "./Modal";

const Feed = () => {
  const [textLists, setTextList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

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
        setShowModal(true);
      })
      .catch((error) => {
        setErrorModal(true);
      });
  };
  const renderPost =
    textLists &&
    textLists.map(
      ({ displayName, ocrText, postTime, id, photoURL, uid, comments }) => (
        <PostCard
          key={id}
          postID={id}
          userName={displayName}
          ocrText={ocrText}
          createdTime={postTime}
          photoURL={photoURL}
          uid={uid}
          deletePost={deletePost}
          comments={comments}
        />
      )
    );

  return (
    <div className="px-4 py-3 flex flex-col-reverse">
      {renderPost}
      {showModal ? (
        <Modal modalMessage="Post has been removed successfully." success />
      ) : null}
      {errorModal ? (
        <Modal modalMessage="Something wrong! Please try again." />
      ) : null}
    </div>
  );
};
export default Feed;
