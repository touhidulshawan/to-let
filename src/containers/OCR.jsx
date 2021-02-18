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
    try {
      if (currentUser && !isProcessing) {
        const { uid, displayName, photoURL } = currentUser;
        await ocrTextsRef.add({
          id: uuidv4(),
          ocrText: text,
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

  return (
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
  );
};

export default ORC;
