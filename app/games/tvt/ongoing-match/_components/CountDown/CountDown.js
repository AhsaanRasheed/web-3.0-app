import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

const CountDown = ({ initialTime = 0, activeRound = 0 }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time > 0) {
            const timerId = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId); // Clean up the interval on component unmount
        }
    }, [time]);

    return (
        <div className={styles.CountDownWrapper}>
            <h1>{time}s</h1>
            <p>Round {activeRound}</p>
        </div>
    );
}

export default CountDown;
