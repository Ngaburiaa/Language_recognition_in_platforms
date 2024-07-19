import React, { useState } from "react";
import ElementsComponents from "./ElementsComponent/ElementsComponents";
import AudioRecorder from "./speechComponent";
import FileUploader from "./FileUpload";

function InputComponent() {
const [transcript, setTranscript] = useState("");
const [isTranscribing, setIsTranscribing] = useState(false);
 const local= JSON.parse(localStorage.getItem("UserName"))


  return (
 
    <div className="inputFiled">
      <p style={{fontSize:"1.69em",fontWeight:"700"}}>Welcome {local}</p>
      
      <FileUploader
        setTranscript={setTranscript}
        setIsTranscribing={setIsTranscribing}
      />
      <ElementsComponents transcript={transcript} setTranscript={setTranscript} />
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
