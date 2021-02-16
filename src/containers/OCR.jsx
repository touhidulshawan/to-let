import { useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import firebase from "firebase/app";

registerPlugin(FilePondPluginImagePreview);

const ORC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [percentage, setPercentage] = useState("0.0");
  const [worker, setWorker] = useState({});

  //   create some ref
  let pond = useRef();

  const updateOCR = async (content) => {
    const userInfoRef = firebase.database().ref("users");
    const dataRef = firebase.database().ref("ocrText");
    let users = [];

    userInfoRef.on("value", (snapshot) => {
      const user = snapshot.val();
      for (let id in user) {
        users.push({ id, ...user[id], ocrText: content });
      }
    });
    console.log(users);
    users.map((user) => {
      return dataRef.push({ ...user });
    });
  };
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
    await updateOCR(text);
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
            <div className="py-3 px-3 leading-7">
              <p className="text-gray-800">{recognizedText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ORC;
