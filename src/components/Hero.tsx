import { useState, useEffect, useCallback, useRef } from 'react'
import Paragraph, { Character } from './Paragraph'
import Time from './Timer'
import correct from "../assets/correct.mp3"

const Hero = () => {
    const [paragraph, setParagraph] = useState<any>(null);
    const [userText, setUserText] = useState<string>(""); // ["" , function]
    const [isOn, setIsOn] = useState<boolean>(false); // [false, function]
    const [time, setTime] = useState<number>(0);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const paragraphRef = useRef<any>(null);
    const actionKeys = ['Enter', 'Backspace', 'Shift']
    const audioRef = useRef<any>(null);

    useEffect(() => {
        if (currentPosition === paragraph?.length) {
            console.log("done");
            reset();
        }
    }, [currentPosition])

    const focusOnParagraph = () => {
        paragraphRef.current.focus();
        paragraphRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const onClick = (e: any) => {
        console.log(e.target.id)
        if (e?.target?.id.includes('Button')) {
            console.log("here");
            focusOnParagraph();
            return;
        }
        setIsOn(false);
    }

    useEffect(() => {
        generateNewParagraph();
    }, [])

    useEffect(() => {
        const func = (e: any) => {
            if (isOn) {
                console.log(e.key);
                if (actionKeys.includes(e.key)) {
                    return;
                }
                if (e.key === paragraph[currentPosition].char) {
                    console.log("correct")
                    setCurrentPosition(pos => pos + 1);
                    audioRef?.current?.play();
                }
                else {
                    setParagraph((prev: any) => prev.map((char: Character) => {
                        if (char.id === currentPosition) {
                            return {
                                ...char,
                                isIncorrect: true
                            }
                        }
                        return char;
                    }))
                    console.log("Key pressed", e.key, "\nExpected", paragraph[currentPosition].char)
                }
            }
        }
        window.addEventListener('keydown', func)
        window.addEventListener('click', onClick)

        return () => {
            window.removeEventListener('keydown', func);
            window.removeEventListener('click', onClick);
        }
    }, [isOn, currentPosition, paragraph])

    useEffect(() => {
        console.log(isOn);
    }, [isOn])


    useEffect(() => {
        let intervalId: any;
        if (isOn) {
            intervalId = setInterval(() => setTime(time + 1), 1000);
        }
        return () => clearInterval(intervalId)
    }, [time, isOn])

    // useEffect(() => {
    //     if (isOn) {
    //         console.log(userText);
    //     }
    // }, [userText])

    const reset = () => {
        generateNewParagraph();
        setTime(0);
        setCurrentPosition(0);
    }

    const generateNewParagraph = useCallback(() => {
        let config = {
            url: 'http://metaphorpsum.com/paragraphs/1/1',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(config.url, config)
            .then((res) => res.text())
            .then((data) => {
                setParagraph(convertParaToArray(data));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const convertParaToArray = (text: any) => {
        if (text) {
            let arr: Character[] = [];
            for (let i = 0; i < text.length; i++) {
                let obj = {
                    key: i,
                    id: i,
                    char: text[i],
                    isCorrect: false,
                    isIncorrect: false,
                    isCurrent: true
                }
                arr.push(obj);
            }
            return arr;
        }
        else {
            return null;
        }
    }

    return (
        <div className="box-border mt-[60px] flex flex-col items-center">
            <audio ref={audioRef}>
                evdrdrv
                <source src={correct} type="audio/mpeg" />
                <p>Your browser does not support the audio element.</p>
            </audio>
            <Time time={time} />
            <Paragraph
                paraRef={paragraphRef}
                isOn={isOn}
                currentPosition={currentPosition}
                userText={userText}
                setUserText={setUserText}
                data={paragraph} />
            {
                isOn ?
                    <div
                        id='restartButton'
                        onClick={() => reset()}
                        className="btn text-white mt-[60px]">
                        Reset
                    </div>
                    :
                    <div
                        id="startButton"
                        onClick={() => {
                            setIsOn(true);
                        }}
                        className="btn text-white mt-[60px]">
                        Start
                    </div>

            }
        </div >
    )
}

export default Hero
