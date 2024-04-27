import { Dispatch, useEffect } from "react";

export type Character = {
  id: number;
  key: number;
  char: string;
  isCorrect: boolean;
  isIncorrect: boolean;
  isCurrent: boolean;
};

type Props = {
  data: Character[] | null;
  userText: string;
  setUserText: Dispatch<string>;
  currentPosition: number;
  isOn: boolean;
  paraRef: any;
};

const Paragraph = (props: Props) => {
  useEffect(() => {
    if (props.isOn) {
      props?.paraRef?.current?.focus();
    }
  }, [props]);

  const renderText = () => {
    if (props.data) {
      return (
        <div
          ref={props.paraRef}
          className={`text-left 
                    focus:bg-red-700
                    ${props.isOn ? "blur-0" : "blur-sm"}
                    `}
        >
          {props.data?.map((char: Character) => {
            return (
              <span
                id={`${char.id}`}
                className={`
                                    box-border
                                ${
                                  char.id === props.currentPosition
                                    ? "activeCharacter"
                                    : char.id < props.currentPosition
                                    ? char.isIncorrect
                                      ? "text-red-600"
                                      : "text-primary"
                                    : "text-secondary"
                                }
                                `}
              >
                {char.char}
              </span>
            );
          })}
        </div>
      );
    } else {
      return <div className="">Loading...</div>;
    }
  };

  return (
    <div
      className="relative mt-[40px] text-2xl text-secondary text-left
        bg-secondary bg-opacity-20 rounded-lg px-10 py-8 w-[60%]"
    >
      {renderText()}
      {props.data && !props.isOn && (
        <div className="absolute top-[45%] left-[44%] text-white opacity-70">
          Click Start
        </div>
      )}
    </div>
  );
};

export default Paragraph;
