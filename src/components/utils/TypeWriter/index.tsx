"use client";
import { JSX } from "react";
import { Typewriter } from "react-simple-typewriter";

type Props = {
    words: string[];
    loop?: boolean | number;
    typeSpeed?: number;
    deleteSpeed?: number;
    delaySpeed?: number;
    cursor?: boolean;
    fontSize?: string;
};

export default function TypeWriterComponent(props: Props) {
    return (
        <p className={`font-bold ${props.fontSize ?? "text-sm"}`}>
            <Typewriter
                words={props.words}
                loop={props.loop}
                typeSpeed={props.typeSpeed}
                deleteSpeed={props.deleteSpeed}
                delaySpeed={props.delaySpeed}
                cursor={props.cursor}
            />
        </p>
    )
}