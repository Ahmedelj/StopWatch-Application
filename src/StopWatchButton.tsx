import React, { useState, useRef, useEffect } from 'react';
import './StopWatchButton.css';


export default function StopWatchButton() {
  
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalId = useRef(null);
    const stTimeRef = useRef(0);
    const [lap, setLap] = useState(1);
    const [lapList, setLapList] = useState([]);

    useEffect(() => {
        if (isRunning) {
            intervalId.current = setInterval(() => {
                setElapsedTime(Date.now() - stTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalId.current);
        };
    }, [isRunning]);

    function lapsButton() {
        if (isRunning) {
            getLap();
        }
    }

    function startButton() {
        setIsRunning(true);
        stTimeRef.current = Date.now() - elapsedTime;
    }

    // Function to handle stop button click
    function stopButton() {
        setIsRunning(false);
    }

    // Function to handle reset button click
    function resetButton() {
        setElapsedTime(0);
        setIsRunning(false);
        setLap(1);
        setLapList([]);
    }

    // Function to format elapsed time
    function timingFormat() {
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        return [
            minutes < 10 ? `0${minutes}` : `${minutes}`,
            seconds < 10 ? `0${seconds}` : `${seconds}`,
            milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`,
        ].join(':');
    }

    // Function to handle lap creation
    const getLap = () => {
        const lapItem = `Lap ${lap}: ${timingFormat()}`;
        setLap((count) => count + 1);
        setLapList([lapItem, ...lapList]);
    };

   
    return (
        <>
            <div className="stopwatch">
                <div className="display">{timingFormat()}</div>
                <div className="controls">
                    <button data-testid='start-button1' onClick={startButton} className="start-button">
                        Start
                    </button>
                    <button data-testid='stop-button1'onClick={stopButton} className="stop-button">
                        Stop
                    </button>
                    <button data-testid='reset-button1' onClick={resetButton} className="reset-button">
                        Reset
                    </button>
                    <button data-testid='lap-button1' onClick={lapsButton} className="lap-button">
                        Lap
                    </button>
                </div>
            </div>
            <nav>
                <ul>
                    {lapList.map((lapItem, index) => (
                        <li key={index}>{lapItem}</li>
                    ))}
                </ul>
            </nav>
        </>
    );
}