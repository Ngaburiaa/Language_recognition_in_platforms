import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: '6b9c0fa6daaa4d3dbbd2fc31c1cf0bb4'
});

 const audioUrl=  "C:/Users/hp/Music/audio/Alan Walker - I Don't Wanna Go (Lyrics) ft. Julie Bergen 128 kbps.mp3"

    const config={
        audio_url:audioUrl
    }

  const run=async()=>{
    const transcript=await client.transcripts.create(config)
    console.log(transcript.text)
  }
run()

// console.log(import.meta.env.VITE_API_KEY);
