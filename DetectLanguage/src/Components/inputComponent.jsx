import React from "react";
import ElementsComponents from "./ElementsComponent/ElementsComponents";
import AudioRecorder from "./speechComponent";


function InputComponent() {
  return <div className="inputFiled">
    <ElementsComponents/>
    <AudioRecorder/>
   
  </div>;
}

export default InputComponent;
