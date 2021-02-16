import { useEffect, useState } from "react";
import OCR from "./OCR";
import NavBar from "../components/Navbar";
import firebase from "firebase/app";
import PostCard from "../components/PostCard";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [text, setText] = useState();
  const [users, setUsers] = useState();

  // useEffect(() => {
  //     // get recognized text from database
  //     const ocrTextRef = firebase.database().ref("ocrText");
  //     ocrTextRef.on('value', snapshot => {
  //         const ocrTexts = snapshot.val();
  //         const textList = []
  //         for (let id in ocrTexts) {
  //             textList.push({id, ...ocrTexts[id]})
  //         }
  //         setText(textList)
  //     })

  // get user information from database
  //     const userInfoRef = firebase.database().ref("users");
  //     userInfoRef.on('value', snapshot => {
  //         const userInformations = snapshot.val();
  //         const usersInfo = []
  //         for (let id in userInformations) {
  //             usersInfo.push({id, ...userInformations[id]})
  //         }
  //         setUsers(usersInfo)
  //     })
  //
  // }, [])
  return (
    <main>
      <NavBar />
      <div>
        <OCR />
      </div>
      {/*{renderPost}*/}
    </main>
  );
};
export default Home;
