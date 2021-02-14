import { useState, useEffect, useRef } from "react";
import { createWorker } from "tesseract.js";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginImagePreview);

const ORC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [percentage, setPercentage] = useState("0.0");
  const [worker, setWorker] = useState({});

  //   create some ref
  let pond = useRef();

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

  return (
    <div className="container">
      <div>
        <FilePond
          ref={pond}
          onaddfile={(error, file) => startRecognition(file)}
          onremovefile={(error, file) => setRecognizedText("")}
        />
      </div>
      <div>
        {isProcessing ? (
          <p>Processing Image - {percentage}</p>
        ) : (
          <p>{recognizedText}</p>
        )}
      </div>
    </div>
  );
};

export default ORC;
