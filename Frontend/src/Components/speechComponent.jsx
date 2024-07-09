import React, { useRef, useState, useEffect } from "react";
const AudioRecorder = ({
  transcript,
  setTranscript,
  isTranscribing,
  setIsTranscribing,
}) => {
  const [recordedUrl, setRecordedUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [transcriptId, setTranscriptId] = useState(null);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerInterval = useRef(null);
  const audioPlayer = useRef(null);
 
  const apiKey = "6b9c0fa6daaa4d3dbbd2fc31c1cf0bb4";

  useEffect(() => {
    const getTranscript = async () => {
      try {
        if (!transcriptId) return;
       
        const response = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            headers: { authorization: apiKey },
          }
        );
        const results = await response.json();

        if (results.status === "completed") {
          setTranscript(results.text);
          setIsTranscribing(false);
        } else if (results.status === "failed") {
          console.error("Transcription failed");
          setIsTranscribing(false);
        } else {
          setTimeout(getTranscript, 5000);
        }
      } catch (error) {
        console.error("Network failure");
      }
    };
    getTranscript();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
        clearInterval(timerInterval.current);
        setElapsedTime(0);

        const file = new File([recordedBlob], "audio.webm", {
          type: "audio/webm",
        });
        transcribeAudio(file);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      timerInterval.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().map((track) => track.stop());
    }
  };

  const transcribeAudio = async (file) => {
    try {
      setIsTranscribing(true);
            const response = await fetch("https://api.assemblyai.com/v2/upload", {
        method: "POST",
        headers: {
          authorization: apiKey,
        },
        body: file,
      });

      const { upload_url } = await response.json();

      const transcriptResponse = await fetch(
        "https://api.assemblyai.com/v2/transcript",
        {
          method: "POST",
          headers: {
            authorization: apiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({ audio_url: upload_url }),
        }
      );

      const transcriptData = await transcriptResponse.json();
      setTranscriptId(transcriptData.id);
    } catch (error) {
      console.error("Network failure");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="divAudio">
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {isRecording && <p>Recording... {formatTime(elapsedTime)}</p>}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Transcription Results</h3>
        {isTranscribing ? (
          (
            <p>
              <img
                src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                alt="loading"
              />
            </p>
          ) || <p>Network Failure</p>
        ) : (
          <p>{transcript}</p>
        )}
        <div>
          {recordedUrl && (
            <audio ref={audioPlayer} src={recordedUrl} controls></audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
