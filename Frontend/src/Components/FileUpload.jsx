import React, { useRef, useState } from "react";

const FileUploader = ({
   setTranscript,
  isTranscribing,
   setIsTranscribing,
}) => {
  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);

    const formData = new FormData();
    formData.append("file", fileUploaded);

    try {
      const uploadResponse = await fetch(
        "https://api.assemblyai.com/v2/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            authorization: "6b9c0fa6daaa4d3dbbd2fc31c1cf0bb4",
          },
        }
      );

      const uploadData = await uploadResponse.json();
      const audioUrl = uploadData.upload_url;

      const transcriptionResponse = await fetch(
        "https://api.assemblyai.com/v2/transcript",
        {
          method: "POST",
          headers: {
            authorization: "6b9c0fa6daaa4d3dbbd2fc31c1cf0bb4",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ audio_url: audioUrl }),
        }
      );

      const transcriptionData = await transcriptionResponse.json();
      const { id: transcriptId } = transcriptionData;

      const transcriptionReults = async () => {
        const response = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            headers: {
              authorization: "6b9c0fa6daaa4d3dbbd2fc31c1cf0bb4",
            },
          }
        );
        const result = await response.json();

        if (result.status === "completed") {
          setIsTranscribing(false);
          setTranscript(result.text);
                  } else if (result.status === "failed") {
          setIsTranscribing(false);
          console.error("Transcription failed:", result.error);
        } else {
        setTimeout(transcriptionReults, 5000);
        }
      };

      transcriptionReults();
      setTranscript("")

    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <>
      <button className="button-upload" onClick={handleClick}>
        <i className="fas fa-file-upload"></i>
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={fileInput}
        style={{ display: "none" }}
      />
      <div>
        {isTranscribing
          ? (
              <p>
                <img
                  src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                  alt="loading"
                />
              </p>
            ) || <p>Network Failure</p>
          : null}
      </div>
    </>
  );
};

export default FileUploader;
