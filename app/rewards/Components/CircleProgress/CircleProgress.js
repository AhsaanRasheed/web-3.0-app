import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const CircularProgressBar = ({ progress }) => {
    const progressBarRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        if (progressBarRef.current && circleRef.current) {
            const progressBar = progressBarRef.current;
            const circle = circleRef.current;

            // Set progress circle position
            // const radius = progressBar.offsetWidth / 2;
            // const angle = (progress / 100) * 2 * Math.PI - Math.PI / 4.2; // Adjust the angle to start from the top
            // const x = radius + radius * Math.cos(angle) - circle.offsetWidth / 2;
            // const y = radius + radius * Math.sin(angle) - circle.offsetHeight / 2;
            // circle.style.transform = `translate(${x}px, ${y}px)`;


            // Set progress bar fill
            progressBar.style.setProperty('--progress', `${progress}%`);
        }
    }, [progress]);

    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressBar} ref={progressBarRef}>
                <div className={styles.circle} ref={circleRef}></div>
                <div className={styles.overlay}>
                    <img src="/rewardsCenter/img/BG.png" alt="Avatar" />
                </div>
            </div>
        </div>
    );
};

export default CircularProgressBar;
