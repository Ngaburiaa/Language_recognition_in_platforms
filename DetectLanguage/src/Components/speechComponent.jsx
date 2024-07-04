
import React, { useRef, useState, } from 'react';

const AudioRecorder = () => {
  const [recordedUrl, setRecordedUrl] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const timerInterval = useRef(null);
  const audioPlayer = useRef(null);

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
        const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];
        clearInterval(timerInterval.current);
        setElapsedTime(0);
        if (audioPlayer.current) {
          audioPlayer.current.currentTime = 0;
          audioPlayer.current.pause();
        }
        // Save the audio file
        const file = new File([recordedBlob], 'audio.webm', {
          type: 'audio/webm',
        });
        setAudioFile(file);
        // Transcribe audio immediately after recording stops
        transcribeAudio(file);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      timerInterval.current = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (audioPlayer.current) {
            audioPlayer.current.currentTime = prevTime + 1;
          }
          return prevTime + 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
    }
  };

  const transcribeAudio = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: "POST",
      headers: {
        'x-gladia-key': 'e583fb74-615b-45d8-90f3-9ddbe89eda74',
      },
      body: formData,
    };
    fetch('https://api.gladia.io/v2/upload', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setTranscript(response.transcript || 'Transcription failed');
      })
      .catch(err => console.error(err));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <audio ref={audioPlayer} controls src={recordedUrl} />
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {isRecording && <p>Recording... {formatTime(elapsedTime)}</p>}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Transcription</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default AudioRecorder;




