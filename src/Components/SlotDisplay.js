import React, { useState, useRef } from "react";
import SlotCounter from "react-slot-counter";
import "./SlotDisplay.css";

const SlotDisplay = () => {
  const [value, setValue] = useState(456);
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const counterRef = useRef(null);
  const scrollingAudioRef = useRef(new Audio("/SFX/scrolling.mp3"));
  const finishedAudioRef = useRef(new Audio("/SFX/finished.mp3"));
  finishedAudioRef.current.volume = 0.6; // Set the volume to 50%

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEliminateClick = () => {
    const eliminateCount = parseInt(inputValue, 10);
    if (!isNaN(eliminateCount)) {
      const newValue = value - eliminateCount;
      setValue(newValue);
      counterRef.current?.startAnimation();
      setInputValue(""); // Clear the input field
      setIsButtonDisabled(true); // Disable the button
      scrollingAudioRef.current.play(); // Play the scrolling sound
      setTimeout(() => {
        scrollingAudioRef.current.pause(); // Stop the scrolling sound after 4 seconds
        scrollingAudioRef.current.currentTime = 0; // Reset the scrolling audio to the beginning
        finishedAudioRef.current.play(); // Play the finished sound
        // Add the blink class to .char elements after the blinkDelay
        setTimeout(() => {
          const charElements = document.querySelectorAll(
            ".index-module_num__j6XH3"
          );
          charElements.forEach((el) => el.classList.add("blink"));
          // Remove the blink class after the animation completes
          setTimeout(() => {
            charElements.forEach((el) => el.classList.remove("blink"));
          }, 2000); // ADJUST THE DURATION OF THE BLINK ANIMATION HERE (2000ms for 4 blinks of 0.5s each)
        }, 380); // ADJUST THE DELAY BEFORE THE BLINK STARTS HERE
      }, 4000); // Initial 4-second delay
      setTimeout(() => {
        setIsButtonDisabled(false); // Re-enable the button after 5 seconds
      }, 5000);
    }
  };

  return (
    <div>
      <div className="slot-container">
        <div className="num-players" id="num-players-kr">
          *{" "}
          <span className="kr">
            <span className="spacing">참가인</span>원
          </span>{" "}
          *
        </div>
        <div className="num-players">NUMBER OF PLAYERS</div>
        <div className="flex-container">
          <SlotCounter
            value={value}
            charClassName="char"
            animateUnchanged
            startValueOnce
            useMonospaceWidth
            autoAnimationStart={false}
            ref={counterRef}
            duration={4}
          />
          <div className="kr-ppl">
            <span className="kr">명</span>
          </div>
        </div>
      </div>
      <div className="input-container">
        <input type="number" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleEliminateClick} disabled={isButtonDisabled}>
          Eliminate
        </button>
      </div>
    </div>
  );
};

export default SlotDisplay;
