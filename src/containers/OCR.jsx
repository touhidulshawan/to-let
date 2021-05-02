import { useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import { useAuth } from "../context/AuthContext";
import firebase from "firebase/app";
import { firestore } from "../Firebase";
import { v4 as uuidv4 } from "uuid";

registerPlugin(FilePondPluginImagePreview);

const ORC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [percentage, setPercentage] = useState("0.0");
  const [worker, setWorker] = useState({});

  const { currentUser } = useAuth();
  //   create some ref
  let pond = useRef();
  // ref to database
  const ocrTextsRef = firestore.collection("ocrTexts");

  //   do the ocr
  const startRecognition = async (file) => {
    setIsProcessing(true);

    await worker.load();
    await worker.loadLanguage("ben");
    await worker.initialize("ben");

    const {
      data: { text },
    } = await worker.recognize(file.file);

    setIsProcessing(false);
    setRecognizedText(text);
  };

  const updateProgressStatus = (message) => {
    setPercentage("0.0");

    const MAX_PERCENTAGE = 1;
    const DECIMAL_COUNT = 2;

    if (message.status === "recognizing text") {
      let percentage = (message.progress / MAX_PERCENTAGE) * 100;
      setPercentage(percentage.toFixed(DECIMAL_COUNT));
    }
  };

  useEffect(() => {
    let worker = createWorker({
      logger: (message) => updateProgressStatus(message),
    });
    setWorker(worker);
  }, []);

  // handle change of textarea value
  const handleChange = (evt) => {
    setRecognizedText(evt.target.value);
  };

  // submit the form store data on database and create post
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (currentUser && !isProcessing) {
        const { uid, displayName, photoURL } = currentUser;
        await ocrTextsRef.add({
          id: uuidv4(),
          ocrText: recognizedText,
          createdTime: firebase.firestore.FieldValue.serverTimestamp(),
          postTime: new Date().toDateString(),
          uid,
          displayName,
          photoURL,
        });
      }
    } catch (e) {
      console.log(e);
    }
    setRecognizedText("");
  };

  return (
    <>
      <div className="mt-20  top-0 left-0">
        <div>
          <FilePond
            ref={pond}
            onaddfile={(error, file) => startRecognition(file)}
            onremovefile={(error, file) => setRecognizedText("")}
          />
        </div>
        <div>
          {isProcessing ? (
            <p className="py-4 px-6 bg-yellow-200 text-yellow-700">
              Processing Image - {percentage}%
            </p>
          ) : (
            <div
              className={` ${
                !isProcessing ? "hidden" : ""
              } w-full bg-white rounded-2xl shadow-lg mb-5 lg:w-8/12 lg:m-auto`}
            >
              <div className="border-b-2 border-gray-200 mb-3">
                <h4 className="text-lg py-3 px-4 text-gray-800">
                  Extracted Text
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-6/12 mx-auto">
        <form onSubmit={(evt) => handleSubmit(evt)}>
          <textarea
            className="w-full h-40 px-3 py-2 text-base text-gray-700 placeholder-gray-600 rounded-lg focus:shadow-outline bg-gray-50 border-2 border-blue-900 disabled:cursor-not-allowed disabled:opacity-50 my-4"
            name="extractedText"
            id="extractedTextField"
            cols="130"
            rows="10"
            value={recognizedText}
            disabled={isProcessing || recognizedText === ""}
            onChange={(evt) => handleChange(evt)}
          ></textarea>
          <button
            className="py-2 px-4 bg-transparent text-blue-600  border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing || recognizedText === ""}
          >
            Post Now
          </button>
        </form>
      </div>
    </>
  );
};

export default ORC;
