import React, { useState, useEffect } from 'react'

export type Character = {
    id: number;
    key: number;
    char: string;
    isCorrect: boolean;
    isIncorrect: boolean;
    isCurrent: boolean;
}

type Props = {
    data: Character[] | null;
    userText: string;
    setUserText: Function;
    currentPosition: number;
    isOn: boolean;
    paraRef: any;
}

const Paragraph = (props: Props) => {

    useEffect(() => {
        if (props.isOn) {
            props.paraRef.current.focus();
        }
    }, [props.isOn])

    const renderText = () => {
        if (props.data) {
            return (
                <div
                    ref={props.paraRef}
                    className={`text-left 
                    focus:bg-red-700
                    ${props.isOn ? 'blur-0' : 'blur-sm'}
                    `}>
                    {
                        props.data?.map((char: Character) => {
                            return (
                                <span id={`${char.id}`}
                                    className={`
                                    box-border
                                ${char.id === props.currentPosition ? 'activeCharacter' :
                                            char.id < props.currentPosition ? char.isIncorrect ? 'text-red-600' : 'text-primary' : 'text-secondary'
                                        }
                                `}
                                >
                                    {char.char}
                                </span>
                            )
                        })
                    }
                </div>
            )
        }
        else {
            return (
                <div className="text-left">
                    Loading...
                </div>
            )
        }
    }

    return (
        <div className="relative mt-[40px] text-xl text-secondary text-left
        bg-secondary bg-opacity-20 rounded-lg px-10 py-8 w-[60%]">
            {true ? renderText() :
                <div>
                    Click Start
                </div>
            }
        </div>
    )
}

export default Paragraph