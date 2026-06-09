import { useState } from "react"

interface RatingsProps {
    editable: boolean
    rating: number
    onChange?: (newRating: number) => void
}

export default function Rating({ editable, rating, onChange }: RatingsProps) {
    const [currRating, setCurrRating] = useState(rating);

    function handleChange(newRating: number) {
        if (!editable) return;
        if (newRating == currRating) {
            setCurrRating(currRating-1);
        } else {
            setCurrRating(newRating);
        }
        if (onChange) onChange(newRating);
    }

    return (
        <div 
            onClick={(e) => e.preventDefault()}
            className="flex w-full h-full">
            <button onClick={() => handleChange(1)}>
                {currRating < 1 ? 
                <svg className="text-on-background w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
                </svg>
                :
                <svg className="text-yellow-300 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                </svg>}
            </button>
            <button onClick={() => handleChange(2)}>
                {currRating < 2 ? 
                <svg className="text-on-background w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
                </svg>
                :
                <svg className="text-yellow-300 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                </svg>}
            </button>
            <button onClick={() => handleChange(3)}>
                {currRating < 3 ? 
                <svg className="text-on-background w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
                </svg>
                :
                <svg className="text-yellow-300 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                </svg>}
            </button>
            <button onClick={() => handleChange(4)}>
                {currRating < 4 ? 
                <svg className="text-on-background w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
                </svg>
                :
                <svg className="text-yellow-300 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                </svg>}
            </button>
            <button onClick={() => handleChange(5)}>
                {currRating < 5 ? 
                <svg className="text-on-background w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
                </svg>
                :
                <svg className="text-yellow-300 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                </svg>}
            </button>
        </div>
    )
}