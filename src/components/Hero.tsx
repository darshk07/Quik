import { useState, useEffect, useCallback, useRef } from "react";
import Paragraph, { Character } from "./Paragraph";
import Time from "./Timer";
import correct from "../assets/correct.mp3";

const Hero = () => {
  const [paragraph, setParagraph] = useState<any>(null);
  const [userText, setUserText] = useState<string>("");
  const [isOn, setIsOn] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const paragraphRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const [wpm, setWpm] = useState<number>(0);

  const generateNewParagraph = useCallback(() => {
    const config = {
      url: "https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1",
      method: "GET",
    };
    fetch(config.url, config)
      .then((res) => res.json())
      .then(() => {
        const sample =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum cupiditate harum beatae quam doloribus ipsum dolore blanditiis, amet officiis libero culpa nesciunt facere repellat ullam reprehenderit ducimus aliquam voluptate maiores! ";
        // setParagraph(convertParaToArray(data[0]));
        setParagraph(convertParaToArray(sample));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const reset = useCallback(() => {
    generateNewParagraph();
    setTime(30);
    setCurrentPosition(0);
  }, [generateNewParagraph]);

  useEffect(() => {
    if (currentPosition === paragraph?.length) {
      console.log("done");
      reset();
    }
  }, [currentPosition, paragraph, reset]);

  // const focusOnParagraph = () => {
  //   paragraphRef.current.focus();
  //   paragraphRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    generateNewParagraph();
  }, [generateNewParagraph]);

  // const onClick = useCallback((e: any) => {
  //   console.dir(e?.target?.id);
  //   if (e?.target?.id.includes("Button")) {
  //     focusOnParagraph();
  //     return;
  //   } else {
  //     setIsOn(false);
  //   }
  // }, []);

  useEffect(() => {
    const actionKeys = ["Enter", "Backspace", "Shift"];
    const makeSound = () => {
      audioRef.current.play();
      setTimeout(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }, 20);
    };

    const func = (e: any) => {
      if (isOn) {
        if (actionKeys.includes(e.key)) {
          return;
        }
        if (e.key === paragraph[currentPosition].char) {
          setCurrentPosition((pos) => pos + 1);
          makeSound();
        } else {
          setParagraph((prev: any) =>
            prev.map((char: Character) => {
              if (char.id === currentPosition) {
                return {
                  ...char,
                  isIncorrect: true,
                };
              }
              return char;
            })
          );
          // console.log(
          //   "Key pressed",
          //   e.key,
          //   "\nExpected",
          //   paragraph[currentPosition].char
          // );
        }
      }
    };
    window.addEventListener("keydown", func);
    // window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", func);
      // window.removeEventListener("click", onClick);
    };
  }, [isOn, currentPosition, paragraph]);

  useEffect(() => {
    setWpm((currentPosition / 5) * (60 / (30 - time)));
  }, [time, setWpm, currentPosition]);

  useEffect(() => {
    let intervalId: any;
    if (isOn) {
      intervalId = setInterval(() => setTime(time - 1), 1000);
    }

    if (time === 0) {
      // setIsOn(false);
      reset();
    }
    return () => clearInterval(intervalId);
  }, [time, isOn, reset]);

  const convertParaToArray = (text: any) => {
    if (text) {
      const arr: Character[] = [];
      for (let i = 0; i < text.length; i++) {
        const obj: any = {
          key: i,
          id: i,
          char: text[i],
          isCorrect: false,
          isIncorrect: false,
          isCurrent: true,
        };
        arr.push(obj);
      }
      return arr;
    } else {
      return null;
    }
  };

  return (
    <div className="box-border mt-[60px] flex flex-col items-center">
      <audio ref={audioRef}>
        evdrdrv
        <source src={correct} type="audio/mpeg" />
        <p>Your browser does not support the audio element.</p>
      </audio>
      <Time time={time} />
      <div className="text-3xl text-secondary mt-6">{wpm.toFixed()} WPM</div>
      <Paragraph
        paraRef={paragraphRef}
        isOn={isOn}
        currentPosition={currentPosition}
        userText={userText}
        setUserText={setUserText}
        data={paragraph}
      />
      {isOn ? (
        <div className="flex gap-8">
          <button
            id="pauseButton"
            onClick={() => setIsOn(false)}
            className="btn text-white mt-[60px] px-6 py-2 rounded-md"
          >
            Pause
          </button>
          <button
            id="restartButton"
            onClick={() => reset()}
            className="btn reset text-white mt-[60px] px-6 py-2 bg-red-600 rounded-md"
          >
            Reset
          </button>
        </div>
      ) : (
        <div
          id="startButton"
          onClick={() => setIsOn(true)}
          className="btn text-white mt-[60px] px-6 py-2 bg-primary rounded-md"
        >
          Start
        </div>
      )}
    </div>
  );
};

export default Hero;
