import React, { useEffect, useState } from "react";
import Progress from "./DrawHangman";
import Popup from "./Popup";
import alphabets from "./alphabet";
import animals from "./word";

export default function Hangman() {
  const [corrects, setCorrects] = useState([]);
  const [fails, setFails] = useState([]);
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("");

  //In this case, ":" means else.

  //The underline will be replaced by the letter if the guess is correct.

  const maskWord = word
    .split("")
    .map((letter) => (corrects.includes(letter) ? letter : "_"))
    .join(" ");

  const onGuess = (letter) => {
    if (fails.length > 9 || status) return;

    if (word.includes(letter)) {
      setCorrects([...corrects, letter]);
    } else {
      setFails([...fails, letter]);
    }
  };
  //generate word
  const randomizeWord = () =>
    setWord(animals[Math.floor(Math.random() * animals.length)].toUpperCase());
  // When the game loses or wins, it should be reset.
  const reset = () => {
    randomizeWord();
    setCorrects([]);
    setFails([]);
    setStatus("");
  };

  useEffect(reset, []);

  useEffect(() => {
    /*every letter in word already guessed*/
    if (
      corrects.length &&
      word.split("").every((letter) => corrects.includes(letter))
    )
      setStatus("win");
  }, [corrects]);

  useEffect(() => {
    // player has 10 lives.
    // define lose case
    if (fails.length === 10) setStatus("lose");
  }, [fails]);

  return (
    <div>
      {/* masking letters in world by underlines */}
      <p className="mask">{maskWord}</p>
      <div>
        {/* mapping alphabets into buttons */}
        {/* The button that has already been pressed should be disabled. */}
        {alphabets.map((letter, index) => (
          <button
            key={index}
            disabled={corrects.includes(letter) || fails.includes(letter)}
            onClick={() => onGuess(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <Progress fails={fails.length} />
      <Popup status={status} word={word} reset={reset} />
    </div>
  );
}
