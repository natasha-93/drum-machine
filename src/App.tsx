import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import Switch from "react-switch";

type DrumpadsInnerText = "Q" | "W" | "E" | "A" | "S" | "D" | "Z" | "X" | "C";

type Drumpad = {
  label: string;
  keyTrigger: DrumpadsInnerText;
  url: string;
};

const heaterKit: Drumpad[] = [
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

const smoothPianoKit: Drumpad[] = [
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

const DrumMachine = styled.div`
  margin: auto;
  display: flex;
  padding: 1rem;
  // background: linear-gradient(
  //   48deg,
  //   rgba(197, 215, 231, 1) 46%,
  //   rgba(235, 242, 249, 1) 68%,
  //   rgba(197, 215, 231, 1) 90%
  // );
  background: black;
`;

const DrumpadContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
`;

const Drumpad = styled.button`
  padding: 1rem 1.5rem;
  box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.75);
  border: none;
  background: linear-gradient(
    48deg,
    rgba(86, 128, 164, 1) 46%,
    rgba(116, 151, 181, 1) 68%,
    rgba(86, 128, 164, 1) 90%
  );
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 0.3rem;
`;

const Display = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin: auto;
  box-sizing: border-box;
  height: 2rem;
  width: 9rem;
  text-align: center;
  padding: 0.5rem;
  background: linear-gradient(
    48deg,
    rgba(86, 128, 164, 1) 46%,
    rgba(116, 151, 181, 1) 68%,
    rgba(86, 128, 164, 1) 90%
  );
  border-radius: 0.2rem;
`;

const Details = styled.div`
  width: 10rem;
  display: flex;
  flex-wrap: wrap;
  padding-left: 1rem;
`;

const SwitchContainer = styled.label`
  width: 8rem;
  text-align: center;
  margin: auto;
  padding: 1rem 0;
`;

const Label = styled.span`
  display: block;
  font-weight: bold;
  color: white;
  padding-bottom: 0.4rem;
`;

function App() {
  const [bank, setBank] = useState<"Heater Kit" | "Smooth Piano Kit">(
    "Heater Kit"
  );
  const [powerOn, setPowerOn] = useState<boolean>(true);
  const [display, setDisplay] = useState<string>("");

  const drumpads = bank === "Heater Kit" ? heaterKit : smoothPianoKit;

  const play = (drumpad: Drumpad) => {
    const audio = new Audio(drumpad.url);
    if (powerOn) {
      audio.play();
      setDisplay(drumpad.label);
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
  }, [bank]);

  useEffect(() => {
    if (!powerOn) {
      setDisplay("");
    }
  }, [powerOn]);

  return (
    <DrumMachine>
      <DrumpadContainer>
        {drumpads.map((drumpad) => (
          <Drumpad
            key={drumpad.label}
            onClick={(e) => {
              play(drumpad);
            }}
          >
            {drumpad.keyTrigger}
          </Drumpad>
        ))}
      </DrumpadContainer>
      <Details>
        <SwitchContainer>
          <Label>Power</Label>
          <Switch
            onChange={() => setPowerOn((powerOn) => !powerOn)}
            checked={powerOn}
            offColor="#5680A4"
            onColor="#5680A4"
            offHandleColor="##5680A4"
            onHandleColor="#000"
          />
        </SwitchContainer>

        <Display>{display}</Display>

        <SwitchContainer>
          <Label>Bank</Label>
          <Switch
            disabled={!powerOn}
            onChange={(e) => {
              const newBank =
                bank === "Heater Kit" ? "Smooth Piano Kit" : "Heater Kit";
              setBank(newBank);
              setDisplay(newBank);
            }}
            checked={bank === "Heater Kit"}
            checkedIcon={false}
            uncheckedIcon={false}
            offColor="#5680A4"
            onColor="#5680A4"
            offHandleColor="#000"
            onHandleColor="#000"
          />
        </SwitchContainer>
      </Details>
    </DrumMachine>
  );
}

export default App;
