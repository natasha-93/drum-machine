import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

type DrumpadsInnerText = "Q" | "W" | "E" | "A" | "S" | "D" | "Z" | "X" | "C";

type Drumpad = {
  label: string;
  keyTrigger: DrumpadsInnerText;
  url: string;
};

const drumpads1: Drumpad[] = [
  {
    keyTrigger: "Q",
    label: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyTrigger: "W",
    label: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyTrigger: "E",
    label: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyTrigger: "A",
    label: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyTrigger: "S",
    label: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyTrigger: "D",
    label: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyTrigger: "Z",
    label: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyTrigger: "X",
    label: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyTrigger: "C",
    label: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const drumpads2: Drumpad[] = [
  {
    keyTrigger: "Q",
    label: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyTrigger: "W",
    label: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyTrigger: "E",
    label: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyTrigger: "A",
    label: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyTrigger: "S",
    label: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyTrigger: "D",
    label: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyTrigger: "Z",
    label: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyTrigger: "X",
    label: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyTrigger: "C",
    label: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [bank, setBank] = useState<1 | 2>(1);
  const [drumPlaying, setDrumPlaying] = useState<Drumpad | null>(null);
  const [powerOn, setPowerOn] = useState<boolean>(true);

  const drumpads = bank === 1 ? drumpads1 : drumpads2;

  const play = (drumpad: Drumpad) => {
    const audio = new Audio(drumpad.url);
    if (powerOn) {
      audio.play();
      setDrumPlaying(drumpad);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const drumpad = drumpads.find(
      (drumpad) => drumpad.keyTrigger === e.key.toUpperCase()
    );
    if (drumpad != null) {
      play(drumpad);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!powerOn) {
      setDrumPlaying(null);
    }
  }, [powerOn]);

  return (
    <div className="App">
      <div className="drum-machine">
        <div>
          {drumpads.map((drumpad) => (
            <button
              className="drumpad"
              key={drumpad.label}
              onClick={(e) => {
                play(drumpad);
              }}
            >
              {drumpad.label}
            </button>
          ))}
        </div>
        <div className="display">{powerOn ? drumPlaying?.label : null}</div>
        <button onClick={() => setPowerOn((powerOn) => !powerOn)}>
          {powerOn ? "ON" : "OFF"}
        </button>
        <button onClick={(e) => setBank((bank) => (bank === 1 ? 2 : 1))}>
          Bank: {bank}
        </button>
      </div>
    </div>
  );
}

export default App;
