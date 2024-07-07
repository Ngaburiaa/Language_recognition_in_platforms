import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: '6b9c0fa6daaa4d3dbbd2fc31c1cf0bb4'
});

 const audioUrl=  "https://github.com/AssemblyAI-Community/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3"

    const config={
        audio_url:audioUrl
    }

  const run=async()=>{
    const transcript=await client.transcripts.transcribe(config)
    console.log(transcript.text)
  }
run()
       