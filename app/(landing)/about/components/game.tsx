"use client"
import { useState } from "react";
import Image from 'next/image';

export default function Game() {
    const [active, setActive] = useState([false, false, false, false, false, false, false, false]);
    const [win, setWin] = useState(false);

    function handleChange(idx: number) {
        const prevActive = [...active];
        prevActive[idx] = !prevActive[idx];
        if (idx-1 < 0) {
            prevActive[7] = !prevActive[7];
        } else {
            prevActive[idx-1] = !prevActive[idx-1];
        }
        prevActive[(idx+1)%8] = !prevActive[(idx+1)%8];
        var count = 0
        prevActive.forEach((active) => {
            if (active) count += 1
        });
        setWin(count == 8)
        setActive(prevActive)
    }

    return (
        <div className="flex font-jakarta gap-1">
            <button
                onClick={() => handleChange(0)}
                className={`${active[0] ? 'font-bold text-secondary' : ''}`}
            >
                We
            </button>
            <button
                onClick={() => handleChange(1)}
                className={`${active[1] ? 'font-bold text-secondary' : ''}`}
            >
                believe
            </button>
            <button
                onClick={() => handleChange(2)}
                className={`${active[2] ? 'font-bold text-secondary' : ''}`}
            >
                focus
            </button>
            <button
                onClick={() => handleChange(3)}
                className={`${active[3] ? 'font-bold text-secondary' : ''}`}
            >
                is
            </button>
            <button
                onClick={() => handleChange(4)}
                className={`${active[4] ? 'font-bold text-secondary' : ''}`}
            >
                the
            </button>
            <button
                onClick={() => handleChange(5)}
                className={`${active[5] ? 'font-bold text-secondary' : ''}`}
            >
                ultimate
            </button>
            <button
                onClick={() => handleChange(6)}
                className={`${active[6] ? 'font-bold text-secondary' : ''}`}
            >
                competitive
            </button>
            <button
                onClick={() => handleChange(7)}
                className={`${active[7] ? 'font-bold text-secondary' : ''}`}
            >
                advantage.
            </button>
            {win &&
                <Image src="/SheepBlue2.png" width={15} height={8} alt="Sheep image" className="rotate-270" />
            }
        </div>
    )
}