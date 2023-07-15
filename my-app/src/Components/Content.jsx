import { useState } from "react";
import "../App.css";

const Content = () => {
  const [displayText, setDisplayText] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleButtonClick = () => {
    setDisplayText(textAreaValue);
  };

  return (
    <div className="content">
      <textarea
        className="input-field"
        placeholder="Enter some text..."
        onChange={(e) => setTextAreaValue(e.target.value)}
      />

      <button onClick={handleButtonClick}>Display Text</button>
      {displayText && <p>{displayText}</p>}
    </div>
  );
};

export default Content;
