import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// NOTE: Change this date to whatever date you want to countdown to :)
const COUNTDOWN_FROM = "2024-11-18";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";

const CountdownItem = ({ unit, text }: { unit: Units; text: string }) => {
    // NOTE: Framer motion exit animations can be a bit buggy when repeating
    // keys and tabbing between windows. Instead of using them, we've opted here
    // to build our own custom hook for handling the entrance and exit animations
    const useTimer = (unit: Units) => {
        // Initialize navigate
        const navigate = useNavigate();
        const [ref, animate] = useAnimate();

        const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
        const timeRef = useRef(0);

        const [time, setTime] = useState(0);

        useEffect(() => {
            intervalRef.current = setInterval(handleCountdown, 1000);

            return () => clearInterval(intervalRef.current || undefined);
        }, []);

        const handleCountdown = async () => {
            const end = new Date(COUNTDOWN_FROM + "T00:00:00+08:00");
            const now = new Date();
            const distance = +end - +now;

            // console.log(distance)
            if (distance <= 0) {
                clearInterval(intervalRef.current || undefined);
                navigate("/happy-anniversary"); // Replace with your target route
                return;
            }

            let newTime = 0;

            if (unit === "Day") {
                newTime = Math.floor(distance / DAY);
            } else if (unit === "Hour") {
                newTime = Math.floor((distance % DAY) / HOUR);
            } else if (unit === "Minute") {
                newTime = Math.floor((distance % HOUR) / MINUTE);
            } else {
                newTime = Math.floor((distance % MINUTE) / SECOND);
            }

            if (newTime !== timeRef.current) {
                // Exit animation
                await animate(
                    ref.current,
                    { y: ["0%", "-50%"], opacity: [1, 0] },
                    { duration: 0.35 }
                );

                timeRef.current = newTime;
                setTime(newTime);

                // Enter animation
                await animate(
                    ref.current,
                    { y: ["50%", "0%"], opacity: [0, 1] },
                    { duration: 0.35 }
                );
            }
        };

        return { ref, time };
    };

    const { ref, time } = useTimer(unit);

    return (
        <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1 border-r-[1px] border-slate-200 font-[Switzer-Variable] md:h-36 md:gap-2">
            <div className="rounded-xl relative w-full overflow-hidden text-center">
                <span
                    ref={ref}
                    className="block text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl"
                >
                    {time}
                </span>
            </div>
            <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">
                {text}
            </span>
        </div>
    );
}

export default CountdownItem