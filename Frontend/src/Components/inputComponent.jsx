import React, { useState } from "react";
import ElementsComponents from "./ElementsComponent/ElementsComponents";
import AudioRecorder from "./speechComponent";
import FileUploader from "./FileUpload";

function InputComponent() {
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  return (
    <div className="inputFiled">
      <FileUploader
        setTranscript={setTranscript}
        isTranscribing={isTranscribing}
        setIsTranscribing={setIsTranscribing}
      />
      <ElementsComponents transcript={transcript} />
      <AudioRecorder
        transcript={transcript}
        setTranscript={setTranscript}
        isTranscribing={isTranscribing}
        setIsTranscribing={setIsTranscribing}
      />
    </div>
  );
}

export default InputComponent;
