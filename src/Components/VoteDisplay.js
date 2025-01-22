import React, { useState, useEffect, useRef } from "react";
import "./VoteDisplay.css";

const VoteDisplay = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const audioContext = useRef(null);
  const audioBufferX = useRef(null);
  const audioBufferO = useRef(null);
  const audioBufferIncrement = useRef(null);
  const audioSource = useRef(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    fetch("/SFX/X.mp3")
      .then((response) => response.arrayBuffer())
      .then((data) => audioContext.current.decodeAudioData(data))
      .then((buffer) => {
        audioBufferX.current = buffer;
      });

    fetch("/SFX/O.mp3")
      .then((response) => response.arrayBuffer())
      .then((data) => audioContext.current.decodeAudioData(data))
      .then((buffer) => {
        audioBufferO.current = buffer;
      });

    fetch("/SFX/increment.mp3")
      .then((response) => response.arrayBuffer())
      .then((data) => audioContext.current.decodeAudioData(data))
      .then((buffer) => {
        audioBufferIncrement.current = buffer;
      });
  }, []);

  const playAudio = (sound) => {
    let buffer;
    if (sound === "X") {
      buffer = audioBufferX.current;
    } else if (sound === "O") {
      buffer = audioBufferO.current;
    }

    if (buffer) {
      audioSource.current = audioContext.current.createBufferSource();
      audioSource.current.buffer = buffer;
      audioSource.current.loop = true;
      audioSource.current.connect(audioContext.current.destination);
      audioSource.current.start();
    }
  };

  const stopAudio = () => {
    if (audioSource.current) {
      audioSource.current.stop();
      audioSource.current = null;
    }
  };

  const playIncrementSound = () => {
    if (audioBufferIncrement.current) {
      const incrementSource = audioContext.current.createBufferSource();
      incrementSource.buffer = audioBufferIncrement.current;
      incrementSource.connect(audioContext.current.destination);
      incrementSource.start();
    }
  };

  const renderDigits = (value) => {
    let displayValue;
    if (value === 0) {
      displayValue = `-0-`;
    } else if (value < 10) {
      displayValue = `-${value}-`;
    } else if (value < 100) {
      displayValue = `-${value}`;
    } else {
      displayValue = `${value}`;
    }

    return (
      <div className="score-container">
        {displayValue.split("").map((char, index) => (
          <div key={index} className="vote-char-wrapper">
            <div className="vote-char">{char === "-" ? "\u00A0" : char}</div>
          </div>
        ))}
      </div>
    );
  };

  const incrementValue1 = () => {
    setValue1(value1 + 1);
  };

  const incrementValue2 = () => {
    setValue2(value2 + 1);
  };

  const handleMouseUp = (incrementFunction) => {
    stopAudio();
    setTimeout(() => {
      playIncrementSound();
      incrementFunction();
    }, 250);
  };

  return (
    <div className="vote-display">
      <div className="scoreboard">
        <div className="score-section">
          <div className="icon red">X</div>
          <div className="score">{renderDigits(value1)}</div>
        </div>
        <div className="divider">:</div>
        <div className="score-section">
          <div className="icon blue">O</div>
          <div className="score">{renderDigits(value2)}</div>
        </div>
      </div>
      <div className="button-panel">
        <div
          className="button red-button"
          onMouseDown={() => playAudio("X")}
          onMouseUp={() => handleMouseUp(incrementValue1)}
        >
          <span className="button-text">X</span>
        </div>
        <div
          className="button blue-button"
          onMouseDown={() => playAudio("O")}
          onMouseUp={() => handleMouseUp(incrementValue2)}
        >
          <span className="button-text">O</span>
        </div>
      </div>
    </div>
  );
};

export default VoteDisplay;
