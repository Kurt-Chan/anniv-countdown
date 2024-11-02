import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// NOTE: Change this date to whatever date you want to countdown to :)
const COUNTDOWN_FROM = "2024-11-18";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";

// For email confirmation
const emailDoneTemp = `<head>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* General email styles */
        body {
            background-color: #8492a6;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            text-align: center;
            /* Center-align text */
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            /* Center the email on the page */
            background-color: #800000;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #fff;
            font-size: 24px;
            margin-bottom: 15px;
            text-align: center;
        }

        h3 {
            color: #fff;
        }

        p {
            font-size: 16px;
            color: #fff;
            margin-bottom: 20px;
            font-weight: normal;
        }

        .buttonConfirm {
            display: inline-block;
            padding: 10px 20px;
            background-color: #e98c31;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: bold;
        }

        .buttonConfirm:hover {
            background-color: #B56D25;
        }

        /* Responsive design for mobile */
        @media (max-width: 600px) {
            .email-container {
                width: 100%;
                padding: 15px;
            }

            h2 {
                font-size: 20px;
            }

            p {
                font-size: 14px;
            }

            a {
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <h3>It's finally here!</h2>
        <h2>❤️❤️❤️ Hi Love! ❤️❤️❤️</h2>
        <p>Only a minute left! Visit the this <a href='https://kurtchan.com' target='__blank'>link now</a>!</p>
    </div>

</body>`


// Function to send the email notification
const sendEmailNotification = async (email: any, template: any) => {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, template })
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
};

const CountdownItem = ({ unit, text }: { unit: Units; text: string }) => {
    // NOTE: Framer motion exit animations can be a bit buggy when repeating
    // keys and tabbing between windows. Instead of using them, we've opted here
    // to build our own custom hook for handling the entrance and exit animations
    const useTimer = (unit: Units) => {
        const [ref, animate] = useAnimate();

        const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
        const timeRef = useRef(0);
        const emailSentRef = useRef(false); // Track if email has been sent

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
                // localStorage.setItem('anniv', 'true')
                // window.location.reload()
                return;
            }

            if (distance <= MINUTE && !emailSentRef.current) {
                emailSentRef.current = true; // Set to true to prevent resending
                const emailAdd = localStorage.getItem('emailAdd'); // Get the email address
                await sendEmailNotification(emailAdd, emailDoneTemp); // Send email when 1 min is left
                // console.log("Email sent notification");
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