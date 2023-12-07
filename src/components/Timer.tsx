import React from 'react'

type Props = {
    time: number;
}

const Time = (props: Props) => {
    return (
        <div className="flex items-center text-secondary justify-center">
            <div className="flex items-center flex-col justify-center text-center">
                <div className="text-sm text-white font-thin">TIMER</div>
                <div className="text-7xl font-semibold">
                    {props.time}
                </div>
            </div>
        </div>
    )
}

export default Time
