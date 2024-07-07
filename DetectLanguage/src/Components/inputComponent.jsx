import React, { useState } from "react";
import ElementsComponents from "./ElementsComponent/ElementsComponents";
import AudioRecorder from "./speechComponent";

function InputComponent() {
  const [transcript, setTranscript] = useState("");

  return (
    <div className="inputFiled">
      <ElementsComponents transcript={transcript} />
      <AudioRecorder transcript={transcript} setTranscript={setTranscript} />
    </div>
  );
}

export default InputComponent;
