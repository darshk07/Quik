import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <div className="flex gap-[40px] text-white w-full box-border justify-center">
            <div className="p-2">
                Practice Mode
            </div>
            <div className="bg-secondary p-2 rounded-3xl text-primary">
                Home
            </div>
        </div>
    )
}

export default Navbar