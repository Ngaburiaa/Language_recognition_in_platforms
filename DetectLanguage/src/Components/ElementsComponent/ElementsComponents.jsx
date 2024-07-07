import React, { useState } from "react";

function ElementsComponents({transcript}) {
  const [textToBeTranslated, setTextToBeTranslated] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");

  const translateText = () => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "A3T3YDQSBFT3fbqM0puqZ9ozVcU3stSR");

    const raw = textToBeTranslated||transcript;

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw, targetLanguage),
      redirect: "follow",
    };

    fetch(
      "https://api.apilayer.com/language_translation/translate?target=" +
        targetLanguage,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setTranslatedText(result.translations[0].translation);
      })
      .catch((error) => console.log("error", error));
  };

  const handleTextChange = (e) => {
    setTextToBeTranslated(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([translatedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "translatedText.txt";
    document.body.appendChild(element);
    element.click();
  };
  const shareText = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Translated Text",
          text: translatedText,
        })
        .then(() => {
          alert("Text shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing text:", error);
        });
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <div className="textArea">
      <div className="TextToBeTranslated">
        <textarea
          placeholder="Enter your text here"
          name="textUpload"
          id="textArea"
          rows="10"
          cols="50"
          value={textToBeTranslated||transcript}
          onChange={handleTextChange}
        ></textarea>
      </div>
      <button className="Translate" onClick={translateText}>
        <i class="fa fa-language" aria-hidden="true"></i>Translate
      </button>
      <br />
      <div className="translatedText">
        <select
          value={targetLanguage}
          onChange={handleLanguageChange}
          name="language"
          id="languageDetect"
        >
          <option value="en">English</option>
          <option value="zh">Chinese</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <br />
        <textarea
          placeholder="Translated text"
          name="textTranslated"
          id="textAreaTranslated"
          rows="10"
          cols="50"
          value={translatedText}
          readOnly
        ></textarea>
        <br />
        <button onClick={copyToClipboard}>
          <i class="fa fa-clone" aria-hidden="true"></i>
        </button>
        <button onClick={downloadText}>
          <i class="fa fa-download" aria-hidden="true"></i>
        </button>
        <button onClick={shareText}>
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default ElementsComponents;
