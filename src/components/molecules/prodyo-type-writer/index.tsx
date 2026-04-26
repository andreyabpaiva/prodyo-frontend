"use client";
import { Typewriter } from "react-simple-typewriter";
import { ProdyoTypeWriterProps } from "./types";

export default function ProdyoTypeWriter({
  typeSpeed,
  delaySpeed,
  cursor,
}: ProdyoTypeWriterProps) {
  return (
    <p className={`font-bold text-8xl`}>
      <Typewriter
        words={["Prodyo"]}
        loop={0}
        typeSpeed={typeSpeed}
        deleteSpeed={0}
        delaySpeed={delaySpeed}
        cursor={cursor}
      />
    </p>
  );
}
