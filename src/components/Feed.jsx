import { useState, useEffect } from "react";
import firebase from "firebase";
import PostCard from "./PostCard";
import { v4 as uuidv4 } from "uuid";

const Feed = () => {
  const [textLists, setTextList] = useState();

  useEffect(() => {
    const ocrRef = firebase.database().ref("ocrText");
    ocrRef.on("value", (snapshot) => {
      const snaps = snapshot.val();
      const allData = [];
      for (let id in snaps) {
        allData.push({ id, ...snaps[id] });
      }
      setTextList(allData);
    });
  }, []);
  return (
    <div className="px-4 py-3">
      {textLists
        ? textLists.map(({ firstName, lastName, ocrText, id }) => (
            <PostCard
              key={uuidv4()}
              firstName={firstName}
              lastName={lastName}
              ocrText={ocrText}
            />
          ))
        : ""}
    </div>
  );
};
export default Feed;
